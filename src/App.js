import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NotFoundPage from "./Pages/NotFoundPage";
import Login from "./Components/Auth/Login";
import DashBoard from "./Pages/Admin/DashBoard";
import UpdateAnnouncementPage from "./Pages/Admin/Announcements/UpdateAnnouncementsPage";
import AnnouncementsPage from "./Pages/Admin/Announcements/AnnouncementsPage";
import CreateNewAnnouncement from "./Pages/Admin/Announcements/CreateNewAnnouncement";
import SearchPage from "./Components/Body/SearchPage";
import UpdateWebsites from "./Pages/Admin/Websites/UpdateWebsites";
import UpdateWebsitesDetails from "./Pages/Admin/Websites/UpdateWebsitesDetails";
import '../src/Css/bootstrap.css'; 
import '../src/Css/style.css'; 
import '../src/Css/responsive.css'; 
import '../src/Css/colors.css'; 
import '../src/Css/garden.css'; 
import ManageImages from "./Pages/Admin/Websites/ManageImages";
import ManageAds from "./Pages/Admin/AdsManagement/ManageAds";
import LoadingDuyurular from "./Components/Body/LoadingDuyurular";
import Register from "./Components/Auth/Register";
import CreateRequest from "./Components/Body/CreateRequest";
import MyRequests from "./Components/Body/MyRequests";
import ExpertRequests from "./Components/Body/ExpertRequest";
import OfferPage from "./Components/Body/OfferPage";
import MyPageExpert from "./Components/Body/MyPageExpert";
import ExpertDetails from "./Components/Body/ExpertDetails";
import CheckOffer from "./Components/Body/CheckOffer";


function App() {
  return (
    <Routes>
      <Route path="/admin/*">
      <Route index element={<DashBoard/>} />
      <Route path="duyuru" element={<AnnouncementsPage />} />
      <Route path="duyuru/update/:id" element={<UpdateAnnouncementPage />} />
      <Route path="duyuru/create" element={<CreateNewAnnouncement />} />
      <Route path="websites" element={<UpdateWebsites />} />
      <Route path="websites/update/:id" element={<UpdateWebsitesDetails />} />
      <Route path="allimages" element={<ManageImages />} />
      <Route path="manage/ads" element={<ManageAds />} />
      </Route>
      <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/home_repair_client" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-request" element={<CreateRequest />} />
      <Route path="/my-requests" element={<MyRequests />} />
      <Route path="/find-requests" element={<ExpertRequests />} />
      <Route path="/offer/:id" element={<OfferPage />} />
      <Route path="/check-offer/:request_id" element={<CheckOffer />} />
      <Route path="/my-expert-page" element={<MyPageExpert />} />
      <Route path="/create-expert-details" element={<ExpertDetails />} />
     
      <Route path="/auth" element={<Login />} />
      <Route path="/loading" element={<LoadingDuyurular />} />
      <Route path="/search/:searchTerm" element={<SearchPage />} />
      <Route path='*' element={<NotFoundPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
