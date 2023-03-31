import "./Logout.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
const Logout=()=>{
    const navigate=useNavigate();
    const {setToken,setLogoutPopupVisibility}=useContext(GlobalContext);

    const handleLogout=()=>{
        setLogoutPopupVisibility(false);
        localStorage.clear("token");
        setToken("");
        navigate("/");
    }


    return(
        <div className="logout_popup_model">
            <div className="logout_popup_model_msg">Are you sure want to logout?</div>
            <div className="logout_popup_model_buttons">
                <button onClick={()=>setLogoutPopupVisibility(false)}>Cancel</button>
                <button className="logout_primary_btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}
export default Logout;