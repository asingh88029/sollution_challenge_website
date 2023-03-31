import HospitalCard from '../HospitalCard/HospitalCard';
import HospitalCardSkeleton from '../HospitalCard/HospitalCardSkeleton';
import "./NearbyHospitalCardContainer.css";
import { FaFilter } from 'react-icons/fa';
import { GlobalContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
const NearbyHospitalContainer = () => {
    const { nearbyHospital, setNearbyHospital, lat, lng } = useContext(GlobalContext);
    const [copyOfNearbyHospital, setCopyOfNearbyHospital] = useState([]);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    useEffect(() => {
        if (!isFilterApplied && JSON.stringify(nearbyHospital) !== JSON.stringify({})) {
            setCopyOfNearbyHospital(() => {
                return [...nearbyHospital];
            })
        }
        // filterHospital();
    }, [nearbyHospital]);
    useEffect(()=>{
        setIsFilterApplied(false);
    },[lat,lng]);
    // console.log(nearbyHospital);
    const filterHospital = (e) => {
        setIsFilterApplied(true);
        setNearbyHospital(old => {
            let tempArray = [];
            console.log(copyOfNearbyHospital);
            copyOfNearbyHospital.forEach(item => {
                item.details.hospitalType.forEach(hospitalType => {
                    if (hospitalType === e.target.value) {
                        tempArray.push(item);
                    }
                });
            });
            if(e.target.value === "View All"){
                tempArray=[...copyOfNearbyHospital];
            }
            // console.log(tempArray);
            return [...tempArray];
        });
    }

    // const filterHospital=()=>{}
    return (
        <>
            <div className="filter_hospital_card">
                <FaFilter />
                <select onChange={filterHospital}>
                    <option>View All</option>
                    {/* <option value={`Ayurveda` || `Ayurvedic`}>Ayurvedic</option> */}
                    <option>Neurological</option>
                    <option>Cardiovascular</option>
                    <option>Gastrointestinal</option>
                    <option>Orthopedic</option>
                    <option>Pulmonary</option>
                    <option>Gastrointestinal</option>
                </select>
            </div>
            <div className='nearby_hospital_card_container'>
                <div className='nearby_hospital_card_container_inner_wrapper'>
                    {JSON.stringify(nearbyHospital) !== JSON.stringify({}) ? nearbyHospital?.map((item, index) => {
                        // console.log(item);
                        return <HospitalCard key={index}
                            hospitalName={item.details.hospitalName}
                            addressLine1={item.details.contactInfo.address.addressLine1}
                            city={item.details.contactInfo.address.city}
                            mobileNumber={item.details.phoneNumber}
                            hospitalType={item.details.hospitalType}
                            image={item.details.images[0]}
                            id={item.details._id}
                            hcoords={{ lat: item.location.latitude, lng: item.location.longitude }}
                            ucoords={{ lat, lng }}
                            distance={(item.location.distance / 1000).toFixed(2)}
                        />
                    }) : <HospitalCardSkeleton count={4} />}
                    {(Array.isArray(nearbyHospital) && nearbyHospital.length === 0) ? <h1>No Hospital found Nearby! Try Changing Location</h1> : null}
                </div>
            </div>
        </>
    )
}
export default NearbyHospitalContainer;