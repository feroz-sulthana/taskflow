
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Task from "./Pages/Task";
import Logo from "./Components/Logo";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task" element={<Task />} />
          <Route path="/logo" element={<Logo />} />
          
          
         
          
          



        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
