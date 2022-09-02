/**
 * @author Chitransh Verma
 * @usage LoginBoxForm
 * @require addNewUser from "firebase"
 */

import {
    Box,
    Flex,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Image,
    Text,
    Link,
} from "@chakra-ui/react"

import {
    ExternalLinkIcon
} from "@chakra-ui/icons"

import { useState } from "react";
import { addNewUser } from "../pages/api/firebase"
import NextLink from "next/link"
import { useRouter } from "next/router";


export default function LoginBox() {

    const [getUsername, setUsername] = useState()
    const [getEmail, setEmail] = useState()
    const [getPassword, setPassword] = useState()
    const [getButtonState, setButtonState] = useState(false)
    const router = useRouter()

    /* Requiring */
    const handleSubmit = () => {        
        document.getElementById("form-status").innerText = ""

        if(!getUsername || !getEmail || !getPassword) { 
            document.getElementById("form-status").innerText = "Fill out all the Fields."
            return;
        };
        
        setButtonState(true)

        addNewUser(getUsername, getEmail, getPassword)
        .then( async (e) => {

            document.getElementById("form-status").innerText = e[0];

            let emailSend = await fetch("api/sendMail", {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: getEmail,
                    id: e[1],
                    username: getUsername,
                }),
                method: "POST",
            })
            let {error} = await emailSend.json()
            if(!error) {
                document.getElementById("form-status").innerText = "Email with login ID send successfully."
                setTimeout(() => {
                    router.push({
                        pathname: "/login",
                    })
                }, 1500)
            }
            else document.getElementById("form-status").innerText = "Email cannot be send. Retry"
            setButtonState(false)
        })
        .catch((error) => {
            let refractedMsg = error.replace(/.*?\(.+\/(.+)\).*/, "$1");
            refractedMsg = refractedMsg.replaceAll("-", " ")
            document.getElementById("form-status").innerText = refractedMsg + ".";
            setButtonState(false)
        })

    }
    /* ///////Requiring//////// */


    return (
        <Flex
        width="full"
        align={"center"}
        justifyContent="center"
        height={"100vh"}
        >
            <Box 
            width={[300, 400, 480]}
            px={4}>
                <Flex 
                p={2} 
                textAlign="center"
                justify={"center"}
                gap={5}>

                    <Heading>Sign Up</Heading>
                    <Image src="icon.png" alt="icon"/>

                </Flex>

                <Flex 
                my={4} 
                textAlign={"left"}
                direction="column"
                p={[5, 6, 10]}
                borderWidth={1}
                rounded={8}
                boxShadow="lg"
                pb={2}>

                    <form id="main-form">

                        <FormControl isRequired>
                            <FormLabel> Username </FormLabel>
                            <Input 
                            variant="filled"
                            placeholder="John Deo"
                            onChange={(e) => { setUsername(e.currentTarget.value)}}/>
                        </FormControl>

                        <FormControl mt={6} isRequired>
                            <FormLabel> Email </FormLabel>
                            <Input 
                            variant={"filled"}
                            type="email"
                            placeholder="John@gmail.com"
                            onChange={(e) => { setEmail(e.currentTarget.value )}} />
                        </FormControl>

                        <FormControl mt={6} isRequired>
                            <FormLabel> Password </FormLabel>
                            <Input 
                            type={"password"}
                            variant="filled"
                            placeholder="Hello World"
                            pattern="[a-z0-9]{1,15}"
                            minLength={8}
                            onChange={(e) => { setPassword(e.currentTarget.value)}}/>
                        </FormControl>

                        <Text 
                        id="form-status"
                        pt={3}
                        textAlign="center"
                        textTransform={"capitalize"}></Text>

                        <Button 
                        colorScheme="yellow" 
                        width={"full"}
                        mt={5}
                        onSubmit={ () => {return false}}
                        onClick={(e) => {
                            handleSubmit();
                        }}
                        isLoading={getButtonState}>Sign Up</Button>

                    </form>

                    <Flex
                    direction={"row"}
                    mt={4}
                    align="center"
                    justifyContent={"space-between"}>
                        <NextLink href="/login">
                            <Link>Already have an account? <ExternalLinkIcon /> </Link>
                        </NextLink>
                        <NextLink href="/login">
                            <Link>Forgot Password? <ExternalLinkIcon /> </Link>
                        </NextLink>
                    </Flex>
                </Flex>
            </Box>

        </Flex>
    )
}