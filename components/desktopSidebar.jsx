import { useEffect } from "react"
import {
    Flex,
    Tabs,
    TabList,
    Tab,
    Text,
    Wrap,
    Avatar,
    Box,
    Button
} from "@chakra-ui/react"


export default function DesktopSideBar() {

    useEffect(() => {
        let weldoc = document.getElementById("user-wel")
        weldoc.innerHTML = "Welcome, <br />" + localStorage.getItem("username")
    }, [])

    return (
        <Flex
            width={"100%"}
            direction="column"
            justify={"space-between"}
            h={"100vh"}>
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
                    colorScheme={"yellow"}
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
                <Button 
                mb={0}>Log Out</Button>
            </Flex>
    )
}