import Head from "next/head"
import Navbar from "../components/navBar"
 
import {
    ChakraProvider,
} from "@chakra-ui/react"


export default function Home() {
    return (
        <ChakraProvider>

            <Head>
                <title>Quick Share</title>
                <link rel="Shortcut Icon" href="icon.png"></link>
            </Head>
            <Navbar />
        </ChakraProvider>
    )
}