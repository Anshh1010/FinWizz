import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/modal.css';
import '../../assets/css/form.css';
import Loader from '../../assets/images/Loader123.gif';
import Swal from 'sweetalert2';

const SignUp = () => {

 const[risktaking,setRiskTaking] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useNavigate(); 

    
  const RiskTaking = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const apiUrl = 'https://violet-kitten-toga.cyclic.cloud/v1/admin/login';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ risktaking }),
      });

      setIsLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Sign Up failed.');
        return;
      }

      const data = await response.json();

      history('/dashboard/home');
    } catch (error) {
      setError('An error occurred during sign up. Please try again later.');
      setIsLoading(false);
    }
  };

  
  return (
    <>
      <div id="signup" className="modal-window">
        <div>
          <a href="#" title="Close" className="modal-close">
            X
          </a>
          <h1>Risk Taking</h1>
          <form onSubmit={RiskTaking}>
            <div className="form-group">
              <label htmlFor="risktaking"></label>
              <input
                type="risk taking"
                name="risk taking"
                autoComplete="off"
                required
                value={risktaking}
                onChange={(e) => setRiskTaking(e.target.value)}
              />
            </div>
            <div className="btn-sbmt-cont">
              <button type="submit" value="SignUp" className="btn-sbmt" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <img src={Loader} className="loginbtn-loader" alt="Loader" /> Signing In....
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
          </form>
          <p>
            {error && <div className="error-message">{error}</div>}
          </p>
        </div>
      </div>
    </>
  );
};

export default RiskTaking;
