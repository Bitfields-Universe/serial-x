// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
// import { TopMenu, Dashboard, StatusBar, ThemeSwitch } from "./components/layout";
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
        <ThemeSwitch themes={
          ['theme-blackboard', 'theme-dark-ocean', 'theme-midnight-purple', 'theme-dark-hello-kitty', 'theme-hacker-green',
            'theme-dark-royal',
          ]
        }>
        </ThemeSwitch>
        <div className="logo">
          <p>SERIAL <span className="letter-x">X</span></p>
        </div>
      </div>
      <div className="middle">
        <div className="sidebar"></div>
        <div className="view"></div>
      </div>
      <div className="bottom"></div>

    </main>
  );
}

export default App;
