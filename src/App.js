import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NotFoundPage from "./Pages/NotFoundPage";
import Login from "./Components/Auth/Login";
import '../src/Css/bootstrap.css'; 
import '../src/Css/style.css'; 
import '../src/Css/responsive.css'; 
import '../src/Css/colors.css'; 
import '../src/Css/garden.css'; 
import Register from "./Components/Auth/Register";
import ChangePassword from "./Components/Body/ChangePassword";
import AdminPanel from "./Components/Body/AdminPanel";



function App() {
  return (
    <Routes>
      <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/home_repair_client" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auth" element={<Login />} />
      <Route path="/mypage" element={<ChangePassword />} />
      <Route path="/adminpage" element={<AdminPanel />} />

      {/* <Route path="/loading" element={<LoadingDuyurular />} /> */}
      <Route path='*' element={<NotFoundPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
