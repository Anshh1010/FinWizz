
import React, { useEffect } from 'react';
import '../../assets/css/about.css';
import logoabt1 from '../../assets/images/risk.gif';
import logoabt4 from '../../assets/images/stock.gif';
import logoabt5 from '../../assets/images/plan.gif';
import AOS from 'aos';

const About = () => {
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
    <>
      <div className='hello-about' id='about'></div>
      <div className='about-main'>
        <div className='about-inner row'>
          <div className='abouter about-1 col-sm-4' data-aos='zoom-in-right'>
            <div className='about-text'>
              <h2><img src={logoabt1} className='about-img'></img> <span style={{marginLeft: '13px'}}>Risk</span> <br /> <span style={{marginLeft:'70px'}}>Management</span></h2> 
              <p>
              We assess your insurance requirements and 
              offer advice on numerous coverage options, including health, life, disability, 
              and long-term care insurance and help you identify possible threats and 
              formulate defenses to safeguard your assets and yourself.
              </p>
            </div>
          </div>

          <div className='abouter about-2 col-sm-4' data-aos='zoom-in-down'>
            <div className='about-text'>
              <h2><img src={logoabt4} className='about-img'></img> <span style={{marginLeft: '12px'}}>Investment</span><br></br><span style={{marginLeft:'69px'}}>Advice</span> </h2>
              <p className='p1'>
              Depending on your risk tolerance and financial objectives, 
              we can suggest appropriate investing methods.
              We will assist you in comprehending the benefits and 
              risks associated with various investing alternatives, including stocks, bonds, and mutual funds.
              </p>
            </div>
          </div>

          <div className='abouter about-3 col-sm-4' data-aos='zoom-in-left'>
            <div className='about-text'>
              <h2><img src={logoabt5} className='about-img'></img><span style={{marginLeft: '13px'}}> Retirement </span> <br></br> <span style={{marginLeft: '70px'}}>Planning</span> </h2>
              <p>
              To help you attain your retirement objectives,
               we offer assistance in developing a retirement savings strategy, 
               determining how much you need to save, and recommending suitable 
               retirement accounts or investment vehicles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

