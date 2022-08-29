import { 
    Box,
    useColorModeValue,
} from "@chakra-ui/react"
import DesktopSideBar from "./desktopSidebar"


export default function SideBar() {

    const bgColor = useColorModeValue("gray.300", "gray.900")

    return (
        <Box 
        backgroundColor={bgColor}
        width={[0, 0, 300]}
        height="100vh"
        position={"fixed"}>
            <DesktopSideBar />
        </Box>
    )
}