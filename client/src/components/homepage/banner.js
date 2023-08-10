
import '../../assets/css/navbar.css';
import BannerPhoto from '../../assets/images/banner-main-img.png';

const Banner = () => {
  let URL = 'http://localhost:3000';
  return (
    <div className='banner-main' id='home'>
      <div className='banner-main-inner'>
        <div className='banner-left'>
          <div className='main-heading'>
          <span className="hellospanner">Securely</span> tracking every move with <span className="hellospanner">NFC-based</span> police personnel monitoring
          </div>

          <div className='sub-heading'>
          <i class="fa-solid fa-quote-left" style={{color: '#01b0d3'}}></i>
          &nbsp;Aarakshak is an NFC-based solution for securely 
          tracking and authenticating police personnel in 
          real time. It simplifies officer onboarding, duty 
          assignment, and enables effective responses to emergencies.&nbsp; 
          <i class="fa-solid fa-quote-right" style={{color: '#01b0d3'}}></i>
          </div>

          <div className='button-banner-cont'>
            <a href={`${URL}/#about`}>
              <button className='button-banner'>
                Get Started! &nbsp;<i class='fa-solid fa-circle-chevron-down'></i>
              </button>
            </a>
          </div>
        </div>
        <div className='banner-right'>
          <img alt='' className='banner-photo' src={BannerPhoto} style={{borderRadius:100}}></img>
        </div>
      </div>
    </div>
  );
};

export default Banner;
