import { ChakraProvider } from "@chakra-ui/react";
import LoginBox from "../../components/loginBox";


export default function Login() {
    return (
        <ChakraProvider>
            <LoginBox />
        </ChakraProvider>
    )
}