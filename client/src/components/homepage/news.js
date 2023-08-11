import React, { useEffect } from "react";
import '../../assets/css/news.css';
import AOS from "aos";

const News = () => {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);

      useEffect(() => {
        AOS.init({
          duration : 1000
        });
      }, []);

    return ( 
        <div className='schemes-outer'>
            <div className='schemes-inner row'>
            <div className='schemes-inner1 col-sm-1'>
                <div className='schemes-heading2'>
                    <h1> ताजा खबर / </h1>
                </div>
                <div className='schemes-heading'>
                    <h1> What's new. </h1>
                </div>
            </div>
            <div className="page-content col-sm-11">
                <div className="cardcard" data-aos="fade-down">
                    <div className="content">
                    <h2 className="title">Stock Market</h2>
                    <p className="copy" style={{textAlign:""}}>Nifty today ended 89 points lower near the 19,550-mark to form a small negative candle with minor upper and lower shadows on the daily chart. </p>
                    </div>
                </div>
                <div className="cardcard" data-aos="fade-up">
                    <div className="content">
                    <h2 className="title">Home Loan EMI</h2>
                    <p className="copy" style={{textAlign:""}}>Banks are increasing Home Loan EMI tenors without even asking borrowers.</p>
                    </div>
                </div>
                <div className="cardcard" data-aos="fade-down">
                    <div className="content">
                    <h2 className="title">EPFO</h2>
                    <p className="copy" style={{textAlign:""}}>The Employees Provident Fund Organisation has invested Rs 1.88 lakh crore in exchange traded funds (ETFs) in the last five fiscal years, starting from 2018-19.</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
     );
}
 
export default News;