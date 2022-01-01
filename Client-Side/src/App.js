import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Layout from "./components/layout/Layout";
import Overview from "./pages/Tours/Overview";
function App() {
  return (
    <Routes>
      <Route path="/login" exact element={<Login />} />
      <Route path="/" exact element={<Signup />} />
      <Route path="/overview" exact element={<Overview />} />
    </Routes>
  );
}

export default App;
