import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Drawer, Typography, IconButton } from "@mui/material";
import { useRef, useState, useEffect, useContext } from "react";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import "../components/HospitalCard/HospitalCard.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { GlobalContext } from "../App";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  DirectionsRenderer,
  MarkerClusterer,
  InfoWindowF,
} from "@react-google-maps/api";

import { Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const center = { lat: 24.95475, lng: 84.01758 };
const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [hospitalData, setHospitalData] = useState({});

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [result, setresult] = useState([]);

  const [distance1, setDistance1] = useState("");
  const [duration1, setDuration1] = useState("");
  const [result1, setresult1] = useState(0);

  const [distance2, setDistance2] = useState("");
  const [duration2, setDuration2] = useState("");
  const [result2, setresult2] = useState(0);

  const [IsDrawerOpen, setIsDrawerOpen] = useState(true);
  const [searchParams] = useSearchParams();
  const hlat = parseFloat(searchParams.get("hlat"));
  const hlng = parseFloat(searchParams.get("hlng"));
  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));

  const id = searchParams.get("id");

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  // const { hh: lat, hhh: lng } = useContext(GlobalContext);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BasePath}hospital/details/${id}`
      );
      const data = await res.json();
      setHospitalData(data);
    })();
  }, []);
  console.log(hospitalData);

  useEffect(() => {
    const getnearbyHospital = async () => {
      const detailURL = `${process.env.REACT_APP_BasePath}hospital/getNearbyHospitals`;

      const res = await fetch(detailURL, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          radius: 500,
          mode: "D",
        }),
      });
      const data = await res.json();
      console.log(data[0].location.longitude, data[0].location.latitude);
      console.log(data);
      // setData(data);
      return await data;
    };
    getnearbyHospital()
      .then(function (result) {
        console.log(result);
        setresult(result);
        return result;
      })
      .catch((e) => {
        console.log("Route Not Available");
      });
  }, []);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <h1>Loadingggggg</h1>;
  }
  async function calculateRouteByRoad() {
    // if (originRef.current.value === "" || destiantionRef.current.value === "") {
    //   return;
    // }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      //   origin: originRef.current.value,
      //   destination: destiantionRef.current.value,
      // origin: { lat: 24.95475, lng: 84.017578 },
      // destination: { lat: 25.594095, lng: 85.137566 },
      origin: { lat: lat, lng: lng },
      destination: { lat: hlat, lng: hlng },
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  async function calculateRouteByTrain() {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: { lat: lat, lng: lng },
      destination: { lat: hlat, lng: hlng },
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.TRANSIT,
    });
    setDirectionsResponse(results);
    setDistance1(results.routes[0].legs[0].distance.text);
    setDuration1(results.routes[0].legs[0].duration.text);
  }

  async function calculateRouteByWalk() {
    // if (originRef.current.value === "" || destiantionRef.current.value === "") {
    //   return;
    // }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      //   origin: originRef.current.value,
      //   destination: destiantionRef.current.value,
      // origin: { lat: 24.95475, lng: 84.017578 },
      // destination: { lat: 25.594095, lng: 85.137566 },
      origin: { lat: lat, lng: lng },
      destination: { lat: hlat, lng: hlng },
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING,
    });
    setDirectionsResponse(results);
    setDistance2(results.routes[0].legs[0].distance.text);
    setDuration2(results.routes[0].legs[0].duration.text);
  }

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
        onClick={() => setIsDrawerOpen(true)}
      >
        <Typography sx={{ marginLeft: "2rem", marginTop: "4rem" }}>
          MAP DETAILS
        </Typography>
        <ArrowForwardIosIcon sx={{ marginTop: "4rem" }} />
      </IconButton>

      <Drawer
        anchor="left"
        open={IsDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        PaperProps={{
          sx: {
            width: "80%",
            "@media (min-width: 780px)": {
              width: "30%",
            },
            marginTop: "7rem",
          },
        }}
        BackdropProps={{ invisible: true }}
      >
        {hospitalData.contactInfo && (
          <Card sx={{ maxWidth: 345, marginTop: "2rem", marginLeft: "2rem" }}>
            <CardMedia
              component="img"
              height="140"
              image={hospitalData.images[0]}
              alt="Hospital Img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {hospitalData.hospitalName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {hospitalData.contactInfo.address.addressLine1},
                {hospitalData.contactInfo.address.street},
                {hospitalData.contactInfo.address.city},
                {hospitalData.contactInfo.address.state},
                {hospitalData.phoneNumber}
              </Typography>
            </CardContent>
          </Card>
        )}

        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            margin: "2rem",
          }}
        >
          <nav aria-label="main mailbox folders">
            <List>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DirectionsCarFilledIcon />
                  </ListItemIcon>
                  <ListItemText primary={distance} />
                  <ListItemText primary={duration} />
                  <Button
                    variant="text"
                    disableElevation
                    onLoad={calculateRouteByRoad()}
                  >
                    ROAD
                  </Button>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TrainIcon />
                  </ListItemIcon>
                  <ListItemText primary={distance1} />
                  <ListItemText primary={duration1} />
                  <Button
                    variant="text"
                    disableElevation
                    onLoad={calculateRouteByTrain()}
                  >
                    Train
                  </Button>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DirectionsWalkIcon />
                  </ListItemIcon>
                  <ListItemText primary={distance2} />
                  <ListItemText primary={duration2} />
                  <Button
                    variant="text"
                    disableElevation
                    onLoad={calculateRouteByWalk()}
                  >
                    WALK
                  </Button>
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
        </Box>
      </Drawer>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <GoogleMap
          center={center}
          zoom={5}
          mapContainerStyle={{
            width: "100%",
            height: "90vh",
          }}
          options={{
            fullscreenControl: false,
          }}
        >
          <MarkerF
            icon={
              "https://cdn-icons.flaticon.com/png/512/2895/premium/2895071.png?token=exp=1660914780~hmac=16277f57fc90d47534206fb3bdfbd7bd"
            }
            position={origin}
            draggable={true}
          />
          {result && (
            <MarkerClusterer>
              {(clusterer) =>
                result.map((res) => (
                  <MarkerF
                    position={{
                      lat: res.location.latitude,
                      lng: res.location.longitude,
                    }}
                    // clusterer={clusterer}
                    key={res.details._id}
                    icon={{
                      url: require("../assets/image/dest2.png"),
                    }}
                    //   icon={<LocationOnIcon />}
                    onClick={() => handleActiveMarker(res.details._id)}
                  >
                    {activeMarker === res.details._id ? (
                      <InfoWindowF
                        position={{
                          lat: res.location.latitude,
                          lng: res.location.longitude,
                        }}
                        onCloseClick={() => {
                          setActiveMarker(null);
                        }}
                      >
                        <div className="hospital_card_container">
                          <div className="hospital_img">
                            <div className="hospital_type">
                              {res.details.hospitalType.join(", ")}
                            </div>
                            <img
                              src={res.details.images[0]}
                              width="100%"
                              alt={"asdflk"}
                            />
                          </div>
                          <div className="hospital_card_desc">
                            <div className="hospital_card_name">
                              <span>{res.details.hospitalName}</span>
                            </div>
                            <div className="hospital_card_location">
                              <span>
                                {res.details.contactInfo.address.addressLine1}
                              </span>
                            </div>
                            <div className="hospital_card_location">
                              <span>
                                {res.details.contactInfo.address.city}
                              </span>
                            </div>
                            <div className="hospital_card_status_wrapper">
                              <span className="hospital_card_status">
                                CLOSED
                              </span>
                              <a
                                href={`tel:${res.details.contactInfo.mobileNumber}`}
                                className="hospital_card_icon"
                              >
                                <FaPhoneAlt />
                              </a>
                            </div>
                            <div className="hospital_card_distance_wrapper">
                              <div>
                                <span className="hospital_card_distance">
                                  {(res.location.distance / 1000).toFixed(2)} Km
                                  From Here
                                </span>
                              </div>
                              <Link
                                to={`/map?hlat=${res.location.latitude}&hlng=${res.location.longitude}&lat=${lat}&lng=${lng}&id=${id}`}
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
                      </InfoWindowF>
                    ) : null}
                  </MarkerF>
                ))
              }
            </MarkerClusterer>
          )}
          console.log(result)
          {directionsResponse && (
            <DirectionsRenderer
              directions={directionsResponse}
              options={{ suppressMarkers: true }}
            />
          )}
          <MarkerF
            scale={0.1}
            icon={{
              url: require("../assets/image/origin1.png"),
            }}
            // icon={<LocationOnIcon />}
            position={{ lat: lat, lng: lng }}
          />
          <MarkerF
            //     icon={{ url: require("../assets/image/dest2.png") }}
            icon={<LocationOnIcon sx={{ zIndex: 9999 }} />}
            position={{ lat: hlat, lng: hlng }}
          />
        </GoogleMap>
      </Box>
    </div>
  );
};

export default Map;
