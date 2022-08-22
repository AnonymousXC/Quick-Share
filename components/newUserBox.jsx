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
} from "@chakra-ui/react"

import { useState } from "react";
import { addNewUser } from "../pages/api/firebase"


export default function LoginBox() {

    const [getUsername, setUsername] = useState()
    const [getEmail, setEmail] = useState()
    const [getPassword, setPassword] = useState()

    const handleSubmit = () => {
        if(!getUsername || !getEmail || !getPassword) { 
            document.getElementById("form-status").innerText = "Fill out all the Fields."
            return;
        };
        
        addNewUser(getUsername, getEmail, getPassword)
        .then((e) => {
            document.getElementById("form-status").innerText = e;
        })
        .catch((error) => {
            console.log(error.message);
        })

    }


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

                    <Heading>Login</Heading>
                    <Image src="icon.png" alt="icon"/>

                </Flex>

                <Flex 
                my={4} 
                textAlign={"left"}
                direction="column"
                p={[5, 6, 10]}
                borderWidth={1}
                rounded={8}
                boxShadow="lg">

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
                            onChange={(e) => { setPassword(e.currentTarget.value)}} />
                        </FormControl>

                        <Text 
                        id="form-status"
                        pt={3}
                        textAlign="center"></Text>

                        <Button 
                        colorScheme="yellow" 
                        width={"full"}
                        mt={5}
                        onSubmit={ () => {return false}}
                        onClick={(e) => {
                            handleSubmit();
                        }}>Sign Up</Button>

                    </form>

                </Flex>

            </Box>

        </Flex>
    )
}