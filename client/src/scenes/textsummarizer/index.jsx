import { Box } from "@mui/material";
import Header from "../../components/Header";
import TextSummarizer from "../../components/TextSummarizer";

const TextSummarizerInterface = () => {
    return (
        <Box m="20px">
            <Header title="Text Summarizer" />
            <Box height="75vh">
                <TextSummarizer />
            </Box>
        </Box>
    )
}

export default TextSummarizerInterface