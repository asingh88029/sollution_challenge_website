import { Link } from "react-router-dom";
import "./HospitalCard.css";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

const isHospitalOpen=()=>{
  const d = new Date();
  const h=d.getHours();
  const m=d.getMinutes()
  if(h<20 && h>8){
    return "Open";
  }
  return "Close";
}
function HospitalCard({
  id,
  hospitalName,
  addressLine1,
  city,
  mobileNumber,
  hospitalType,
  image,
  hcoords,
  ucoords,
  distance,
}) {
  return (
    <div className="hospital_card_container">
      <div className="hospital_img">
        <div className="hospital_type">{hospitalType.join(", ")}</div>
        <img src={image} width="100%" alt={"asdflk"} />
      </div>
      <div className="hospital_card_desc">
        <div className="hospital_card_name">
          <span>{hospitalName}</span>
        </div>
        <div className="hospital_card_location">
          <span>{addressLine1}</span>
        </div>
        <div className="hospital_card_location">
          <span>{city}</span>
        </div>
        <div className="hospital_card_status_wrapper">
          <span className="hospital_card_status">{isHospitalOpen()}</span>
          <a href={`tel:${mobileNumber}`} className="hospital_card_icon">
            <FaPhoneAlt />
          </a>
        </div>
        <div className="hospital_card_distance_wrapper">
          <div>
            <span className="hospital_card_distance">
              {distance} Km From Here
            </span>
          </div>
          <Link
            to={`/map?hlat=${hcoords.lat}&hlng=${hcoords.lng}&lat=${ucoords.lat}&lng=${ucoords.lng}&id=${id}`}
            className="hospital_card_icon"
          >
            <IoLocationSharp />
          </Link>
        </div>
        <div className="hospital_card_btn">
          <Link to={`/hospital?id=${id}`}>
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HospitalCard;
