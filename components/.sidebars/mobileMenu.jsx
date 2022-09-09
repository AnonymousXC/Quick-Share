import { useState } from "react";
import { useRouter } from "next/router";
import { logoutUser } from "../../pages/api/firebase";
import { 
  Box,
  Flex,
  useColorModeValue,
  Avatar,
  Button,
  useColorMode,
  Tabs,
  TabList,
  Tab,
 } from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
} from "@chakra-ui/icons"


export default function MobileMenu() {
    const ROUTER = useRouter()
    const navBGColor  = useColorModeValue("gray.300", "gray.900");
    const navColor = useColorModeValue("gray.800", "white");
    const navBorderColor = useColorModeValue("gray.200", "gray.900");
    const { colorMode ,toggleColorMode } = useColorMode();
    const [ getMenuActive , setMenuActive] = useState("none")
  
    return (
      <Box display={["block" , "block" , "none" , "none"]}>
        <Flex 
          h="60px"
          w="100vw"
          backgroundColor={navBGColor}
          color={navColor}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderColor={navBorderColor}
          borderStyle={"solid"}
          align="center">
            <Button 
            onClick={() => {
              getMenuActive === "flex" ? setMenuActive("none") : setMenuActive("flex");
            }}
            >
              {getMenuActive === "flex" ? <CloseIcon /> : <HamburgerIcon />}
            </Button>
            
            <Flex
            w={"100%"}
            justify={"center"}>
                <Avatar
                name="Hello"
                src="https://www.meme-arsenal.com/memes/100773de10bd652a2366e129c5053a0a.jpg" />
            </Flex>

            <Button 
            colorScheme="facebook"
            onClick={() => {
                ROUTER.push("/")
            }}> Home </Button>

          </Flex>

          <Flex
          pos={"absolute"}
          display={getMenuActive}
          h="calc(100vh - 60px)" 
          w={"100%"}
          direction="column"
          px={"20px"}
          justify="space-between"
          backgroundColor={navBGColor}>

            <Tabs
            orientation="vertical"
            isFitted
            variant={"solid-rounded"}
            colorScheme="facebook"
            mt={4}
            onChange={(e) => {
                ROUTER.push(`/dashboard?tab=${e}`, undefined, { shallow: true })
            }}>
                <TabList
                w={"100%"}>
                    <Tab>Overview</Tab>
                    <Tab>Uploads</Tab>
                    <Tab>QR Codes</Tab>
                    <Tab>Settings</Tab>
                    <Tab>Help</Tab>
                </TabList>
            </Tabs>

            <Flex
            direction={"column"}
            gap={2}>
                <Button
                backgroundColor={"transparent"}
                rounded="full"
                color={"white.600"}
                colorScheme="facebook"
                onClick={() => {
                    toggleColorMode()
                }}>Toggle Theme</Button>
                <Button
                backgroundColor={"transparent"}
                rounded="full"
                color={"white.600"}
                colorScheme="facebook"
                mb={2}
                onClick={() => {
                    logoutUser()
                    ROUTER.reload()
                }}>Log Out</Button>
            </Flex>

          </Flex>
        </Box>
    )
  }