import "./NavBar.css";
import NearbyHospital from "../NearbyHospital/NearbyHospital";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState, useContext } from "react";
import {
  FaSearch,
  FaUserCircle,
  FaCaretDown,
  FaBars,
  FaAddressCard,
  FaCalendarCheck,
  FaArrowLeft,
  FaUserAlt,
  FaHospitalAlt,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { HiOutlineLogout } from "react-icons/hi";
import { FiUserPlus } from "react-icons/fi";
import { GiIndiaGate } from "react-icons/gi";
import { GlobalContext } from "../../App";
import MicIcon from "@mui/icons-material/Mic";
const checkDevice = () => {
  if (window.screen.width <= 425) return true;
  return false;
};

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const NavBar = () => {
  const navigate = useNavigate();
  const [showNearbyHospitalMenu, setShowNearbyHospitalMenu] = useState(false);
  const menuRef = useRef(null);
  const [mobileMenuChecked, setMobileMenuChecked] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    location,
    setLocation,
    lat,
    setLat,
    lng,
    setLng,
    token,
    setToken,
    setLogoutPopupVisibility,
  } = useContext(GlobalContext);
  const logout = () => {
    setLogoutPopupVisibility(true);
    // toggleMenu(menuRef, mobileMenuChecked, setMobileMenuChecked);
    toggleMenu();
  };

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
        setSearchQuery(note);
        search();
      };
    }
    mic.onstart = () => {
      // console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  // console.log(note);
  useEffect(() => {
    setSearchQuery(note);
  }, [note]);
  useEffect(() => {
    if (window.screen.width > 425) {
      menuRef.current.style.display = "none";
    }
  }, []);
  const search = () => {
    console.log(searchQuery);
    navigate(`/search?query=${searchQuery}`);
    return;
  };
  const toggleMenu = () => {
    if (window.screen.width <= 425) {
      if (mobileMenuChecked) {
        setMobileMenuChecked(false);
      } else {
        setMobileMenuChecked(true);
      }
      return;
    }
    if (menuRef.current.style.display === "flex")
      menuRef.current.style.display = "none";
    else menuRef.current.style.display = "flex";
  };

  const User = () => {
    return (
      <>
        <Link to="user-details">
          <FaAddressCard />
          User Details
        </Link>
        <Link to="user-details">
          <FaCalendarCheck />
          Appointment History
        </Link>
        <button className="logout_btn" onClick={logout}>
          <HiOutlineLogout />
          Logout
        </button>
      </>
    );
  };
  const Hospital = () => {
    return (
      <>
        <Link to="/hospital/dashboard" onClick={() => toggleMenu()}>
          <MdSpaceDashboard />
          Dashboard
        </Link>
        <Link to="/hospital/update" onClick={() => toggleMenu()}>
          <GrUpdate />
          Update Details
        </Link>
        <Link to="/hospital/addDoctor" onClick={() => toggleMenu()}>
          <FiUserPlus />
          Add Doctor
        </Link>
        <button className="logout_btn" onClick={logout}>
          <HiOutlineLogout />
          Logout
        </button>
      </>
    );
  };
  const Doctor = () => {
    return (
      <>
        <Link to="/doctor/dashboard" onClick={() => toggleMenu()}>
          <MdSpaceDashboard />
          Dashboard
        </Link>
        <button className="logout_btn" onClick={logout}>
          <HiOutlineLogout />
          Logout
        </button>
      </>
    );
  };
  const SuperAdmin = () => {
    return (
      <>
        <Link to={`/superAdmin/approveHospital`} onClick={() => toggleMenu()}>
          <MdSpaceDashboard />
          Dashboard
        </Link>
        <button className="logout_btn" onClick={logout}>
          <HiOutlineLogout />
          Logout
        </button>
      </>
    );
  };
  return (
    <>
      <header className="navbar">
        <input
          type="checkbox"
          id="mobileMenu"
          className="mobileMenu"
          checked={mobileMenuChecked ? true : false}
          onChange={(e) => (e.target.checked = !e.target.checked)}
        />
        <div className="logo">
          {" "}
          <label
            className="fabars"
            htmlFor="mobileMenu"
            onClick={() => {
              toggleMenu();
            }}
          >
            <FaBars />
          </label>{" "}
          <Link to="/">MediCare</Link>
        </div>
        <div className="search">
          <input
            type="search"
            placeholder="Search hospitals, treaments..."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <button onClick={() => setIsListening((prevState) => !prevState)}>
            {!isListening ? (
              <span>
                <MicIcon />
              </span>
            ) : (
              <span style={{ display: "flex" }}>
                🛑
                <MicIcon />
              </span>
            )}
          </button>

          <button onClick={search}>
            <FaSearch />
          </button>
        </div>
        <div className="menu_container">
          {token ? (
            <div
              className="user"
              onClick={() => {
                toggleMenu();
              }}
            >
              <span onClick={() => toggleMenu()}>
                <FaArrowLeft className="menu_close" />
              </span>
              <div className="userPic">
                {/* {token.level === "hospital" ? <FaHospitalAlt /> : <FaUserCircle />} */}
                {token.level === "hospital" && <FaHospitalAlt />}
                {token.level === "user" && <FaUserCircle />}
                {token.level === "doctor" && (
                  <svg
                    style={{ height: "1.5rem" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M96 128C96 57.31 153.3 0 224 0C294.7 0 352 57.31 352 128C352 198.7 294.7 256 224 256C153.3 256 96 198.7 96 128zM128 370.3C104.9 377.2 88 398.6 88 424C88 454.9 113.1 480 144 480C174.9 480 200 454.9 200 424C200 398.6 183.1 377.2 160 370.3V304.9C166 304.3 172.1 304 178.3 304H269.7C275.9 304 281.1 304.3 288 304.9V362C260.4 369.1 240 394.2 240 424V464C240 472.8 247.2 480 256 480H272C280.8 480 288 472.8 288 464C288 455.2 280.8 448 272 448V424C272 406.3 286.3 392 304 392C321.7 392 336 406.3 336 424V448C327.2 448 320 455.2 320 464C320 472.8 327.2 480 336 480H352C360.8 480 368 472.8 368 464V424C368 394.2 347.6 369.1 320 362V311.2C393.1 332.9 448 401.3 448 482.3C448 498.7 434.7 512 418.3 512H29.71C13.3 512 0 498.7 0 482.3C0 401.3 54.02 332.9 128 311.2V370.3zM120 424C120 410.7 130.7 400 144 400C157.3 400 168 410.7 168 424C168 437.3 157.3 448 144 448C130.7 448 120 437.3 120 424z" />
                  </svg>
                )}
                {token.level==="admin" && <GiIndiaGate/>}
              </div>
              {token?.hospitalDetails?.hospitalName?.length > 14 &&
              window.screen.width < 800 &&
              window.screen.width > 425
                ? `${token?.hospitalDetails?.hospitalName?.slice(0, 12)}..`
                : token?.hospitalDetails?.hospitalName}
              {token?.user?.name?.length > 14 &&
              window.screen.width < 800 &&
              window.screen.width > 425
                ? `${token?.user?.name?.slice(0, 12)}..`
                : token?.user?.name}
              {token?.doctor?.name?.length > 14 &&
              window.screen.width < 800 &&
              window.screen.width > 425
                ? `${token?.doctor?.name?.slice(0, 12)}..`
                : token?.doctor?.name}
                {token?.level==="admin"?`Super Admin`:null}
              <FaCaretDown className="hide_on_mobile" />
            </div>
          ) : //check if the user device is a small device
          checkDevice() ? (
            //mobile Device
            <div
              className="user"
              onClick={() => {
                toggleMenu();
              }}
            >
              <span onClick={() => toggleMenu()}>
                <FaArrowLeft className="menu_close" />
              </span>
              <div className="userPic">
                <FaUserCircle />
              </div>
              Hello User
              <FaCaretDown className="hide_on_mobile" />
            </div>
          ) : (
            //not a mobile device
            <div className="user">
              <span onClick={() => toggleMenu()}>
                <FaArrowLeft className="menu_close" />
              </span>

              <Link
                to="/login"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="userPic">
                  <FaUserCircle />
                </div>
                Ankit
              </Link>
            </div>
          )}
          <menu className="menu" ref={menuRef}>
            {token && token.level === "hospital" && <Hospital />}
            {token && token?.level == "doctor" && <Doctor />}
            {token && token?.level == "admin" && <SuperAdmin />}
            {token && token.level === "user" && <User />}
            {!token && (
              <>
                <Link to="/login" onClick={() => toggleMenu()}>
                  <FaUserAlt />
                  Login
                </Link>
              </>
            )}
          </menu>
        </div>
        <div className="location">
          <div>
            <IoLocationSharp />
            {location}
          </div>
          <button onClick={() => setShowNearbyHospitalMenu(true)}>
            Change Location
          </button>
        </div>
      </header>
      {showNearbyHospitalMenu ? (
        <NearbyHospital
          setShowNearbyHospitalMenu={setShowNearbyHospitalMenu}
          setLocation={setLocation}
          setCoord={{ setLat, setLng }}
        />
      ) : null}
      <div className="margin_top"></div>
    </>
  );
};
export default NavBar;
