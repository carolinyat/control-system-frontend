import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Admin from "./pages/Admin";
// import UserHome from "./pages/UserHome";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/user/*" element={<UserHome />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
