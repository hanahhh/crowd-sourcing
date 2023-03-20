import { Layout } from "antd";
import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./view/login/Login";
import TheLayout from "./container/TheLayout";
import Register from "./view/register/Register";
import { useEffect } from "react";
import { store } from "./redux/store";
import { getAllServices } from "./redux/action/service";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllServices());
  }, []);
  return (
    <Routes>
      <Route exact path="/login" name="Login" element={<Login />} />
      <Route exact path="/register" name="Register" element={<Register />} />
      <Route exact path="*" name="Home" element={<TheLayout />} />
    </Routes>
  );
}

export default App;
