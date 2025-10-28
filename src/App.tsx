import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import Pronuncia from "./pages/Pronuncia"; import Finalizacao from "./pages/Finalizacao";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/admin/usuarios" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/pronuncia" element={<Pronuncia />} />
        <Route path="/finalizacao" element={<Finalizacao />} />
      </Routes>
    </Router>
  );
}

export default App;
