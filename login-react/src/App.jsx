import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";


function App() {
  return (
    <div>
     
      <div className="flex justify-center gap-10 py-5 bg-gray-100">
        <Link to="/login" className="font-bold text-blue-600">Login</Link>
        <Link to="/signup" className="font-bold text-blue-600">Signup</Link>
      </div>

    
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;


