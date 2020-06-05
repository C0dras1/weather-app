import React from "react";
import "./App.css";
import Forecast from "./components/Forecast/Forecast";
import Logo from "./components/Logo/Logo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <h1>UmbrellaCheck</h1>
      </header>
      <main>
        <Forecast />
      </main>
      <div className="footer">
        <footer>App created by Jesse Suderman</footer>
      </div>
    </div>
  );
}

export default App;
