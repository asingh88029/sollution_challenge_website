import React from 'react';
import "./HomepageCarousel.css";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const HomepageCarousel = ({ quotes }) => {
    return (
        <OwlCarousel className='owl-theme' loop margin={0} items={1}>
            {quotes?.map((item, index) => {
                return (
                    <div key={index} className='homepage_carousel_item_container'>
                       <div>
                           <h1>{item}</h1>
                       </div>
                       <div>
                           
                       </div>
                    </div>
                )
            }
            )}
        </OwlCarousel>
    );
}
export default HomepageCarousel;