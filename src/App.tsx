import { Routes, Route } from "react-router";
import { NavLink, Outlet } from "react-router";
import "./App.css";
import { Home, Settings, Port } from './components/views';
import { TopMenu } from "./components/layout";
import { ThemeSwitch } from "./components/layout";
import { SchemaBuilder } from "./components/views/scheme";
import { SchemaList } from "./components/views/scheme";

function App() {

  return (
    <main className="container">
      <div className="top">
        <TopMenu></TopMenu>
        <ThemeSwitch themes={['theme-blackboard', 'theme-midnight-purple', 'theme-hacker-green', 'theme-dark-royal',]}>
        </ThemeSwitch>
      </div>
      <div className="middle">
        <div className="sidebar">
          <div className="sidebar-item">
            <NavLink
              to="/port"
              className={({ isActive }) =>
                isActive ? " menu-item active-menu-item" : "menu-item"
              }
            >
              PORTS
            </NavLink>
          </div>
          <div className="sidebar-item">
            <NavLink
              to="/scheme"
              className={({ isActive }) =>
                isActive ? " menu-item active-menu-item" : "menu-item"
              }
            >
              SCHEMES
            </NavLink>
          </div>
          <div className="sidebar-item">GRAPHS</div>
          <div className="sidebar-item">DATA</div>
        </div>
        <div className="view">
          <Outlet />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/port" element={<Port />} />
            <Route path="scheme" element={<SchemaList />} />
            <Route path="scheme/edit/:id" element={<SchemaBuilder />} />
          </Routes>

        </div>
      </div>
      <div className="bottom"></div>

    </main>
  );
}

export default App;
