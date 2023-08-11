import NavbarMain from "./navbar-main";
import Banner from "./banner";
import About from "./about";
import News from "./news";
import Testimonials from "./testimonials";
import ContactUs from "./contactus";
import Home from "../dashboard/home";


const MainHomepage = () => {
  return (
    <>
        <NavbarMain />
        <Banner />
        <About />
        <News />
        <Testimonials />
        <ContactUs />
        {/* <Home /> */}
        
    </>
  );
};

export default MainHomepage;
