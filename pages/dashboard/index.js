import Head from "next/head";
import { 
    ChakraProvider,
    Button,
} from "@chakra-ui/react";


export default function Dashboard() {
    return (
        <ChakraProvider>
            <Head>
                <title>Quick Share | Dashboard</title>
                <link href="icon.png" alt="icon" rel="Shortcut-Icon"></link>
            </Head>
        </ChakraProvider>
    )
}