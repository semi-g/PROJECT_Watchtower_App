import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar"
import { useState } from "react"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { Link } from "react-router-dom"
import { tokens } from "../../theme"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined"
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined"
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined"
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined"
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import MapOutlinedIcon from "@mui/icons-material/MapOutlined"

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <MenuItem 
            active={selected === title} 
            style={{ color: colors.grey[100]}} 
            onClick={() => setSelected(title)} 
            icon={icon}
            routerLink={<Link to={to} />}
        >
            <Typography>{title}</Typography>
        </MenuItem>
    )
}

const SidebarFull = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(false) //Represent the current state of sidebar.
    const [selected, setSelected] = useState("Dashboard") //Represents the current page.
    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar()

    const toggle = () => {
        toggleSidebar()
        if (toggled) {
            collapseSidebar()
        }
        else {
            collapseSidebar()
        }
    }
    return (
        <Box>
            <Sidebar backgroundColor={colors.primary[400]} style={{ height: "100vh" }} rtl={false} >
                <Menu iconShape = "square">
                    {/* Menu icon */}
                    <MenuItem 
                        onClick={() => {toggle()}}  
                        icon = {<MenuOutlinedIcon/>}
                        style={{
                            textAlign: "center" ,
                            color: colors.grey[100],
                        }}
                    > 
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            ml="15px"
                        >
                            <Typography variant="h3" color={colors.grey[100]}>
                                ADMIN
                            </Typography>

                        </Box>
                    </MenuItem>

                    {/* User logo and name */}
                    {toggled ? (<Box mb='150px'/>) : (
                        <Box mb='25px'>
                            <Box display='flex' justifyContent='center' alignItems='center' sx={{ m: '10px 0 0 0'}}>
                                <img
                                    alt='profile-user'
                                    width='100px'
                                    height='100px'
                                    src={require('../../assets/pf.jpg')}
                                    style={{ cursor: 'pointer', borderRadius: '50%'}}
                                />
                            </Box>
                            <Box display='flex' justifyContent='center' alignItems='center'>
                                <Typography variant="h3" color={colors.grey[100]} sx={{ m: '10px 0 0 0'}}>Sem The Creator</Typography>
                            </Box>
                        </Box>
                    )}
                    {/* Menu Items */}
                    <Box sx = {{
                        "&:hover": {
                            color: `${colors.greenAccent[500]} !important`,
                            backgroundColor: "transparent !important"
                        }
                    }}>
                        {/* Seperate component for each item */}
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                            
                        />
                        <Item
                            title="Manage Team"
                            to="/team"
                            icon={<PeopleOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Contacts Information"
                            to="/contacts"
                            icon={<ContactsOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Invoice Balances"
                            to="/invoices"
                            icon={<ReceiptOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Profile Form"
                            to="/form"
                            icon={<PersonOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="FAQ Page"
                            to="/faq"
                            icon={<HelpOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Bar Chart"
                            to="/bar"
                            icon={<BarChartOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Pie Chart"
                            to="/pie"
                            icon={<PieChartOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Line Chart"
                            to="/line"
                            icon={<TimelineOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Geography"
                            to="/geography"
                            icon={<MapOutlinedIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    )
}

export default SidebarFull