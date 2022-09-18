import {
    Flex,
    CircularProgress,
    CircularProgressLabel,
    Text,
    Button,
    useColorModeValue
} from "@chakra-ui/react"

export default function UploadProgress({display}) {

    let uploadBG = useColorModeValue("gray.100", "gray.700")

    return (
        <Flex 
        display={display}
        position={"absolute"}
        height={"40px"}
        bottom={"0px"}
        right={"50px"}
        justify="center"
        align={"center"}
        backgroundColor={uploadBG}
        p={6}
        rounded={8}
        gap={5}
        mb={4}
        pr={1}>
            <Text>Uploading : </Text>
            <CircularProgress
            id="uploadProgress"
            size={"40px"}
            isIndeterminate>
                <CircularProgressLabel id="uploadProgressLabel">0%</CircularProgressLabel>
            </CircularProgress>
            <Button 
            fontSize={24}
            w={2}
            position="relative"
            backgroundColor={"transparent"}
            top="-2px"
            _hover={{}}
            _active={{}}
            >&#10799;</Button>
        </Flex>
    )
}