import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import RegistrationForm from "./RegistrationPage";
import CompaniesList from "./Browse-JobPage";
import SkillGapAnalysis from "./Road-map";
import UserProfile from "./UserProfile";
import Maps from "./Maps";

function RouteApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegistrationForm />}/>
        <Route path="/home" element={<CompaniesList />}/>
        <Route path="/roadmap" element={<SkillGapAnalysis />}/>
        <Route path="/profile" element={<UserProfile />}/>
        <Route path="/map" element={<Maps/>}/>
      </Routes>
    </Router>
  );
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<RouteApp />);
