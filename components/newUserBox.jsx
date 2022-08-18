import {
    Box,
    Flex,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Image,
} from "@chakra-ui/react"


export default function LoginBox() {


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

                    <form>

                        <FormControl isRequired>
                            <FormLabel> Username </FormLabel>
                            <Input 
                            variant="filled"
                            placeholder="John Deo"/>
                        </FormControl>

                        <FormControl mt={6} isRequired>
                            <FormLabel> Email </FormLabel>
                            <Input 
                            variant={"filled"}
                            type="email"
                            placeholder="John@gmail.com"/>
                        </FormControl>

                        <FormControl mt={6} isRequired>
                            <FormLabel> Password </FormLabel>
                            <Input 
                            type={"password"}
                            variant="filled"
                            placeholder="Hello World"/>
                        </FormControl>

                        <Button 
                        colorScheme="yellow" 
                        width={"full"}
                        mt={6}
                        type="submit">Sign Up</Button>

                    </form>

                </Flex>

            </Box>

        </Flex>
    )
}