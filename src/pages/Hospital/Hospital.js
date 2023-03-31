import { useState, useEffect, useContext, useRef } from "react";
import { GlobalContext } from '../../App';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import "./Hospital.css";
import { FaStar, FaRegStar } from 'react-icons/fa';
import HomepageCarousel from "../../components/Carousel/HomepageCarousel";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Hospital = () => {
    const navigate = useNavigate();
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    const [hospitalData, setHospitalData] = useState({});
    const [reviews, setReviews] = useState({});
    const { lat, lng, token } = useContext(GlobalContext);
    const [isSelectDoctorVisible, setIsSelectDoctorVisible] = useState(false);
    const [hospitalDoctor, setHospitalDoctor] = useState([]);
    const [allSlots, setAllSlots] = useState([]);
    const [isSlotVisible, setIsSlotVisible] = useState(false);
    const [doctorId,setDoctorID]=useState("");
    const [dateID,setDateID]=useState("");
    useEffect(() => {
        if (id === null || id === undefined) {
            navigate("/");
            return;
        }
        (async () => {
            const res = await fetch(`${process.env.REACT_APP_BasePath}hospital/details/${id}`);
            const data = await res.json();
            setHospitalData(data);
            console.log(data);
            const reviewRes = await fetch(`${process.env.REACT_APP_BasePath}hospital/getReviews/${id}`);
            const reviewData = await reviewRes.json();
            setReviews(reviewData);
        })();
    }, []);
    // useEffect(()=>{console.log(hospitalDoctor)},[hospitalDoctor]);

    if (JSON.stringify(hospitalData) === JSON.stringify({})) return <Skeleton style={{height:"500px", margin:"1rem", boxSizing:"border-box", width:"calc(100vw - 2rem)"}}/>;
    if (JSON.stringify(reviews) === JSON.stringify({})) return <Skeleton style={{height:"500px", margin:"1rem", boxSizing:"border-box", width:"calc(100vw - 2rem)"}}/>;

    const bookSlot = async(dateId,timeId) => {
        // console.log(`HospitalID:${id} DoctorID: ${doctorId} DateID:${dateId} TimeID:${timeId}`);
        try{
            const res=await fetch(`${process.env.REACT_APP_BasePath}hospital/bookSlot/${id}/${doctorId}/${dateId}/${timeId}`,{
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token.type} ${token.token}`
            }
            });
            const data=await res.json();
            // console.log(data);
            setIsSlotVisible(false);
            alert(data.message)
        }catch(err){
            console.log(err);
        }
    }
    const bookAppointment = async () => {
        setIsSelectDoctorVisible(true);
        try {
            console.log("Here..");
            const res = await fetch(`${process.env.REACT_APP_BasePath}hospital/doctors/${id}`);
            const data = await res.json();
            console.log(data);
            setHospitalDoctor(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
    const selectSlot = async (doctorId) => {
        setDoctorID(doctorId);
        setIsSelectDoctorVisible(false);
        let date = new Date();
        let today = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
        try {
            const res = await fetch(`${process.env.REACT_APP_BasePath}hospital/getSlot/${id}/${doctorId}`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token.type} ${token.token}`
                },
                body: JSON.stringify({
                    "date": today
                }),

            });
            const data = await res.json();
            setAllSlots(data.reservation);
            setIsSlotVisible(true);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <div className="hospital_details_and_review_container">
                <div className="hospital_left">
                    <img className="hospital_left_img" src = {hospitalData.images} width="100%"/>
                </div>
                <div className="hospital_desc">
                    <div className="hospital_name_and_address_container">
                        <div className="hospital_name">{hospitalData.hospitalName}</div>
                        <div className="hospital_address">
                            {hospitalData.contactInfo.address.addressLine1}
                            
                            {hospitalData.contactInfo.address.street}, {hospitalData.contactInfo.address.city}
                            
                            {hospitalData.contactInfo.address.state}, {hospitalData.contactInfo.address.country}

                        </div>
                        <h4>Ratings   ★★★★</h4>
                    </div>
                    <div className="hospital_timing">
                        <span>{hospitalData.openingTime} - {hospitalData.closingTime}(Today)</span>
                        <br></br>
                        <span className="hospital_timing_btn">Open Now</span>
                    </div>
                    <div className="hospital_assets_and_hospital_contact_container">
                        <div className="hospital_assets">
                            <div className="hospital_assets_doctor_count">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M96 128C96 57.31 153.3 0 224 0C294.7 0 352 57.31 352 128C352 198.7 294.7 256 224 256C153.3 256 96 198.7 96 128zM128 370.3C104.9 377.2 88 398.6 88 424C88 454.9 113.1 480 144 480C174.9 480 200 454.9 200 424C200 398.6 183.1 377.2 160 370.3V304.9C166 304.3 172.1 304 178.3 304H269.7C275.9 304 281.1 304.3 288 304.9V362C260.4 369.1 240 394.2 240 424V464C240 472.8 247.2 480 256 480H272C280.8 480 288 472.8 288 464C288 455.2 280.8 448 272 448V424C272 406.3 286.3 392 304 392C321.7 392 336 406.3 336 424V448C327.2 448 320 455.2 320 464C320 472.8 327.2 480 336 480H352C360.8 480 368 472.8 368 464V424C368 394.2 347.6 369.1 320 362V311.2C393.1 332.9 448 401.3 448 482.3C448 498.7 434.7 512 418.3 512H29.71C13.3 512 0 498.7 0 482.3C0 401.3 54.02 332.9 128 311.2V370.3zM120 424C120 410.7 130.7 400 144 400C157.3 400 168 410.7 168 424C168 437.3 157.3 448 144 448C130.7 448 120 437.3 120 424z" /></svg>
                                <div className="hospital_assets_title">
                                    Doctors
                                </div>
                                <div className="hospital_assets_value">
                                    {hospitalData.assets.numberOfDoctors}
                                </div>
                            </div>

                            <div className="hospital_assets_vaccent_beds">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M524 64H616C629.3 64 640 74.75 640 88C640 101.3 629.3 112 616 112H512C504.4 112 497.3 108.4 492.8 102.4L468.7 70.31L421.7 170.2C418 178.1 410.4 183.3 401.8 183.9C393.1 184.6 384.8 180.5 380 173.3L339.2 112H216C202.7 112 192 101.3 192 88C192 74.75 202.7 64 216 64H352C360 64 367.5 68.01 371.1 74.69L396.4 111.3L442.3 13.78C445.9 6.163 453.2 .9806 461.6 .1246C469.9-.7314 478.1 2.865 483.2 9.6L524 64zM320 160H332.7L353.4 191.1C364.6 207.9 384 217.3 404.1 215.8C424.3 214.4 442.1 202.1 450.7 183.8L461.9 160H544C597 160 640 202.1 640 256V480C640 497.7 625.7 512 608 512C590.3 512 576 497.7 576 480V448H64V480C64 497.7 49.67 512 32 512C14.33 512 0 497.7 0 480V96C0 78.33 14.33 64 32 64C49.67 64 64 78.33 64 96V352H288V192C288 174.3 302.3 160 320 160zM96 240C96 195.8 131.8 160 176 160C220.2 160 256 195.8 256 240C256 284.2 220.2 320 176 320C131.8 320 96 284.2 96 240z" /></svg>
                                <div className="hospital_assets_title">
                                    Vacant bed
                                </div>
                                <div className="hospital_assets_value">
                                    {hospitalData.assets.totalBeds - hospitalData.assets.occupiedBeds}
                                </div>
                            </div>

                            <div className="hospital_assets_total_beds">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M32 32C49.67 32 64 46.33 64 64V320H288V160C288 142.3 302.3 128 320 128H544C597 128 640 170.1 640 224V448C640 465.7 625.7 480 608 480C590.3 480 576 465.7 576 448V416H64V448C64 465.7 49.67 480 32 480C14.33 480 0 465.7 0 448V64C0 46.33 14.33 32 32 32zM96 208C96 163.8 131.8 128 176 128C220.2 128 256 163.8 256 208C256 252.2 220.2 288 176 288C131.8 288 96 252.2 96 208z" /></svg>
                                <div className="hospital_assets_title">
                                    Vacant bed
                                </div>
                                <div className="hospital_assets_value">
                                    {hospitalData.assets.totalBeds}
                                </div>
                            </div>

                            <div className="hospital_assets_inpatient">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M277.4 11.98C261.1 4.469 243.1 0 224 0C170.3 0 124.5 33.13 105.5 80h81.07L277.4 11.98zM342.5 80c-7.895-19.47-20.66-36.19-36.48-49.51L240 80H342.5zM224 256c70.7 0 128-57.31 128-128c0-5.48-.9453-10.7-1.613-16H97.61C96.95 117.3 96 122.5 96 128C96 198.7 153.3 256 224 256zM272 416h-45.14l58.64 93.83C305.4 503.1 320 485.8 320 464C320 437.5 298.5 416 272 416zM274.7 304H173.3c-5.393 0-10.71 .3242-15.98 .8047L206.9 384H272c44.13 0 80 35.88 80 80c0 18.08-6.252 34.59-16.4 48h77.73C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM0 477.3C0 496.5 15.52 512 34.66 512H64v-169.1C24.97 374.7 0 423.1 0 477.3zM96 322.4V512h153.1L123.7 311.3C114.1 314.2 104.8 317.9 96 322.4z" /></svg>
                                <div className="hospital_assets_title">
                                    Inpatient
                                </div>
                                <div className="hospital_assets_value">
                                    {hospitalData.assets.numberOfActivePatients}
                                </div>
                            </div>

                            <div className="hospital_assets_outpatient">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M272 0C298.5 0 320 21.49 320 48V367.8C281.8 389.2 256 430 256 476.9C256 489.8 259.6 501.8 265.9 512H48C21.49 512 0 490.5 0 464V384H144C152.8 384 160 376.8 160 368C160 359.2 152.8 352 144 352H0V288H144C152.8 288 160 280.8 160 272C160 263.2 152.8 256 144 256H0V48C0 21.49 21.49 0 48 0H272zM152 64C143.2 64 136 71.16 136 80V104H112C103.2 104 96 111.2 96 120V136C96 144.8 103.2 152 112 152H136V176C136 184.8 143.2 192 152 192H168C176.8 192 184 184.8 184 176V152H208C216.8 152 224 144.8 224 136V120C224 111.2 216.8 104 208 104H184V80C184 71.16 176.8 64 168 64H152zM512 272C512 316.2 476.2 352 432 352C387.8 352 352 316.2 352 272C352 227.8 387.8 192 432 192C476.2 192 512 227.8 512 272zM288 477.1C288 425.7 329.7 384 381.1 384H482.9C534.3 384 576 425.7 576 477.1C576 496.4 560.4 512 541.1 512H322.9C303.6 512 288 496.4 288 477.1V477.1z" /></svg>
                                <div className="hospital_assets_title">
                                    Outpatient
                                </div>
                                <div className="hospital_assets_value">
                                    {hospitalData.assets.numberOfPatients - hospitalData.assets.numberOfActivePatients}
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className="hospital_contact">
                            <a href={`tel:${hospitalData.phoneNumber}`} className="hospital_number">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" /></svg>
                                <div className="hospital_assets_title">
                                    <br />
                                </div>
                                <div className="hospital_assets_value">
                                    Call
                                </div>
                            </a>

                            <Link to={`/map?hlat=${hospitalData.location.latitude}&hlng=${hospitalData.location.longitude}&lat=${lat}&lng=${lng}`} className="hospital_number">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M497.1 222.1l-208.1-208.1c-9.364-9.364-21.62-14.04-33.89-14.03C243.7 .0092 231.5 4.686 222.1 14.03L14.03 222.1C4.676 231.5 .0002 243.7 .0004 255.1c.0002 12.26 4.676 24.52 14.03 33.87l208.1 208.1C231.5 507.3 243.7 511.1 256 511.1c12.26 0 24.52-4.677 33.87-14.03l208.1-208.1c9.352-9.353 14.03-21.61 14.03-33.87C511.1 243.7 507.3 231.5 497.1 222.1zM410.5 252l-96 84c-10.79 9.545-26.53 .9824-26.53-12.03V272H223.1l-.0001 48C223.1 337.6 209.6 352 191.1 352S159.1 337.6 159.1 320V240c0-17.6 14.4-32 32-32h95.1V156c0-13.85 16.39-20.99 26.53-12.03l96 84C414 231 415.1 235.4 415.1 240S414 249 410.5 252z" /></svg>
                                <div className="hospital_assets_title">
                                    <br />
                                </div>
                                <div className="hospital_assets_value">
                                    Map
                                </div>
                            </Link>

                            <a href={`mailto:${hospitalData.email}`} className="hospital_number">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z" /></svg>
                                <div className="hospital_assets_title">
                                    <br />
                                </div>
                                <div className="hospital_assets_value">
                                    Email Us
                                </div>
                            </a>

                            <div className="hospital_number" onClick={() => { navigator.clipboard.writeText(window.location.href); window.alert("Coppied to Clipboard, Paste link to share") }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M285.4 197.1L191.3 244.1C191.8 248 191.1 251.1 191.1 256C191.1 260 191.8 263.1 191.3 267.9L285.4 314.9C302.6 298.2 326.1 288 352 288C405 288 448 330.1 448 384C448 437 405 480 352 480C298.1 480 256 437 256 384C256 379.1 256.2 376 256.7 372.1L162.6 325.1C145.4 341.8 121.9 352 96 352C42.98 352 0 309 0 256C0 202.1 42.98 160 96 160C121.9 160 145.4 170.2 162.6 186.9L256.7 139.9C256.2 135.1 256 132 256 128C256 74.98 298.1 32 352 32C405 32 448 74.98 448 128C448 181 405 224 352 224C326.1 224 302.6 213.8 285.4 197.1L285.4 197.1z" /></svg>
                                <div className="hospital_assets_title">
                                    <br />
                                </div>
                                <div className="hospital_assets_value">
                                    Share
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {token.level === "user" && <div className="hospital_book_appointment">
                        <button onClick={bookAppointment}>Book Appointment</button>
                    </div>} */}
                    {/* {token === "" && <div className="hospital_book_appointment">
                        <button><Link to="/login">Login to Book Appointment</Link></button>
                    </div>} */}
                    <div className="hospital_book_appointment">
                        <button><Link to="/BookAppointment">Book Appointment</Link></button>
                    </div>
                </div>
            </div>
            {/* <div className="hospital_review">
                    <div>
                        <p>Share your experience to help others</p>
                        <textarea></textarea><button>Submit</button>
                    </div>
                    <div className="hospital_review_card_container">
                        {reviews.reviews.map((item, index) => {
                            return (
                                <div className="hospital_review_card" key={index}>
                                    <div className="hospital_reviewer_img">
                                        <img src={item.reviewer.profilePic} />
                                    </div>
                                    <div className="hospital_reviewer">
                                        <h5>{item.reviewer.name}</h5>
                                        <div>{
                                            Array.apply(null, Array(5)).map((_, index) => {
                                                if (index < item.review.rating)
                                                    return <FaStar className="review_stars" key={index} />
                                                return <FaRegStar className="review_stars" key={index} />
                                            })
                                        }</div>
                                        <p>{item.review.comment}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div> */}
            <HomepageCarousel quotes={["Where the art of medicine is loved, there is also love for humanity","Just because you're not sick doesn't mean you're healthy.","Always laugh when you can, it is cheap medicine.","True Medicine Comes From Earth Not From Lab"]} />
            {isSelectDoctorVisible &&
                <div className="select_doctor_wrapper">
                    <h1>Select Doctor</h1>
                    <div className="select_doctor_inner_wrapper">
                        {hospitalDoctor.map((item, index) => {
                            return <div className="select_doctor" onClick={() => { selectSlot(item.doctor._id) }} key={index}>
                                <div className="select_doctor_img">
                                    <img src={item?.doctor?.image || ""} height="250px" width="250px" />
                                </div>
                                <div className="select_doctor_desc">
                                    <h3>{item.doctor.name}</h3>
                                    <div style={{ textTransform: "capitalize" }}>{item.department}</div>
                                    <div style={{ textTransform: "capitalize" , fontSize:"0.8rem"}}>{item.doctor?.speciality}</div>
                                </div>
                            </div>
                        })}
                    </div>
                    <button className="cancle_appointment_btn" onClick={() => { setIsSelectDoctorVisible(false) }}>Cancel</button>
                </div>
            }
            {isSlotVisible &&
                <div className="select_doctor_wrapper">
                    <h1>Select Slot</h1>
                    <div className="select_slot_inner_wrapper">
                        {allSlots?.map((item, index) => {
                            // console.log(item);
                            return item.slots.map((time, index) => {
                                const date = new Date(time.date);
                                // console.log(time);
                                const { status } = time;
                                return <button key={index} className={status === "unreserved" ? `select_time_slot` : `select_time_slot select_time_slot_disabled`} 
                                onClick={() => {
                                    if(status === "unreserved")
                                        bookSlot(item._id,time._id)
                                    }
                                    }
                                >{date.toLocaleTimeString('en-US',
                                    { hour12: true, hour: '2-digit', minute: '2-digit' }
                                )}</button>

                            });
                        })}
                    </div>
                    <button className="cancle_appointment_btn" onClick={() => { setIsSlotVisible(false) }}>Cancel</button>
                </div>
            }
        </div>
    );
}
export default Hospital;