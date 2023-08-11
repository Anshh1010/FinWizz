import React,{useState} from "react";
import '../../assets/css/stocks.css';
import Home from "./home";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import axios from 'axios';



const Stocks = () =>{

const [value, setValue] = useState(30);
const [vals, setVals] = useState([]);
const config = {
    headers: {
      'Content-Type': 'application/json',
  },
};

const data = [
    { name: 'IRCTC', beta: 0.283 },
    { name: 'INDIAN RAILWAY FINANCE CORPORATION', beta: 0.302 },
    { name: 'SAGAR CEMENTS', beta: 0.380 },
    { name: 'INFOSYS', beta: 0.404 },
    { name: 'INDRAPRASTHA GAS LIMITED', beta: 0.514 },
    { name: 'ITC', beta: 0.601 },
    { name: 'HAVELLS', beta: 0.624 },
    { name: 'GLAND PHARMACEUTICALS', beta: 0.642 },
    { name: 'AXTEL', beta: 0.671 },
    { name: 'RELIANCE INDUSTRIES', beta: 0.885 },
    { name: 'VARUN BEVERAGES LIMITED', beta: 0.933 },
    { name: 'DCM SHRIRAM INDUSTRIES LIMITED', beta: 0.956 },
    { name: 'YAMUNA SYNDICATE LIMITED', beta: 1.015 },
    { name: 'DISA INDIA LIMITED', beta: 1.052 },
    { name: 'LARSEN AND TOUBRO', beta: 1.062 },
    { name: 'ZEN TECHNOLOGIES', beta: 1.145 },
    { name: 'ADANI PORTS', beta: 1.293 },
    { name: 'TATA STEEL', beta: 1.614 },
    { name: 'PIX TRANSMISSIONS', beta: 1.634 },
    { name: 'TATAMOTORS', beta: 2.099 }
];
   
    const changeValue = (event, value) => {
       value=35;
    
  
     const data = {
       risk:value,
       };
 
       console.log(data)
     const url = `http://localhost:8000/v1/user/afterRisk`;
     axios.post(url, data, config)
       .then((response) => {
         console.log('Data sent successfully:', response.data);
         console.log(response.message);
         setVals(response.message);
         console.log(setVals);
        
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
            {
            data.map((data)=>(
                <div class="card">
                    <h2>{data.name}</h2>
                    <p>{data.beta}</p>
                </div>
            ))
            }
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

export default Stocks;