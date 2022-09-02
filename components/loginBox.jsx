import Head from "next/head";
import NextLink from "next/link"
import { AES } from "crypto-js";
import { enc } from "crypto-js";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../pages/api/firebase";
import {
    Flex,
    Image,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    Link
} from "@chakra-ui/react"

import {
    ExternalLinkIcon
} from "@chakra-ui/icons"


export default function LoginBox() {

    const [ getEmail, setEmail] = useState()
    const [ getPassword, setPassword] = useState()
    const [getButtonState, setButtonState] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if(localStorage.getItem("userID") && localStorage.getItem("username") && localStorage.getItem("email"))
            router.push("/dashboard")
    }, [])

    const handleSubmit = () => {
        if(!getEmail || !getPassword) return;

        const statusDiv = document.getElementById("login-status")

        setButtonState(true)
        
        loginUser(getEmail.trim(), getPassword.trim())
        .then((e) => {

            statusDiv.innerText = "Login Successful. Redirecting..."
            localStorage.setItem("userID", e.loginID)
            localStorage.setItem("username", e.username)
            localStorage.setItem("email", e.email)
            router.push({
                pathname: "/dashboard",
            })
        })
        .finally(() => {
            setButtonState(false)
        })
        .catch((error) => {
            let refractedError = String(error).replace(/.*\(.+\).*/, `$1`)
            statusDiv.innerText = error
            setButtonState(false)
        })
    }

    return (
        <Flex
        justify={"center"}
        align="center"
        width={"100vw"}
        h={"90vh"}>
            <Head>
                <title>Quick Share | Login</title>
                <link rel="shortcut icon" href="icon.png" type="image/x-icon" />
            </Head>
            <Flex
            align={"center"}
            justify="center"
            direction={"column"}
            mt={8}>

                <Flex
                gap={4}>
                    <Heading>Login</Heading>
                    <Image src="icon.png" alt="icon"></Image>
                </Flex>

                <Flex
                width={[300,400,480]}
                align="left"
                justify={"left"}
                p={5}
                borderWidth={1}
                rounded={6}
                boxShadow={"lg"}
                direction={"column"}
                mt={12}
                mx={[2,2,0]}>
                    <form>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input 
                            id="email-inp"
                            placeholder="john@gmail.com"
                            variant={"filled"}
                            mt={1}
                            onChange={(e) => { 
                                setEmail(e.currentTarget.value)
                                }}/>
                        </FormControl>
                        <FormControl isRequired
                        mt={6}>
                            <FormLabel>Password</FormLabel>
                            <Input 
                            id="password-inp"
                            placeholder="********"
                            variant={"filled"}
                            type="password"
                            mt={1} 
                            onChange={(e) => { 
                                setPassword(e.currentTarget.value)
                                }}/>
                        </FormControl>

                        <Text 
                        id="login-status"
                        mt={4}
                        textAlign="center"></Text>

                        <Button
                        mt={4}
                        w="100%"
                        colorScheme="yellow"
                        onClick={() => { handleSubmit() }}
                        isLoading={getButtonState}>Login</Button>
                    </form>
                    <NextLink href="/newuser">
                        <Link 
                        mt={4}>Don't Have an Account? <ExternalLinkIcon /> </Link>
                    </NextLink>
                </Flex>
                
            </Flex>
        </Flex>
    )
}