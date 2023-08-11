import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import image1 from "../../assets/images/davis.jpg";
import image2 from "../../assets/images/benjamin.jpeg";
import image3 from "../../assets/images/fisher.jpg";
import image4 from "../../assets/images/rakesh.jpeg";

import "../../assets/css/testimonials.css";

const Testimonials = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  return (
    <div className="testimonial-section">
      <div className="about-testimonial">
        <div data-aos="zoom-in-right" className="testimonial-text col-sm-3">
        <div className="testimonial-content">
          <p>
            <i class="fa-solid fa-quote-left fa-2x" style={{position:'relative', left:'-5px',top:'-5px'}}></i>&nbsp;Invest for the long haul. 
            Don't get too greedy and don't get too scared.
            <i class="fa-solid fa-quote-right fa-2x icon-right-testimonial" style={{right: '5px'}}></i>
          </p>
          </div>
          <div className="testimonial-details">
            <img src={image1} />
            <div className="testimonial-designation">
              <span><b>Shelby M.C. Davis</b></span>
            </div>
          </div>
        </div>
        <div data-aos="zoom-in-down" className="testimonial-text col-sm-3">
          <div className="testimonial-content">
            <p>
              <i class="fa-solid fa-quote-left fa-2x" style={{position:'relative', left:'-5px',top:'-5px'}}></i>&nbsp;The intelligent investor is a realist 
              who sells to optimists and buys from pessimists.
              <i class="fa-solid fa-quote-right icon-right-testimonial fa-2x" style={{right: '15px'}}></i>
            </p>
          </div>
          <div className="testimonial-details">
            <img src={image2} />
            <div className="testimonial-designation">
              <span><b>Benjamin Graham</b></span>
            </div>
          </div>
        </div>
        <div data-aos="zoom-in-down" className="testimonial-text col-sm-3">
        <div className="testimonial-content">
          <p className="p1">
            <i class="fa-solid fa-quote-left fa-2x" style={{position:'relative', left:'-5px',top:'-5px'}}></i>
            &nbsp;The stock market is filled with individuals who know the price of everything, but value 
            of nothing.
            <i class="fa-solid fa-quote-right icon-right-testimonial fa-2x" style={{right: '-4px'}}></i>
          </p>
          </div>
          <div className="testimonial-details">
            <img src={image3} />
            <div className="testimonial-designation">
              <span><b>Phillip Fisher</b></span>
            </div>
          </div>
        </div>
        <div data-aos="zoom-in-left" className="testimonial-text col-sm-3">
        <div className="testimonial-content">
          <p>
            <i class="fa-solid fa-quote-left fa-2x" style={{position:'relative', left:'-5px',top:'-5px'}}></i>
            &nbsp;Always go against tide. Buy when others are selling and sell when others are buying.
            <i class="fa-solid fa-quote-right icon-right-testimonial fa-2x" style={{right: '2px'}}></i>
          </p>
          </div>
          <div className="testimonial-details">
            <img src={image4} />
            <div className="testimonial-designation">
              <span><b>Rakesh Jhunjhunwala</b></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
