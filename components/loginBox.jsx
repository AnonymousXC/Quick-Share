import Head from "next/head";
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
    Text
} from "@chakra-ui/react"



export default function LoginBox() {

    const [ getID, setID] = useState()
    const [getButtonState, setButtonState] = useState(false)
    const router = useRouter()

    let id = router.query.id ? AES.decrypt(router.query.id, "process.env").toString(enc.Utf8) : ""
    useEffect(() => {
        setID(id)
    }, [])

    const handleSubmit = () => {
        if(!getID) return

        const statusDiv = document.getElementById("login-status")

        setButtonState(true)

        loginUser(getID)
        .then((e) => {

            statusDiv.innerText = "Login Successful. Redirecting..."
            localStorage.setItem("userID", e.loginID)
            localStorage.setItem("data", JSON.stringify(e))
            router.push({
                pathname: "/dashboard",
            })
            
        })
        .finally(() => {
            setButtonState(false)
        })
        .catch((error) => {
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
                            <FormLabel>Login ID</FormLabel>
                            <Input 
                            placeholder="54das415"
                            variant={"filled"}
                            mt={4} 
                            defaultValue={id}
                            onChange={(e) => { 
                                setID(e.currentTarget.value)
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
                </Flex>
                
            </Flex>
        </Flex>
    )
}