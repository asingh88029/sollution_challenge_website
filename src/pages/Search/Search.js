import "./Search.css";
import {useSearchParams} from "react-router-dom";
import {useState,useEffect, useContext,useRef} from "react";
import {ImSpinner5} from "react-icons/im";
import { GlobalContext } from "../../App";
import NearbyHospitalContainer from "../../components/NearbyHospitalContainer/NearbyHospitalCardContainer";
const Search=()=>{
    const showSpinnerRef=useRef(null);
    const {lat,lng,setNearbyHospital}=useContext(GlobalContext);
    console.log(`lat:${lat}, lng:${lng}`);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isSearching,setIsSearching]=useState(false);
    console.log(searchParams.get("query"));
    // useEffect(()=>{
    //     setSearchParams(searchParams.get("query"));
    // });
    useEffect(()=>{
      showSpinnerRef.current.style.display="block";
        if(!lat || !lng)
        {
          showSpinnerRef.current.style.display="none";
            return;
        }
        (async()=>{
            setIsSearching(true);
            const res = await fetch(`${process.env.REACT_APP_BasePath}hospital/getNearbyHospitalsWithFilter`, {
                mode: "cors",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  latitude: lat,
                  longitude: lng,
                  radius: 5000,
                  mode: "D",
                  query:searchParams.get("query").toLowerCase()
                }),
              });
              const data = await res.json();
              console.log(data);
              setNearbyHospital(data);
              showSpinnerRef.current.style.display="none";
        })();
        // showSpinnerRef.current.style.display="none";
    },[searchParams,lat,lng ]);
    return <>
      <NearbyHospitalContainer/>
      <div className="spinner_box" ref={showSpinnerRef}>
        <ImSpinner5/>
      </div>
      </>
}
export default Search;