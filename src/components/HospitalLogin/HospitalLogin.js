import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import {ImSpinner5} from "react-icons/im";
import "./HospitalLogin.css";
const HospitalAdminLogin = () => {
    const { setToken } = useContext(GlobalContext);
    const navigate = useNavigate();
    const otpRef = useRef(null);
    const mobileRef = useRef(null);
    const loginRef = useRef(null);
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            navigate("/");
        }
        otpRef.current.style.display = "none";
        selectRoleRef.current.style.display = "none";
    }, []);
    const [userCredential, setUserCredentials] = useState({ phoneNumber: "" });
    const [otp, setOtp] = useState({ phoneNumber: "", phoneOtp: "" });
    const [isInvalidUser, setIsInvalidUser] = useState(false);
    const [isOTPBoxVisible, setIsOTPBoxVisible] = useState(false);
    const [changeroles, setChangeroles] = useState(false);             //for display select box
    const [userRoles, setUserRoles] = useState([]);                    //for storing all roles
    const [currentRole, setCurrentRole] = useState("");                //for stoting current role of user
    const selectRoleRef = useRef(null);
    const showSpinnerRef=useRef(null);
    useEffect(() => { console.log(changeroles, userRoles) }, [changeroles, userRoles])
    useEffect(() => {
        if (isOTPBoxVisible) {
            otpRef.current.style.display = "block";
            return;
        }
        otpRef.current.style.display = "none";
    }, [isOTPBoxVisible]);
    const handleChange = (e) => {
        setUserCredentials(oldVal => {
            return { ...oldVal, [e.target.name]: e.target.value };
        });
    }
    const handleOTPState = (e) => {
        setOtp(oldVal => {
            return { ...oldVal, [e.target.name]: e.target.value };
        });
    }
    const changeRolefun = (e) => {
        setCurrentRole(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        showSpinnerRef.current.style.display="block";
        setIsInvalidUser(false);
        if (userCredential.phoneNumber === "" || otp.phoneNumber === ""){   
            showSpinnerRef.current.style.display="none";
            setIsInvalidUser(true);
            return;
        }
        try {
            if (!changeroles) {
                const checkUserAcc = await fetch(`${process.env.REACT_APP_BasePath}auth/checkRoles`, {
                    mode: "cors",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ mobileNumber: userCredential.phoneNumber }),
                });
                const resCheckUserAcc = await checkUserAcc.json();
                if (resCheckUserAcc.success === true) {
                    setCurrentRole(resCheckUserAcc.roles[0]);
                }
                if ((resCheckUserAcc.roles).length > 0) {
                    setUserRoles(resCheckUserAcc.roles);
                    setChangeroles(true);
                }
                if (setChangeroles) {
                    selectRoleRef.current.style.display = "block";
                }
            }
            if (!isOTPBoxVisible && changeroles) {
                if(currentRole==="hospital"){
                    const res = await fetch(`${process.env.REACT_APP_BasePath}hospital/login`, {
                        mode: "cors",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userCredential),
                    });
                    const data = await res.json();
                    if (data.success) {
                        setIsOTPBoxVisible(true);
                        mobileRef.current.style.display = "none";
                        loginRef.current.innerHTML = "Login";
                    }
                    else {
                        setIsInvalidUser(true);
                    }
                }
                else if(currentRole==="user"){
                    // console.log(userCredential);
                    const res = await fetch(`${process.env.REACT_APP_BasePath}user/login`, {
                        mode: "cors",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({mobileNumber:userCredential.phoneNumber}),
                    });
                    const data = await res.json();
                    if (data.success) {
                        setIsOTPBoxVisible(true);
                        mobileRef.current.style.display = "none";
                        loginRef.current.innerHTML = "Login";
                    }
                    else {
                        setIsInvalidUser(true);
                    }
                    console.log(userCredential)
                }
                else if(currentRole==="doctor"){
                    const res = await fetch(`${process.env.REACT_APP_BasePath}hospital/doctor/login`, {
                        mode: "cors",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({mobileNumber:userCredential.phoneNumber}),
                    });
                    const data = await res.json();
                    if (data.success) {
                        setIsOTPBoxVisible(true);
                        mobileRef.current.style.display = "none";
                        loginRef.current.innerHTML = "Login";
                    }
                    else {
                        setIsInvalidUser(true);
                    }
                    console.log(userCredential)
                }
                else if(currentRole==="government"){

                }
                else{
                    console.log(`Inside Else: ${userRoles}`);
                }

                
            }
            if (isOTPBoxVisible) {
                if (currentRole === "hospital") {
                    const res = await fetch(`${process.env.REACT_APP_BasePath}hospital/verifyOtp`, {
                        mode: "cors",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(otp),
                    });
                    const data = await res.json();
                    if (data.success) {
                        localStorage.setItem("token", JSON.stringify({
                            token: data.data.token.token,
                            type: data.data.type,
                            level: data.data.scope,
                            hospitalDetails: data.hospital
                        }));
                        setToken(JSON.parse(localStorage.getItem("token")));
                        navigate("/hospital/dashboard");
                    }
                    else {
                        throw new Error("Provide Valid OPT");
                    }
                }
                else if(currentRole==="user"){
                    console.log(otp);
                    const res = await fetch(`${process.env.REACT_APP_BasePath}user/verifyOtp`, {
                        mode: "cors",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({mobileNumber:otp.phoneNumber,phoneOtp:otp.phoneOtp}),
                    });
                    const data = await res.json();
                    if (data.success) {
                        const fetchUser = await fetch(`${process.env.REACT_APP_BasePath}user/showMe`,{
                            headers:{
                                "Authorization":`${data.data.type} ${data.data.token.token}`
                            }
                        });
                        const resUser=await fetchUser.json();
                        localStorage.setItem("token", JSON.stringify({
                            token: data.data.token.token,
                            type: data.data.type,
                            level: data.data.scope,
                            user: {
                                _id:resUser._id,
                                name:resUser.name
                            }


                        }));
                        setToken(JSON.parse(localStorage.getItem("token")));
                        navigate("/");
                    }
                    else {
                        throw new Error("Provide Valid OPT");
                    }
                }
                else if(currentRole==="doctor"){
                    console.log(otp);
                    const res = await fetch(`${process.env.REACT_APP_BasePath}hospital/doctor/login/verifyOTP`, {
                        mode: "cors",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({mobileNumber:otp.phoneNumber,phoneOtp:otp.phoneOtp}),
                    });
                    const data = await res.json();
                    if (data.success) {
                        // const fetchUser = await fetch(`${process.env.REACT_APP_BasePath}user/showMe`,{
                        //     headers:{
                        //         "Authorization":`${data.data.type} ${data.data.token.token}`
                        //     }
                        // });
                        // const resUser=await fetchUser.json();
                        localStorage.setItem("token", JSON.stringify({
                            token: data.data.token.token,
                            type: data.data.type,
                            level: data.data.scope,
                            doctor: {
                                name:"Ayush"
                            }


                        }));
                        setToken(JSON.parse(localStorage.getItem("token")));
                        navigate("/");
                    }
                    else {
                        throw new Error("Provide Valid OPT");
                    }
                }

            }
            showSpinnerRef.current.style.display="none";
        }
        catch (err) {
            showSpinnerRef.current.style.display="none";
            console.log(err);
            setIsInvalidUser(true);
        }

    }


    return <div className="login_form_container">
        <form className="login_form" onSubmit={handleSubmit}>
            <h1 className="hospitalLogin_heading">Login</h1>
            <label ref={mobileRef}>Mobile Number:<br />
                <input type="text" onChange={(e) => { handleChange(e); handleOTPState(e); }} name="phoneNumber" className={isInvalidUser ? "hospital_login_invalid_user" : null} value={userCredential.phoneNumber} />
            </label>
            <label ref={selectRoleRef}>Select Role:<br />
                <select style={{ textTransform: "capitalize" }} className="hospital_login_select_user_roles" onChange={changeRolefun}>
                    {userRoles.map((item, index) => {
                        return <option value={item} key={index}>{item}</option>
                    })}
                </select>
            </label>
            <label ref={otpRef}>OTP:<br />
                <input type="number" onChange={handleOTPState} name="phoneOtp" className={isInvalidUser ? "hospital_login_invalid_user" : null} value={otp.phoneOtp} />
            </label>

            <div className={isInvalidUser ? "login_form_forgot_password login_form_invalid_user" : `login_form_forgot_password`}>
                {isInvalidUser && <span className="hospital_login_invalid_user_info">Invalid User!</span>}
            </div>
            <button type="submit" ref={loginRef}>Login</button>
            <div className="loading_spinner" ref={showSpinnerRef}><ImSpinner5/></div>
            <div className="hospital_form_login_general_user_link">Dont have Account? <Link to={`/newUser`} style={{textDecoration:"underline"}}>Create Here!</Link></div>
        </form>
    </div>
}
export default HospitalAdminLogin;