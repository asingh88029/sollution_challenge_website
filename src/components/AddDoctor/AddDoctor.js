import "./AddDoctor.css";
import {useState,useEffect, useContext,useRef} from "react";
import { GlobalContext } from "../../App";
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

const AddDoctor=()=>{
    const {token}=useContext(GlobalContext);
    const [doctorsData,setDoctorsData]=useState({name: "",mobileNumber:"",department:""} );
    const [departmentList,setDepartmentList]=useState([]);
    const [isValidName,setIsValidName]=useState(true);
    const [isValidMobile,setIsValidMobile]=useState(true);
    const [isValidDepartment,setIsValidDepartment]=useState(true);
    const [serverMsg,setServerMsg]=useState("");
    const [isServerError,setIsServerError]=useState(false);
    const serverErrorRef=useRef(null);
    const serverSuccessRef=useRef(null);
    useEffect(()=>{
        (async()=>{
            try{
                const res= await fetch(`${process.env.REACT_APP_BasePath}department`);
                const data= await res.json();
                setDepartmentList(data.department);
            }catch(err){
                alert(err.msg);
            }
           

        })();
        serverErrorRef.current.style.display="none";
        serverSuccessRef.current.style.display="none";
    },[]);
    const handleChange=(e)=>{
        setDoctorsData(old=>{
            return {...old, [e.target.name]:e.target.value};
        });
    }
    const addDoctor=async()=>{
        console.log(doctorsData);
        setIsValidName(true);
        setIsValidMobile(true);
        setIsValidDepartment(true);
        if(doctorsData.name==="" ){
            setIsValidName(false);
            console.log("error Name");
            return;
        }
        if(doctorsData.mobileNumber===""){
            setIsValidMobile(false);
            console.log("error Mobile");
            return;
        }
        if(doctorsData.department===""){
            setIsValidDepartment(false);
            console.log("error department");
            return;
        }
        try{
            const res=await fetch(`${process.env.REACT_APP_BasePath}hospital/addDoctor`,{
                mode: "cors",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `${token.type} ${token.token}`
                },
                body: JSON.stringify(doctorsData)
              });
            const data=await res.json();
            console.log(data);
            if(!data.success){
                setServerMsg(data.message);
                serverErrorRef.current.style.display="flex";
                return;
            }
            console.log(data.success);
            if(data.success){
                setIsServerError(false);
                serverSuccessRef.current.style.display="flex";
                serverErrorRef.current.display=false;
                setServerMsg("Doctor Added Successfully");
            }
           
        }catch(err){
            serverErrorRef.current.style.disabled="flex";
            console.log(err);
            setServerMsg("Somthing Went Wrong!");
            setIsValidName(false);
            setIsValidMobile(false);
        }
        
    }
    return (
        <div className="hospital_dashboard">
            <section className="hospital_details">
                <div className="hospital_basic_details_wrapper">
                    <div className="hospital_basic_details_inner_wrapper">
                        <div className="hospital_basic_details">
                            <h1>Add Doctor:</h1>
                            <label>Doctor's Name:<input type="text" className={isValidName?null:"hospital_login_invalid_user"} autoComplete="off" onChange={handleChange} name="name" value={doctorsData.name} /></label>
                            <label>Doctor's Mobile Number:<input type="number" className={isValidMobile?null:"hospital_login_invalid_user"} autoComplete="off" onChange={handleChange} name="mobileNumber" value={doctorsData.mobileNumber} /></label>
                            <label>Doctor's Mobile Number:  
                                <select className={isValidDepartment?`add_doctor_doctor_department_list`:`add_doctor_doctor_department_list hospital_login_invalid_user`} name="department" onChange={handleChange} value={doctorsData.department}>
                                    <option value="" disabled>Select Department</option>
                                    {departmentList.map((item,index)=>{
                                        return <option value={item} key={index}>{item}</option>
                                    })}
                                </select>
                            </label>
                            <button className="update_hospital_details_btn" onClick={addDoctor}>Add Doctor</button>
                            <span className="add_doctor_server_success_message" ref={serverSuccessRef}><FaCheck/>{serverMsg}</span>
                            <span className="add_doctor_server_error_message" ref={serverErrorRef}><ImCross/>Doctor not Added! {serverMsg}</span>
                        </div>
                    </div>
                    
                </div>
            </section>

        </div>
    );
}
export default AddDoctor;   