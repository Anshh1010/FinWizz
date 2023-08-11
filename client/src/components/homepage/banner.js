
import '../../assets/css/navbar.css';
import BannerPhoto from '../../assets/images/banner-main-img.png';

const Banner = () => {
  let URL = 'http://localhost:3000';
  return (
    <div className='banner-main' id='home'>
      <div className='banner-main-inner'>
        <div className='banner-left'>
          <div className='main-heading'>
          <span className="hellospanner">Strategic </span> Planning, Lasting Financial Security with <span className="hellospanner">FinWizz</span>
          </div>

          <div className='sub-heading'>
          <i class="fa-solid fa-quote-left" style={{color: '#01b0d3'}}></i>
          &nbsp;We provide personalized investment advice and portfolio management based on an individual's financial goals 
          and risk tolerance. We offer cost-efficient, accessible, and convenient investment solutions making it a 
          popular choice for many investors.&nbsp; 
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
          <img alt='' className='banner-photo' src={BannerPhoto}></img>
        </div>
      </div>
    </div>
  );
};

export default Banner;
