import Head from "next/head";
import NextLink from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DesktopSideBar from "../../components/.sidebars/desktopSidebar";
import MobileMenu from "../../components/.sidebars/mobileMenu";
import OverviewTab from "../../components/.tab/Overview";
import { 
    ChakraProvider,
    Heading,
    Flex,
    Button,
    Text,
    Box,
} from "@chakra-ui/react";


export default function Dashboard() {
    
    const [ loadFull, setFullLoad ] = useState(false)

    useEffect(() => {
        if(localStorage.getItem("email") && localStorage.getItem("username") && localStorage.getItem("userID"))
            setFullLoad(true)
    }, [])

    return (
        <>
            {loadFull === true ? <DashboardBody /> : <ErrorFindingUser />}
        </>
    )
}


const DashboardBody = ()  => {

    const ROUTER = useRouter()

    return (
        <ChakraProvider>
            
            <Head>
                <title>Quick Share | Dashboard</title>
                <link href="icon.png" alt="icon" rel="Shortcut-Icon"></link>
            </Head>

            <Box
            display={["block", "block", "flex", "flex"]}>
                <DesktopSideBar />
                <MobileMenu />
                { ROUTER.query.tab == 0 ? <OverviewTab /> : "" }
            </Box>

        </ChakraProvider>
    )
}

const ErrorFindingUser = () => {


    return (
        <ChakraProvider>
            <Head>
                <title>Quick Share | Dashboard</title>
                <link href="icon.png" alt="icon" rel="Shortcut-Icon"></link>
            </Head>
            <Flex
            justify={"center"}
            align="center"
            h={"100vh"}
            px={6}
            direction="column"> 
                <Heading
                textAlign={"center"}>Error Finding User. Relogin.</Heading>
                <NextLink href="/login">
                    <Button
                    mt={6}
                    colorScheme="yellow">Go to Sign In.</Button>
                </NextLink>
            </Flex>
        </ChakraProvider>
    )
}