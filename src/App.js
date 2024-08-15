import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDash from "./pages/AdminDash"
import AdminLogin from "./pages/AdminLogin"
import Home from "./pages/Home"
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='*' index element={<Home/>}></Route>
          <Route path="/admin/login" element={<AdminLogin/>} />
          <Route path="/admin/login" element={<AdminDash/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
