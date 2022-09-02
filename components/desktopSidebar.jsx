import { useEffect } from "react"
import { useRouter } from "next/router"
import { logoutUser } from "../pages/api/firebase"
import {
    Flex,
    Tabs,
    TabList,
    Tab,
    Text,
    Wrap,
    Avatar,
    Box,
    useColorMode,
    Divider,
    Button
} from "@chakra-ui/react"


export default function DesktopSideBar() {

    let { colorMode, toggleColorMode } = useColorMode()
    const ROUTER = useRouter()

    useEffect(() => {
        let weldoc = document.getElementById("user-wel")
        weldoc.innerHTML = "Welcome, <br />" + localStorage.getItem("username")
    }, [])

    return (
        <Flex
            width={"100%"}
            direction="column"
            justify={"space-between"}
            h={"100vh"}
            display={["none", "none", "flex", "flex"]}>
                <Box
                pt={10}>
                    <Wrap 
                    mt={6}
                    left="35%"
                    position={"relative"} >
                        <Avatar 
                        size='xl' 
                        name='Dan Abrahmov' 
                        src='https://www.meme-arsenal.com/memes/100773de10bd652a2366e129c5053a0a.jpg' />
                    </Wrap>

                    <Text
                    id="user-wel"
                    textAlign={"center"}
                    mt={4}
                    fontWeight={"bold"} ></Text>

                    <Tabs
                    orientation="vertical"
                    variant={"solid-rounded"}
                    colorScheme={"blue"}
                    mt={7}>
                        <TabList
                        width={"100%"}
                        lineHeight={8}>
                            <Tab>Overview</Tab>
                            <Tab>Uploads</Tab>
                            <Tab>QR Codes</Tab>
                            <Tab>Settings</Tab>
                            <Tab>Help</Tab>
                        </TabList>
                    </Tabs>
                </Box>
                <Flex
                direction={"column"}>
                    <Divider />
                    <Button 
                    backgroundColor={"transparent"}
                    rounded="full"
                    colorScheme="none"
                    color={"white.600"}
                    _hover={{
                        backgroundColor: "transparent"
                    }}
                    onClick={() => {
                        toggleColorMode()
                    }}>Toggle Theme</Button>
                    <Button
                    backgroundColor={"transparent"}
                    rounded="full"
                    color={"white.600"}
                    _hover={{
                        backgroundColor: "transparent"
                    }}
                    colorScheme="none"
                    onClick={() => {
                        logoutUser()
                        ROUTER.reload()
                    }}>Log Out</Button>
                </Flex>
            </Flex>
    )
}