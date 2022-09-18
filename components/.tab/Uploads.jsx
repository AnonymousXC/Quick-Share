import { readTextData } from "../../pages/api/firebase";
import { 
    Flex, 
    useColorModeValue,
    Grid,
    Heading,
} from "@chakra-ui/react";
import { useEffect } from "react";



export default function UploadTab() {

    useEffect(() => {
        readTextData()
        .then((data) => {
            try {
                document.getElementById("textUploads").innerHTML = document.getElementById("textUploads") ? data : ""
                console.log(data);
            } catch(err) {}
        })
    }, [])

    const bgColor = useColorModeValue("gray.400", "gray.900")

    return (
        <Flex
        display={["block", "block", "flex", "flex"]}
        backgroundColor={bgColor}
        w={["90%", "90%", "calc(100% - 350px)", "calc(100% - 350px)"]}
        h={["calc(92vh - 60px)", "calc(92vh - 60px)", "92vh", "92vh"]}
        mx={6}
        my={6}
        direction="column"
        rounded={14}>
            <Heading 
            px={6}
            py={2}>Text</Heading>
            <Grid
            w={"100%"}
            h={"60vh"}
            id="textUploads"
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)", "repeat(5, 1fr)"]}>
            </Grid>

            <Heading 
            px={6}
            py={2}>Uploads</Heading>
            <Grid
            w={"100%"}
            h={"60vh"}>
            </Grid>
        </Flex>
    )
}