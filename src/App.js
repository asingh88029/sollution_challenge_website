import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Hospital from "./pages/Hospital/Hospital";
import Map from "./pages/Map";
import Logout from "./components/LogoutUser/Logout";
import HospitalAdminLogin from "./components/HospitalLogin/HospitalLogin";
import HospitalDashboard from "./components/HospitalDashboard/HospitalDashboard";
import DoctorPage from "./pages/DoctorPage/DoctorPage";
import AddDoctor from "./components/AddDoctor/AddDoctor";
import SearchPage from "./pages/Search/Search";
import HospitalDash from "./components/HospitalDash/HospitalDash";
import DoctorPanel from "./components/HospitalDash/DoctorPanel";
import ApproveHospital from "./pages/ApproveHospital/ApproveHospital";
import SuperAdminLogin from "./pages/SuperAdminLogin/SuperAdminLogin";
import BookAppointment from "./components/DoctorCard/DoctorCard"
const GlobalContext = createContext();
function App() {
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [nearbyHospital, setNearbyHospital] = useState({});
  const [token, setToken] = useState();
  const [logoutPopupVisibility, setLogoutPopupVisibility] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await fetch("http://ip-api.com/json/");
      const data = await res.json();
      setLat(data.lat);
      setLng(data.lon);
      setLocation(data.city);
    })();
    if (!localStorage.getItem("token")) {
      setToken("");
    } else {
      setToken(JSON.parse(localStorage.getItem("token")));
    }
  }, []);
  useEffect(() => {
    if (!(location || lat || lng)) {
      return;
    }
    setNearbyHospital({});
    (async () => {
      // console.log(location, lat, lng);
      const detailURL = `${process.env.REACT_APP_BasePath}hospital/getNearbyHospitals`;
      if (window.location.pathname === "/") {
        const res = await fetch(detailURL, {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: lat,
            longitude: lng,
            radius: 500,
            mode: "D",
          }),
        });
        const data = await res.json();
        setNearbyHospital(data);
        // console.log(data);
      }
    })();
    console.log(token);
  }, [location, lat, lng]);

  return (
    <GlobalContext.Provider
      value={{
        location,
        setLocation,
        lat,
        setLat,
        lng,
        setLng,
        nearbyHospital,
        setNearbyHospital,
        token,
        setToken,
        setLogoutPopupVisibility,
      }}
    >
      <BrowserRouter>
        <NavBar />
        {token && logoutPopupVisibility && <Logout />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* hospitaldetails */}
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/map" element={<Map />} />

          {/* hospitalAdminRoutes */}
          {/* <Route path="/login" element={<HospitalAdminLogin />} /> */}
          <Route path="/bookappointment" element={<BookAppointment />} />

          <Route path="/hospital/update" element={<HospitalDashboard />} />
          <Route path="/hospital/addDoctor" element={<AddDoctor />} />
          <Route path="/hospital/doctor" element={<DoctorPanel />} />
          <Route path="/hospital/dashboard" element={<HospitalDash />} />

          {/* search Route */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/doctor/dashboard" element={<DoctorPage />} />

          {/* Government */}
          <Route path="/superAdmin/login" element={<SuperAdminLogin/>}/>
          <Route path="/superAdmin/approveHospital" element={<ApproveHospital/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
export { GlobalContext };
