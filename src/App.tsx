import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
// import UserHome from "./pages/UserHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/admin/usuarios" element={<Admin />} />
        {/* <Route path="/user/*" element={<UserHome />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
