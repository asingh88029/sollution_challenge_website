import React from 'react';
import "./Carousel.css";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const Carousel=({images})=>{
    return (
        <OwlCarousel className='owl-theme' loop margin={1} items={1}>
            {images?.map((item,index)=>{
                return(<div key={index} className='carousel_item_container'><img src={item}/></div>)
            }
            )}
        </OwlCarousel>
    );
}
export default Carousel;




// ....

// classNameName "owl-theme" is optional