import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { 
  Box,
  Flex,
  useColorModeValue,
  Image,
  Button,
  useColorMode,
  Switch,
  Text,
 } from "@chakra-ui/react";

import {
  SunIcon,
  MoonIcon,
  HamburgerIcon,
  CloseIcon,
} from "@chakra-ui/icons"



export default function Navbar() {
  return (
    <Box h={"60px"} w="100vw">
      <DesktopNavBar />
      <MobileNavBar />
    </Box>
  )
}


export function DesktopNavBar() {
  const ROUTER = useRouter()
  const navBGColor  = useColorModeValue("white", "gray.800");
  const navColor = useColorModeValue("gray.800", "white");
  const navBorderColor = useColorModeValue("gray.200", "gray.900");
  const { colorMode ,toggleColorMode } = useColorMode();
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const linkColor = useColorModeValue('gray.600', 'gray.200');

  return <Flex 
      h="60px"
      w="100vw"
      display={["none" , "none" , "flex" , "flex"]}
      backgroundColor={navBGColor}
      color={navColor}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderColor={navBorderColor}
      borderStyle={"solid"}
      align="center"
      justify={"space-between"}>
        <Flex>
          <Image src="icon.png" alt="icon"></Image>
          <Flex align={"center"} gap="26px" ml={"26px"}>
            <Link href="#" 
            fontWeight={"600"} 
            fontSize={"md"}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}>
              Home
            </Link>
            <Link href="#"
            fontWeight={"600"} 
            fontSize={"md"}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}>
              Services
            </Link>
            <Link href="#"
            fontWeight={"600"} 
            fontSize={"md"}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}>
              Contact Me
            </Link>
            <Link href="#"
            fontWeight={"600"} 
            fontSize={"md"}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}>
              About
            </Link>
          </Flex>
        </Flex>
        <Flex align={"center"} gap="16px">
          <Button
          onClick={() => {
            toggleColorMode();
          }}>
            { colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>
          <Link href="/newuser">
            <Button>
              Sign Up
            </Button>
          </Link>
          <Button 
          colorScheme="yellow"
          onClick={() => {
            if(localStorage.getItem("email") && localStorage.getItem("userID") && localStorage.getItem("username"))
              ROUTER.push("/dashboard")
            else
              ROUTER.push("/login")
          }}>
            Sign In
          </Button>
        </Flex>
      </Flex>
}

export function MobileNavBar() {
  const navBGColor  = useColorModeValue("white", "gray.800");
  const navColor = useColorModeValue("gray.800", "white");
  const navBorderColor = useColorModeValue("gray.200", "gray.900");
  const { colorMode ,toggleColorMode } = useColorMode();
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const linkColor = useColorModeValue('gray.600', 'gray.200');
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
          <Image src="icon.png" alt="icon" m={"0 auto"}></Image>
          <Link href="/login">
            <Button colorScheme="teal">Sign In</Button>
          </Link>
        </Flex>
        <Flex
        display={getMenuActive}
        h="calc(100vh - 60px)" 
        w={"100%"}
        direction="column"
        pl={"16px"}>
            <Link href="#" 
            fontWeight={"bold"} 
            fontSize={"md"}
            display="flex"
            alignItems={"center"}
            h="40px"
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}>
              Home
            </Link>
            <Link href="#"
            fontWeight={"bold"} 
            fontSize={"md"}
            display="flex"
            alignItems={"center"}
            h="40px"
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}>
              Services
            </Link>
            <Link href="#"
            fontWeight={"bold"} 
            fontSize={"md"}
            display="flex"
            alignItems={"center"}
            h="40px"
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}>
              Contact Me
            </Link>
            <Link href="#"
            fontWeight={"bold"} 
            fontSize={"md"}
            display="flex"
            alignItems={"center"}
            h="40px"
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}>
              About
            </Link>
            <Flex align={"center"} gap={5} h="40px">
              <Text 
              fontWeight={"bold"} 
              fontSize={"md"} 
              m="0" color={linkColor}>Dark Mode </Text> 
              <Switch 
              isChecked={colorMode === "dark" ? true : false}
              onChange={() => { toggleColorMode() }}
              size={"md"} 
              colorScheme="teal" 
              m="0px"></Switch>
            </Flex>
        </Flex>
      </Box>
  )
}