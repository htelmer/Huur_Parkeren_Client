import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Navigation from "./components/navigation";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/LogIn";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
