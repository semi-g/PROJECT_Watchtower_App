import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar"
import SidebarFull from "./scenes/global/Sidebar"
import Dashboard from "./scenes/dashboard"
import Team from "./scenes/team"
import { useState } from "react";
import Invoices from "./scenes/invoices"
import Contacts from "./scenes/contacts"
import AIInterfacePage from "./scenes/aiprompt"
import Form from "./scenes/form"
import Line from "./scenes/line"
import Pie from "./scenes/pie"
import FAQ from "./scenes/faq"
import Geography from "./scenes/geography"

function App() {
  const [theme, colorMode] = useMode()
  const [isSidebar, setIsSidebar] = useState(true)
  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
            <div className="app">
              <SidebarFull/>
              <main className="content">
                <Topbar />
                <Routes>
                  <Route path="/" element={<Dashboard/>} />
                  <Route path="/team" element={<Team/>} />
                  <Route path='/invoices' element={<Invoices/>} /> 
                  <Route path='/contacts' element={<Contacts/>} />
                  <Route path='/aiprompt' element={<AIInterfacePage/>} />
                  <Route path='/form' element={<Form/>} />
                  <Route path='/line' element={<Line/>} />
                  <Route path='/pie' element={<Pie/>} />
                  <Route path='/faq' element={<FAQ/>} />
                  <Route path='/geography' element={<Geography/>} />
                </Routes>
              </main>
            </div>
        </ThemeProvider>
      </ColorModeContext.Provider>  
  );
}

export default App;
