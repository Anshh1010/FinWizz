import React,{useState} from "react";
import '../../assets/css/risk.css';
import Home from "./home";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import axios from 'axios';


const Risk = () =>{

    
const [value, setValue] = useState(30);
const config = {
    headers: {
      'Content-Type': 'application/json',
  },
};

   
    const changeValue = (event, value) => {
        setValue(value);
    
  
     const data = {
       risk:value,
       };
 
       console.log(data)
     const url = `http://localhost:8000/v1/user/afterRisk`;
     axios.post(url, data, config)
       .then((response) => {
         console.log('Data sent successfully:', response.data);
         console.log(response.message);
        
       })
       .catch((error) => {
         console.error('Error sending data:', error);
       });
     };

    function valuetext(value) {
        return `${value}%`;
      }

      

    return(
        <>
        <Home />
        <div className="body-div">
        <div class="container">
        <div class="card">
            <h2>Exchange-Traded Funds (ETFs)</h2>
            <p> ETFs are investment funds that trade on stock exchanges. They hold a diversified portfolio of assets like stocks, bonds, or commodities. ETFs offer easy diversification and liquidity, as they can be bought and sold throughout the trading day
                at market prices. They generally have lower expense ratios compared to mutual funds.</p>
        </div>

        <div class="card">
            <h2>Mutual Funds</h2>
            <p> Mutual funds pool money from multiple investors to invest in a diversified portfolio of stocks, bonds, or other assets. They are managed by professional fund managers who make investment decisions on behalf of the investors. Mutual funds are
                priced once a day after the market closes, and you buy or sell at the net asset value (NAV) price. They offer diversification and are suitable for investors with different risk tolerances.</p>
                </div>

        <div class="card">
            <h2>Fixed Deposits (FDs)</h2>
            <p> FDs are fixed-term savings accounts offered by banks and financial institutions. You deposit a lump sum amount for a predetermined period at a fixed interest rate. FDs provide a stable and predictable return, but the returns are generally
                lower compared to riskier investments like stocks. They are considered low-risk investments because the principal amount is guaranteed by the bank.</p>
        </div>

        <div class="card">
            <h2>Bonds</h2>
            <p> Bonds are debt securities issued by governments, municipalities, or corporations to raise capital. When you buy a bond, you are essentially lending money to the issuer in exchange for periodic interest payments and the return of the principal
                amount at maturity. Bonds are generally considered lower-risk investments compared to stocks, and they provide a fixed income stream.
            </p>
        </div>
    </div>
    <center style={{marginTop:'50px'}}>
    <Box sx={{ width: '500px'}}>
        <Slider
            aria-label="Temperature"
            defaultValue={30}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={5}
            marks
            min={5}
            max={100}
            value={value} 
            onChange={changeValue}
        />
    </Box>
    </center>
    </div>

        </>
    );
};

export default Risk;