import { Routes, Route } from "react-router";
import { NavLink, Outlet } from "react-router";
import "./App.css";
import { Home, Settings, SerialPortList, PortInfo } from './components/views';
import { TopMenu } from "./components/layout";
import { ThemeSwitch } from "./components/layout";
import { SchemaBuilder } from "./components/views/scheme";
import { SchemaList } from "./components/views/scheme";
import { SerialPortProvider } from "./context/serial-port";
// import { SettingsProvider } from "./context/settings";

function App() {

  return (
    // <SettingsProvider>
      <SerialPortProvider>
        <main className="container">
          <div className="top">
            <TopMenu></TopMenu>
            <ThemeSwitch themes={['theme-blackboard', 'theme-midnight-purple', 'theme-hacker-green', 'theme-dark-royal',]}>
            </ThemeSwitch>
          </div>
          <div className="middle">
            <div className="sidebar">

              <NavLink
                to="/port"
                className={({ isActive }) =>
                  isActive ? " menu-item active-menu-item sidebar-item" : "menu-item sidebar-item"
                }
              >
                PORTS
              </NavLink>

              <NavLink
                to="/scheme"
                className={({ isActive }) =>
                  isActive ? " menu-item active-menu-item sidebar-item" : "menu-item sidebar-item"
                }
              >
                SCHEMES
              </NavLink>
              <div className="sidebar-item">GRAPHS</div>
              <div className="sidebar-item">DATA</div>
            </div>
            <div className="view">
              <Outlet />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/port" element={<SerialPortList />} />
                <Route path="/port/:id" element={<PortInfo />} />
                <Route path="scheme" element={<SchemaList />} />
                <Route path="scheme/edit/:id" element={<SchemaBuilder />} />
              </Routes>

            </div>
          </div>
          <div className="bottom"></div>

        </main>
      </SerialPortProvider>
    // </SettingsProvider>
  );
}

export default App;
