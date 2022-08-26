import Head from "next/head";
import { useState } from "react";
import { loginUser } from "../pages/api/firebase";
import {
    Flex,
    Image,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button
} from "@chakra-ui/react"



export default function LoginBox() {

    const [ getID, setID] = useState()
    const [getButtonState, setButtonState] = useState(false)

    const handleSubmit = () => {
        if(!getID) return

        setButtonState(true)

        loginUser(getID)
        .then((e) => {
            console.log(e);
        })
        .finally(() => {
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
                            onChange={(e) => { 
                                setID(e.currentTarget.value)
                                }}/>
                        </FormControl>

                        <Button
                        mt={6}
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