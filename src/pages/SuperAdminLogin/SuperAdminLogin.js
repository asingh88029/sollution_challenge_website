import "./SuperAdminLogin.css";
import { useState,useRef,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import {ImSpinner5} from "react-icons/im";
import { GlobalContext } from "../../App";
const SuperAdminLogin=()=>{
    const navigate=useNavigate();
    const {setToken}=useContext(GlobalContext);
    const mobileRef=useRef(null);
    const otpRef=useRef(null);
    const [isInvalidUser,setIsInvalidUser]=useState(false);
    const [userCredential,setUserCredentials]=useState({ phoneNumber: "" });
    const [otp, setOtp] = useState({ phoneNumber: "", phoneOtp: "" });
    const loginRef=useRef(null);
    const showSpinnerRef=useRef(null);
    const [isMobileNumberCorrect,setIsMobileNumberCorrect]=useState(false);

    useEffect(()=>{
        otpRef.current.style.display="none";
    },[]);

   const handleChange=(e)=>{
        console.log(e.target.value);
        setUserCredentials(oldVal => {
            return { ...oldVal, [e.target.name]: e.target.value };
        });
    }
    const handleOTPState=(e)=>{
        setOtp(oldVal => {
            return { ...oldVal, [e.target.name]: e.target.value };
        });
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        showSpinnerRef.current.style.display="block";
        setIsInvalidUser(false);
        if (userCredential.phoneNumber === ""){   
            showSpinnerRef.current.style.display="none";
            setIsInvalidUser(true);
            return;
        }
        if(!isMobileNumberCorrect){
            console.log("insideHere");
            try{
                const mobileLogin = await fetch(`${process.env.REACT_APP_BasePath}admin/login`, {
                    mode: "cors",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ mobileNumber: userCredential.phoneNumber }),
                });
                const data = await mobileLogin.json();
                console.log(data);
                if(data.success===true){
                    showSpinnerRef.current.style.display="none";
                    mobileRef.current.style.display="none";
                    otpRef.current.style.display="block";
                    loginRef.current.innerHTML="Login";
                }else{
                    throw new Error("Mobile Number Not Valid");
                }
                setIsMobileNumberCorrect(true);
            }catch(err){
                console.log(err);
                showSpinnerRef.current.style.display="none";
                setIsInvalidUser(true);
            }
        }
        if(isMobileNumberCorrect){
            try{
                const mobileLogin = await fetch(`${process.env.REACT_APP_BasePath}admin/verifyOtp`, {
                    mode: "cors",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ mobileNumber: userCredential.phoneNumber, phoneOtp:otp.phoneOtp }),
                });
                const data = await mobileLogin.json();
                console.log(data);
                if (data.success) {
                    localStorage.setItem("token", JSON.stringify({
                        token: data.data.token.token,
                        type: data.data.type,
                        level: data.data.scope
                    }));
                    setToken(JSON.parse(localStorage.getItem("token")));
                    navigate("/superAdmin/approveHospital");
                }
                else {
                    throw new Error("Provide Valid OPT");
                }
            }catch(err){
                console.log(err);
                showSpinnerRef.current.style.display="none";
                setIsInvalidUser(true);
            }
        }
    }

    return <div className="login_form_container">
    <form className="login_form" onSubmit={handleSubmit}>
        <h2 className="hospitalLogin_heading">Super Admin Login</h2>
        <label ref={mobileRef}>Mobile Number:<br />
            <input type="text" onChange={(e) => { handleChange(e); }} name="phoneNumber" className={isInvalidUser ? "hospital_login_invalid_user" : null} value={userCredential.phoneNumber} />
        </label>
        <label ref={otpRef}>OTP:<br />
            <input type="number" onChange={handleOTPState} name="phoneOtp" className={isInvalidUser ? "hospital_login_invalid_user" : null} value={otp.phoneOtp} />
        </label>

        <div className={isInvalidUser ? "login_form_forgot_password login_form_invalid_user" : `login_form_forgot_password`}>
            {isInvalidUser && <span className="hospital_login_invalid_user_info">Invalid User!</span>}
        </div>
        <button type="submit" ref={loginRef}>Get OTP</button>
        <div className="loading_spinner" ref={showSpinnerRef}><ImSpinner5/></div>
    </form>
</div>
}
export default SuperAdminLogin;