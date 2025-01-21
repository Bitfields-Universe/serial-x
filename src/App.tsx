// import { useState } from "react";
import { Routes, Route } from "react-router";
// import { Outlet } from "react-router";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Home, Settings } from './components/views';
import { TopMenu } from "./components/layout";
import { ThemeSwitch } from "./components/layout";

function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  // setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <main className="container">
      <div className="top">
        <TopMenu></TopMenu>
        <ThemeSwitch themes={['theme-blackboard', 'theme-midnight-purple', 'theme-hacker-green', 'theme-dark-royal',]}>
        </ThemeSwitch>
      </div>
      <div className="middle">
        <div className="sidebar">
          <div className="sidebar-item">Ports</div>
          <div className="sidebar-item">Graph</div>
          <div className="sidebar-item">Data</div>
        </div>
        <div className="view">
          {/* <Outlet /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>

        </div>
      </div>
      <div className="bottom"></div>

    </main>
  );
}

export default App;
