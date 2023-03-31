import "./DoctorPage.css";
import { useState, useEffect,useContext } from "react";
import {GlobalContext} from "../../App";
function DoctorPage() {
    const {token}=useContext(GlobalContext);
    const [doctorID,setDoctorID]=useState("");
    const [hospitalID,setHospitalID]=useState("");
    const [requiredData,setRequiredData]=useState([]);
    useEffect(()=>{
        console.log(token);
    },[token]);
    const [booking, setBooking] = useState([]);
    useEffect(() => {
        if(!token) return;
        (async () => {
            const res = await fetch(`${process.env.REACT_APP_BasePath}hospital/doctor/showme`, {
                mode: "cors",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token.type} ${token.token}` 
                }
            });
            const data = await res.json();
            console.log(data);
            setHospitalID(data.association.hospital);
            setDoctorID(data._id);
        })();
    }, [token]);
    useEffect(()=>{
        if(!doctorID || !hospitalID) return;
        (async()=>{
            // const URL=;
            // console.log(URL);
            const res=await fetch(`${process.env.REACT_APP_BasePath}hospital/getSlot/doctor/${hospitalID}/${doctorID}`,{
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body:JSON.stringify({"date" : "25-08-2022"})
            });
            const data=await res.json();
            console.log(data);
            data.reservation[0].slots.map(item=>{
                if(item.status=== "booked"){
                    setRequiredData(old=>{
                        return [...old,item];
                    })
                }
            })
            console.log(requiredData);
        })();
        
    },[doctorID,hospitalID]);
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>Patient Name</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {requiredData.map((item,index)=>{
                        return <tr>
                            <td>{index+1}</td>
                            <td></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default DoctorPage;
