import "./ApproveHospital.css";
import { useState, useEffect,useContext } from "react";
import { GlobalContext } from "../../App";
const ApproveHospital = () => {
    const {token}=useContext(GlobalContext);
    const [hospitalList, setHospitalList] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BasePath}hospital/unverifiedHospitals/`);
                const data = await res.json();
                // console.log(data);
                setHospitalList(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);
    const approveHospital=(id)=>{
        if(!token) return;
        (async()=>{
            const res=await fetch(`${process.env.REACT_APP_BasePath}admin/verifyHospital`,{
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `${token.type} ${token.token}`
                },
                body:JSON.stringify({hospitalId:id})
            });
            const data=await res.json();
            console.log(data);
            if(data.success){
                alert("Hospital Verified Successfully!");
                window.location.reload();
            }

        })();
       
    }
    return <>
        <div className="superAdmin">
            <div className="approveHospitalTable">
                <h1>Super Admin Panel</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Hospital Name</th>
                            <th></th>
                            <th>Approve Hospital</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hospitalList.map((item,index) => {
                            return <tr key={index}>
                                <th style={{textTransform:"capitalize"}}>{item.hospitalName}</th>
                                <td><a href={`/hospital?id=${item._id}`} target="_blank">View Details</a></td>
                                <td><button onClick={()=>{approveHospital(item._id)}}>Approve Hospital</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}
export default ApproveHospital;