import { Box } from "@mui/material";
import Header from "../../components/Header";
import AIPrompt from "../../components/AIPrompt";

const AIInterfacePage = () => {
    return (
        <Box m="20px">
            <Header title="AI Prompt" />
            <Box height="75vh">
                <AIPrompt />
            </Box>s
        </Box>
    )
}

export default AIInterfacePage