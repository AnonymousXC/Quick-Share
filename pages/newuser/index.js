import Head from "next/head";
import LoginBox from "../../components/newUserBox";
import { 
    ChakraProvider
} from "@chakra-ui/react";



export default function NewUser() {
    return (
        <ChakraProvider>
            <Head>
                <title>Quick Share | Sign Up</title>
                <link rel="Shortcut icon" href="icon.png"></link>
            </Head>
            <LoginBox />
        </ChakraProvider>
    )
}