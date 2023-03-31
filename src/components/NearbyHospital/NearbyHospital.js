import "./NearbyHospital.css";
import { useState, useRef } from "react";
import { IoClose } from 'react-icons/io5';
import { MdOutlineGpsFixed } from 'react-icons/md';

import Autocomplete from "react-google-autocomplete";


const APIKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const getCurrentLocation = (setLocation,setCoord) => {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async({ coords }) => {
            // console.log(coords.latitude, coords.longitude);
            const res=await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${APIKey}`);
            const data=await res.json();
            // console.log(data);
            // console.log(data.results[0].address_components[1].short_name);

            setLocation(data.results[0].address_components[1].short_name);
            setCoord.setLat(coords.latitude);
            setCoord.setLng(coords.longitude);
        }, (error) => {
            alert("Allow Location access to get Current Location");
        })
    }
    else {
        alert("GPS is not supported on your browser or by device");
    }
}

const handleSetLocation = (setLocation,newLocation,setCoord,newCoords) => {
    setLocation(newLocation);
    setCoord.setLat(newCoords.lat);
    setCoord.setLng(newCoords.lng);

}
const NearbyHospital = ({ setShowNearbyHospitalMenu, setLocation, setCoord}) => {
    const [newLocation,setNewLocation]=useState("");
    const [newCoords,setNewCoords]=useState({});
    const NearbyHospitalCardRef = useRef(null);
    return (
            <div className="nearby_hospital_card" ref={NearbyHospitalCardRef}>
                <button className="close_dilogue" onClick={() => setShowNearbyHospitalMenu(false)}><IoClose /></button>
                <h2>Search for Nearby Hospital</h2>
                <form>
                    <Autocomplete apiKey={APIKey} onPlaceSelected={async (place) => {
                        setNewLocation(place.address_components[0].short_name);
                        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${place.formatted_address}&key=${APIKey}`);
                        const data = await res.json();
                        setNewCoords({lat:data.results[0].geometry.location.lat,lng:data.results[0].geometry.location.lng});
                    }}
                    />
                    <button onClick={(e)=>{
                        e.preventDefault();
                        handleSetLocation(setLocation,newLocation,setCoord,newCoords);
                        setShowNearbyHospitalMenu(false);
                        }}>Set Location</button>
                </form>
                <hr />
                <div className="get_current_location_using_gps_container">
                    <button className="get_current_location_using_gps" onClick={async()=>{
                        await getCurrentLocation(setLocation,setCoord);
                        setShowNearbyHospitalMenu(false);
                        }}>
                        <span><MdOutlineGpsFixed /></span>
                        <span>Get Current Location Using GPS</span>
                    </button>
                </div>
            </div>
    );
}
export default NearbyHospital;