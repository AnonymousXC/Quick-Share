import Head from "next/head";
import SideBar from "../../components/dashboardSideBar";
import { 
    ChakraProvider,
} from "@chakra-ui/react";


export default function Dashboard() {
    return (
        <ChakraProvider>
            <Head>
                <title>Quick Share | Dashboard</title>
                <link href="icon.png" alt="icon" rel="Shortcut-Icon"></link>
            </Head>
            <SideBar />
        </ChakraProvider>
    )
}