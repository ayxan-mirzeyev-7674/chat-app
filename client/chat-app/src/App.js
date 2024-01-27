import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Main from "./components/Main/Main";
import NoPage from "./components/NoPage";
//import { io } from "socket.io-client";
//import { useEffect } from 'react';

function App() {
  /*useEffect(() => {
    const socket = io("http://192.168.31.94:8000");
    socket.on("first", (ms) => {console.log(ms)})

  }, [])*/

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path ="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Main />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
