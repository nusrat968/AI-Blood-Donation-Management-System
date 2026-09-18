import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Donor from "./pages/Donor";
import BloodRequest from "./pages/BloodRequest";
import AIPage from "./pages/AIPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/donor" element={<Donor />} />
        <Route path="/request" element={<BloodRequest />} />
        <Route path="/ai" element={<AIPage />} />
      </Routes>
    </>
  );
}

export default App;