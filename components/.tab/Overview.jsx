import { useState } from "react";
import { uploadText, uploadFile } from "../../pages/api/firebase";
import UploadProgress from "../uploadProgress";

import { 
    ChakraProvider,
    Box,
    useColorModeValue,
    Textarea,
    Flex,
    Button,
    Image,
    Input,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
} from "@chakra-ui/react";

import {
    AddIcon
} from "@chakra-ui/icons"


export default function OverviewTab() {

    let bgColor = useColorModeValue("gray.400", "gray.900") 
    const [ getText, setText ] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ alertHeading, setAlertHeading ] = useState()
    const [ alertBody, setAlertBody ] = useState()
    const [ getFile, setFile] = useState()
    const [ progressDisplay, setProgressDisplay] = useState("none")

    return (
        <ChakraProvider>
            <AlertDialog 
            isOpen={isOpen}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>{alertHeading}</AlertDialogHeader>
                        <AlertDialogBody>{alertBody} <br />
                            <AlertDialogFooter>
                                <Button
                                onClick={() => {
                                    onClose()
                                }}
                                colorScheme={alertHeading === "Successfully Uploaded." || alertHeading === "Uploaded Document." ? "green" : "red"}
                                >OK</Button>
                            </AlertDialogFooter>
                        </AlertDialogBody>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Flex
            display={["block", "block", "flex", "flex"]}
            backgroundColor={bgColor}
            w={["90%", "90%", "calc(100% - 350px)", "calc(100% - 350px)"]}
            h={["", "", "92vh", "92vh"]}
            m={6}
            rounded={14}>
                <Textarea
                w={["100%", "100%", "50%", "50%"]}
                resize="none"
                h={["25vh" , "25vh", "100%", "100%"]}
                onChange={(e) => {
                    setText(e.currentTarget.value)
                }}
                placeholder="Enter Text to upload.">
                </Textarea>
                <Box
                w={["100%", "100%", "50%", "50%"]}
                textAlign="center">
                    <Input 
                    type={"file"}
                    display="none"
                    id="file-uploader"
                    multiple={false}
                    onChange={() => {
                        handleFileUpload()
                        const file = document.getElementById("file-uploader").files[0]
                        if(file) setFile(file)
                    }} />
                    <Button
                    colorScheme="blue"
                    w={["100%", "100%", "unset", "unset"]}
                    mt={4}
                    onClick={() => {
                        if(!getText) return;
                        uploadText(getText)
                        .then((e) => {
                            setAlertHeading("Successfully Uploaded.")
                            setAlertBody("Your Document has been successfully saved. You can access it anytime and anywhere.")
                            onOpen()
                        })
                        .catch((err) => {
                            setAlertHeading("Error Uploading Document.")
                            setAlertBody(err)
                        })
                    }}>Upload Text</Button> <br />

                    <iframe 
                    allowtransparency={"true"}
                    id="preview"
                    style={{
                        backgroundColor: "#000",
                        display: "none",
                        marginTop: "16px",
                    }}
                    width="100%"
                    height={"auto"}></iframe> <br />

                    <Button
                    mt={4}
                    w={["100%", "100%", "unset", "unset"]}
                    colorScheme="blue"
                    onClick={(e) => {
                        selectFile()
                    }}> <AddIcon mr={3} /> Select File</Button> <br />
                    <Button
                    id="upload-btn"
                    opacity={0}
                    mt={4}
                    w={["100%", "100%", "unset", "unset"]}
                    colorScheme="blue"
                    onClick={() => {
                        setProgressDisplay("flex")
                        uploadFile(getFile)
                        .then((e) => {
                            setAlertHeading("Uploaded Document.")
                            onOpen()
                            setProgressDisplay("none")
                        })
                        .catch((e) => {
                            setAlertHeading("Error Uploading Document.")
                            onOpen()
                            setProgressDisplay("none")
                        })
                    }}>Upload</Button> <br />
                </Box>
            </Flex>
            <UploadProgress
            display={progressDisplay} />
        </ChakraProvider>
    )
}

function selectFile() {
    const fileUploader = document.getElementById("file-uploader")
    fileUploader.click()
}

function handleFileUpload() {
    let imagePre = document.getElementById("preview")
    let files = document.getElementById("file-uploader").files
    let objURL = URL.createObjectURL(files[0])
    imagePre.src = objURL
    imagePre.style.display = "block"
    document.getElementById("upload-btn").style.opacity = "1"
}