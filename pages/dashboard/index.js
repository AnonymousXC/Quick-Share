import Head from "next/head";
import NextLink from "next/link"
import SideBar from "../../components/dashboardSideBar";
import { useEffect, useState } from "react";
import { 
    ChakraProvider,
    Heading,
    Flex,
    Button,
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
            direction="column"> 
                <Heading>Error Finding User. Relogin.</Heading>
                <NextLink href="/login">
                    <Button
                    mt={6}
                    colorScheme="yellow">Go to Sign In.</Button>
                </NextLink>
            </Flex>
        </ChakraProvider>
    )
}