import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { Link } from "react-router-dom";
import "./HospitalCard.css";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

function HospitalCardSkeleton() {
    return (
        <>
            <Skeleton height={400} width={300} />
            <Skeleton height={400} width={300} />
            <Skeleton height={400} width={300} />
            <Skeleton height={400} width={300} />
        </>
    );
}

export default HospitalCardSkeleton;
