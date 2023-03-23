import { Box, Button, IconButton, Typography, useTheme } from "@mui/material"
import Header from "../../components/Header"
import { mockTransactions } from "../../data/mockData"
import { tokens } from "../../theme"
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import EmailIcon from "@mui/icons-material/Email"
import PointOfSaleIcon from "@mui/icons-material/PointOfSale"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import TrafficIcon from "@mui/icons-material/Traffic"
import LineChart from "../../components/LineChart"
import AIPrompt from "../../components/AIPrompt"
import GeoChart from "../../components/GeoChart"
import StatBox from "../../components/StatBox"
import ProgressCircle from "../../components/ProgressCircle"
import TextSummarizer from "../../components/TextSummarizer"

const Dashboard = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Overview" />

                {/* Button at the top right */}
                <Box>
                    <Button sx={{
                        backgroundColor: colors.blueAccent[700], 
                        color: colors.grey[100], 
                        fontSize:"14px", 
                        fontWeight: "Bold",
                        padding:"10px 20px"    
                    }}>
                        <DownloadOutlinedIcon sx={{mr:"10px"}} />
                        Download Report
                    </Button>
                </Box>
            </Box>
            {/* Dashboard grid elements */}
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
                {/* ROW 1 */}
                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
                    <StatBox 
                        title="5230" 
                        subtitle="Test value 1" 
                        progress="0.75" 
                        increase="+14%" 
                        icon={<EmailIcon sx={{color: colors.greenAccent[600], fontSize: "26px"}}/>}
                    />
                </Box>

                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
                    <StatBox 
                        title="1000" 
                        subtitle="Test value 2" 
                        progress="0.50" 
                        increase="+19%" 
                        icon={<PointOfSaleIcon sx={{color: colors.greenAccent[600], fontSize: "26px"}}/>}
                    />
                </Box>

                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
                    <StatBox 
                        title="400" 
                        subtitle="Test value 3" 
                        progress="0.25" 
                        increase="+7%" 
                        icon={<PersonAddIcon sx={{color: colors.greenAccent[600], fontSize: "26px"}}/>}
                    />
                </Box>

                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
                    <StatBox 
                        title="900" 
                        subtitle="Test value 4" 
                        progress="0.30" 
                        increase="+31%" 
                        icon={<TrafficIcon sx={{color: colors.greenAccent[600], fontSize: "26px"}}/>}
                    />
                </Box>

                {/* ROW 2 */}
                <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
                    <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                                Revenue Generated
                            </Typography>

                            <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                                $99,610,564.00
                            </Typography>
                        </Box>

                        <Box>
                            <IconButton>
                                <DownloadOutlinedIcon sx={{fontSize: "25px", color: colors.greenAccent[500]}}/>
                            </IconButton>
                        </Box>
                    </Box>

                    <Box height="250px" mt="-20px">
                        <LineChart isDashboard={true}/>
                    </Box>
                </Box>
                <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                    >
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Recent Transactions
                        </Typography>
                    </Box>
                    {mockTransactions.map((transaction, i) => (
                        <Box
                            key={`${transaction.txId}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            p="15px"
                        >
                            <Box>
                                <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                                    {transaction.txId}
                                </Typography>

                                <Typography color={colors.grey[100]}>
                                    {transaction.user}
                                </Typography>
                            </Box>
                            <Box color={colors.grey[100]}>{transaction.date}</Box>
                            <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                                {transaction.cost}
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* ROW 3 */}
                <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
                    <Typography variant="h5" fontWeight="600" sx={{p: "15px 30px 15px 20px"}}>
                        Article Summarize
                    </Typography>
                    <Box height="250px" mt="-20px">
                        <TextSummarizer isDashboard={true}/>
                   </Box>
                </Box>

                <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
                    <Typography variant="h5" fontWeight="600" sx={{p: "15px 30px 15px 20px"}}>
                        AI Prompt
                    </Typography>
                    <Box height="250px" mt="-20px">
                        <AIPrompt isDashboard={true}/>
                   </Box>
                </Box>

                <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
                    <Typography variant="h5" fontWeight="600" sx={{mb: "15px"}}>
                        Geography Based Traffic
                    </Typography>
                    <Box height="200px">
                        <GeoChart isDashboard={true}/>
                   </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard