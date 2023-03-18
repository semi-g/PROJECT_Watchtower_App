import { Box, useTheme, Typography } from "@mui/material"
import Header from "../../components/Header"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { tokens } from "../../theme"

const FAQ = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Box m="20px">
            <Header title="FAQ" subtitle="Frequently Asked Questions and Answers"/>
            <Accordion>
                <AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
                    <Typography color={ colors.greenAccent[500] } variant="h5">
                        Question 1
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Test answer to question 1.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
                    <Typography color={ colors.greenAccent[500] } variant="h5">
                        Question 2
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Test answer to question 2.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
                    <Typography color={ colors.greenAccent[500] } variant="h5">
                        Question 3
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Test answer to question 3.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
                    <Typography color={ colors.greenAccent[500] } variant="h5">
                        Question 4
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Test answer to question 4.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    )

}

export default FAQ