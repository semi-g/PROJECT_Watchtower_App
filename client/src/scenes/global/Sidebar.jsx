import { useState } from "react"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { Link } from "react-router-dom"
import { tokens } from "../../theme"
import { BsArrowLeftShort, BsFillCpuFill } from "react-icons/bs"
import { RiDashboardFill, RiTeamFill } from "react-icons/ri"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined"
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined"
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import MapOutlinedIcon from "@mui/icons-material/MapOutlined"


const SidebarFull = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [open, setOpen] = useState(true)

    return (
        <div className='flex'>
            <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ? "w-64" : "w-20"} duration-300 relative`}>
                <BsArrowLeftShort className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 
                    border border-dark-purple cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}
                />
                <div className='inline-flex'>
                    <BsFillCpuFill className='bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 shrink-0'/>
                    <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>Test App</h1>
                </div>

                <ul className='pt-2'>
                    <Link to='/'>
                        <li className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2'>
                            <span className='text-2xl block float-left'>
                                <RiDashboardFill/>
                            </span>
                            <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>Dashboard</span>
                        </li>
                    </Link>    
                    <Link to='/team'>
                        <li className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2'>
                            <span className='text-2xl block float-left'>
                                <RiTeamFill/>
                            </span>
                            <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>Team</span>
                        </li>
                    </Link>
                    <Link to='/invoices'>
                        <li className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2'>
                            <span className='text-2xl block float-left'>
                                <ReceiptOutlinedIcon/>
                            </span>
                            <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>Invoices</span>
                        </li>
                    </Link>
                    <Link to='/contacts'>
                        <li className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2'>
                            <span className='text-2xl block float-left'>
                                <ContactsOutlinedIcon/>
                            </span>
                            <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>Contacts</span>
                        </li>
                    </Link>
                    <Link to='/faq'>
                        <li className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2'>
                            <span className='text-2xl block float-left'>
                                <HelpOutlinedIcon/>
                            </span>
                            <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>faq</span>
                        </li>
                    </Link>
                    <Link to='/form'>
                        <li className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2'>
                            <span className='text-2xl block float-left'>
                                <PersonOutlinedIcon/>
                            </span>
                            <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>Form</span>
                        </li>
                    </Link>
                    <Link to='/aiprompt'>
                        <li className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2'>
                            <span className='text-2xl block float-left'>
                                <SmartToyOutlinedIcon/>
                            </span>
                            <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>AI Prompt</span>
                        </li>
                    </Link>
                    <Link to='/line'>
                        <li className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2'>
                            <span className='text-2xl block float-left'>
                                <TimelineOutlinedIcon/>
                            </span>
                            <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>Line</span>
                        </li>
                    </Link>
                    <Link to='/textsummarizer'>
                        <li className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2'>
                            <span className='text-2xl block float-left'>
                                <NewspaperIcon/>
                            </span>
                            <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>Summarize</span>
                        </li>
                    </Link>
                    <Link to='/geography'>
                        <li className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2'>
                            <span className='text-2xl block float-left'>
                                <MapOutlinedIcon/>
                            </span>
                            <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>Geo</span>
                        </li>
                    </Link>
                </ul>

            </div>
        
      </div>
    )
}

export default SidebarFull