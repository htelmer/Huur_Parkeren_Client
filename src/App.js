import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Loading from "./components/Loading";
import Home from "./pages/HomePage";
import Navigation from "./components/navigation";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/LogIn";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import AreaDetails from "./pages/DetailPage";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);
  return (
    <div className="App">
      <Navigation />
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/:id" element={<AreaDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
