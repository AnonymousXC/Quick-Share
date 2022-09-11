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
    useDisclosure
} from "@chakra-ui/react";

import {
    AddIcon
} from "@chakra-ui/icons"
import { uploadText } from "../../pages/api/firebase";
import { useState } from "react";


export default function OverviewTab() {

    const bgColor = useColorModeValue("gray.400", "gray.900")
    const [ getText, setText ] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ alertHeading, setAlertHeading ] = useState()
    const [ alertBody, setAlertBody ] = useState()

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
                                colorScheme={alertHeading === "Successfully Uploaded." ? "green" : "red"}
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
                h={"100%"}
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
                    id="file-uploader" />
                    <Button
                    colorScheme="blue"
                    w={["100%", "100%", "unset", "unset"]}
                    mt={4}
                    onClick={() => {
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
                    <Image></Image> <br />
                    <Button
                    mt={4}
                    w={["100%", "100%", "unset", "unset"]}
                    colorScheme="blue"
                    onClick={(e) => {
                        selectFile()
                    }}> <AddIcon mr={3} /> Select File</Button> <br />
                </Box>
            </Flex>
        </ChakraProvider>
    )
}

function selectFile() {
    const fileUploader = document.getElementById("file-uploader")
    fileUploader.click()
    fileUploader.onselect = (e) => {
        console.log(e);
    }
}
