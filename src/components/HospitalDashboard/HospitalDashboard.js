import "./HospitalDashboard.css";
import { FaPlusCircle } from "react-icons/fa";
import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import { ImSpinner2 } from "react-icons/im";
const HospitalDashboard = () => {
  const navigate = useNavigate();
  const { token } = useContext(GlobalContext);
//   console.log(token);
  // useEffect(()=>{
  //     if(token.level!=="hospital"){
  //         navigate("/");
  //         return;
  //     }
  // });
  const uploadImgRef = useRef(null);
  const getCurrentLocationBtnRef = useRef(null);
  // const latitudeInputRef = useRef(null);
  // const longitudeInputRef = useRef(null);
  const [uploadImgs, setUploadImgs] = useState([]);
  const [formData, setFormData] = useState({
    hospitalName: "",
    // mobileNumber: "",
    email: "",
    addressLine1: "",
    streetAddress: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    // latitude: "",
    // longitude: "",
    hospitalType: [],
  });
  const [formData2, setFormData2] = useState({
    numberOfDoctors: "",
    numberOfPatients: "",
    numberOfActivePatients: "",
    totalBeds: "",
    occupiedBeds: "",
    website: "",
  });
  useEffect(() => {
    if (!navigator.geolocation) {
      getCurrentLocationBtnRef.current.setAttribute("disabled", "true");
      getCurrentLocationBtnRef.current.setAttribute("isDisabled", "true");
    }
    
  }, []);
  useEffect(()=>{
    if(!token) return;
    (async()=>{
        try{
        const res=await fetch(`${process.env.REACT_APP_BasePath}hospital/showMe`,{
            method:"GET",
            headers:{
                "Authorization":`${token.type} ${token.token}`,
                "Content-Type": "application/json"
            }
        });
        const data=await res.json();
        console.log(data);

        const dataToPopulate={
            hospitalName: data.hospitalName,
            // mobileNumber: "",
            email: data.email,
            addressLine1: data?.contactInfo?.address?.addressLine1,
            streetAddress: data?.contactInfo?.address?.street,
            city: data?.contactInfo?.address?.city,
            pincode: data?.contactInfo?.address?.pincode,
            state: data?.contactInfo?.address?.state,
            country: data?.contactInfo?.address?.country,
            hospitalType: data?.hospitalType,
        }
        setFormData(dataToPopulate);
        }catch(err){
            console.log(err);
        }

        try{
            const res=await fetch(`${process.env.REACT_APP_BasePath}hospital/showMe`,{
                method:"GET",
                headers:{
                    "Authorization":`${token.type} ${token.token}`,
                    "Content-Type": "application/json"
                }
            });
            const data=await res.json();
            console.log(data);
    
            const dataToPopulate={
                hospitalName: data.hospitalName,
                // mobileNumber: "",
                email: data.email,
                addressLine1: data?.contactInfo?.address?.addressLine1,
                streetAddress: data?.contactInfo?.address?.street,
                city: data?.contactInfo?.address?.city,
                pincode: data?.contactInfo?.address?.pincode,
                state: data?.contactInfo?.address?.state,
                country: data?.contactInfo?.address?.country,
                hospitalType: data?.hospitalType,
            }
            setFormData(dataToPopulate);
            }catch(err){
                console.log(err);
            }


    })();
  },[token]);
  const loadImg = async (e) => {
    console.log(e);

    const files = e.target.files;
    setUploadImgs((old) => {
      return [...old, ...files];
    });
    console.log(files.length);

    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.onload = function (e) {
        // console.log(e.target.result);
        const img = document.createElement("img");
        img.src = e.target.result;
        uploadImgRef.current.append(img);
      };
      reader.readAsDataURL(e.target.files[i]);
    }
  };
  const updateHospitalDetails = async () => {
    console.log(token);
    console.log(formData);

    const updateHospitalDetailsData = {
      hospitalName: formData.hospitalName,
      hospitalType: formData.hospitalType,
      email: formData.email,
      password: "krishnaHospital",
      contactInfo: {
        // mobileNumber: [formData.mobileNumber],
        address: {
          addressLine1: formData.addressLine1,
          street: formData.streetAddress,
          city: formData.city,
          pincode: formData.pincode,
          state: formData.state,
          country: formData.country,
        },
      },
      // coordinates: {
      //     latitude: formData.latitude,
      //     longitude: formData.longitude
      // }
    };

    console.log(updateHospitalDetailsData);
    let response = await fetch(
      `${process.env.REACT_APP_BasePath}hospital/updateDetails/`,
      {
        method: "PATCH",
        body: JSON.stringify(updateHospitalDetailsData),
        headers: {
          Accept: "*/*",
          Authorization: `${token.type} ${token.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // let data = await response.json();
    // console.log(data);

    try {
      let response2 = await fetch(
        `${process.env.REACT_APP_BasePath}hospital/updateAssets`,
        {
          method: "PATCH",
          body: JSON.stringify(formData2),
          headers: {
            Accept: "*/*",
            Authorization: `${token.type} ${token.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      let data2 = await response2.json();
      console.log(data2);
    } catch (err) {
      alert("");
    }

    for (let i = 0; i < uploadImgs.length; i++) {
      console.log(uploadImgs[i]);
      try {
        let bodyContent = new FormData();
        bodyContent.append("image", uploadImgs[i]);
        console.log(bodyContent.getAll("image"));

        let response = await fetch(
          `${process.env.REACT_APP_BasePath}hospital/uploadImage/`,
          {
            method: "PUT",
            body: bodyContent,
            headers: {
              Accept: "*/*",
              Authorization: `${token.type} ${token.token}`,
              enctype: "multipart/form-data",
            },
          }
        );

        let data = await response.text();
        console.log(data);
      } catch (err) {
        alert("Somthing went wrong! Image not uploaded");
      }
    }
  };
  const handleChange = (e) => {
    setFormData((oldValues) => {
      return { ...oldValues, [e.target.name]: e.target.value };
    });
  };
  const handleChange2 = (e) => {
    setFormData2((oldValues) => {
      return { ...oldValues, [e.target.name]: e.target.value };
    });
  };
  const handleChangeHospitalType = (e) => {
    if (e.target.checked) {
      formData.hospitalType.push(e.target.value);
      formData.hospitalType.sort();
      setFormData((oldValues) => {
        return { ...oldValues, hospitalType: [...formData.hospitalType] };
      });
      return;
    }
    formData.hospitalType = formData.hospitalType.filter(
      (item) => item !== e.target.value
    );
    setFormData((oldValues) => {
      return { ...oldValues, hospitalType: [...formData.hospitalType] };
    });
  };
  // const getCurrentLocation = () => {
  //     console.log("Func running..");
  //     getCurrentLocationBtnRef.current.setAttribute("disabled", "true");
  //     getCurrentLocationBtnRef.current.innerHTML = 'Getting Location';
  //     getCurrentLocationBtnRef.current.style.backgroundColor = '#d0d0d0';
  //     if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition((e) => {
  //             latitudeInputRef.current.value = e.coords.latitude;
  //             longitudeInputRef.current.value = e.coords.longitude;
  //             getCurrentLocationBtnRef.current.innerHTML = 'Get Current Location Coordinates';
  //             getCurrentLocationBtnRef.current.style.backgroundColor = null;
  //             getCurrentLocationBtnRef.current.removeAttribute("disabled");
  //             setFormData(oldValues => {
  //                 return { ...oldValues, latitude: e.coords.latitude, longitude: e.coords.longitude };
  //             });
  //         });
  //         return;
  //     }
  // }
  return (
    <div className="hospital_dashboard">
      <section className="hospital_details">
        <h1>Hospital Details</h1>

        <div className="hospital_basic_details_wrapper">
          <div className="hospital_images" ref={uploadImgRef}>
            <label htmlFor="uploadImg" className="uploadImg">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={loadImg}
                id="uploadImg"
                className="uploadImg_input"
              />
              <div className="uploadImg_div">
                <div className="uploadImg_div_circle">
                  <FaPlusCircle />
                </div>
                Select Hospital Image
              </div>
            </label>
            <div className="uploadImgs_preview_container"></div>
          </div>
          <div className="hospital_basic_details_inner_wrapper">
            <div className="hospital_basic_details">
              <h1>Hospital Basic details:</h1>
              <label>
                Hospital Name:
                <input
                  type="text"
                  onChange={handleChange}
                  value={formData.hospitalName}
                  name="hospitalName"
                />
              </label>
              <div className="hospital_basic_details_hospital_type">
                Hospital Type:
                <label>
                  <input
                    type="checkbox"
                    onChange={handleChangeHospitalType}
                    value={"Ayurvedic"}
                  />{" "}
                  Ayurvedic
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={handleChangeHospitalType}
                    value={"Yoga and Naturopathy"}
                  />{" "}
                  Yoga and Naturopathy
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={handleChangeHospitalType}
                    value={"Unani"}
                  />{" "}
                  Unani
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={handleChangeHospitalType}
                    value={"Siddha"}
                  />{" "}
                  Siddha
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={handleChangeHospitalType}
                    value={"Homeopathy"}
                  />{" "}
                  Homeopathy
                </label>
              </div>
              <label>
                Total Beds:
                <input
                  type="number"
                  onChange={handleChange2}
                  value={formData2.totalBeds}
                  name="totalBeds"
                  required
                />
              </label>
              {/* <label>Hospital Phone Number:<input type="number" onChange={handleChange} value={formData.mobileNumber} name="mobileNumber" required /></label> */}
              <label>
                Hospital Email Id:
                <input
                  type="email"
                  onChange={handleChange}
                  value={formData.email}
                  name="email"
                />
              </label>
              <label>
                Hospital Website Link:
                <input
                  type="url"
                  onChange={handleChange2}
                  value={formData2.website}
                  name="website"
                />
              </label>
            </div>
            <div className="hospital_basic_details">
              <h1>Hospital Address:</h1>
              <label>
                Address Line 1:
                <input
                  type="text"
                  autoComplete="off"
                  onChange={handleChange}
                  value={formData.addressLine1}
                  name="addressLine1"
                />
              </label>
              <label>
                Street Address:
                <input
                  type="text"
                  autoComplete="off"
                  onChange={handleChange}
                  value={formData.streetAddress}
                  name="streetAddress"
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  autoComplete="off"
                  onChange={handleChange}
                  value={formData.city}
                  name="city"
                />
              </label>
              <label>
                PinCode:
                <input
                  type="text"
                  autoComplete="off"
                  onChange={handleChange}
                  value={formData.pincode}
                  name="pincode"
                />
              </label>
              <label>
                State:
                <input
                  type="text"
                  autoComplete="off"
                  onChange={handleChange}
                  value={formData.state}
                  name="state"
                />
              </label>
              <label>
                Country:
                <input
                  type="text"
                  autoComplete="off"
                  onChange={handleChange}
                  value={formData.country}
                  name="country"
                />
              </label>
              <br />
              {/* Coordinates:
                            <label>Latitude: <input type="number" onChange={handleChange} value={formData.latitude} name="latitude" ref={latitudeInputRef} /></label>
                            <label>Longitude: <input type="number" onChange={handleChange} value={formData.longitude} name="longitude" ref={longitudeInputRef} /></label> */}
              {/* <button className="hospital_dashboard_get_coordinates_btn" onClick={getCurrentLocation} ref={getCurrentLocationBtnRef}>Get Current Location Coordinates</button> */}
            </div>
          </div>
        </div>
        <button
          className="update_hospital_details_btn"
          onClick={updateHospitalDetails}
        >
          Update Details
        </button>
      </section>
    </div>
  );
};
export default HospitalDashboard;
