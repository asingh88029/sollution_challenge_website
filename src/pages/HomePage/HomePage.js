import "./HomePage.css";
import Carousel from "../../components/Carousel/Carousel";
import NearbyHospitalContainer from "../../components/NearbyHospitalContainer/NearbyHospitalCardContainer";

const HomePage = () => {
   
    return (
        <>
           <h1 className="nearby_Hospital_heading">Nearby Hospitals:</h1>
            <NearbyHospitalContainer />

        </>
    )
}
export default HomePage;