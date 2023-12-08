import "./App.css";
import { Route, Routes } from "react-router-dom";
import React from 'react';
import CreateOTP from '../frontend/pages/CreateOTP'; 

function App() {
  return (
    <main>
      <Routes>
        <Route path="/createOTP" element={<CreateOTP />} />
      </Routes>
    </main>
  );
}

export default App; 