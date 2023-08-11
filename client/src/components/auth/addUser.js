import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/modal.css';
import '../../assets/css/form.css';
import Loader from '../../assets/images/Loader123.gif';
import Swal from 'sweetalert2';

const AddUser = () => {

  const [income,setIncome] =useState('');
  const [debt,setDebt] =useState('');
  const [currentsavings,setCurrentSavings] =useState('');
  const [investementr,setInvestmentr] =useState('');
  const [maritalstatus,setMaritalStatus] =useState('');
  const [numchild,setNumChild] =useState('');
  const [age,setAge] =useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useNavigate(); 


    
  const AddUser = async (e) => {
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
        body: JSON.stringify({ income,debt,currentsavings,investementr,maritalstatus,numchild,age }),
      });

      setIsLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Add User failed.');
        return;
      }

      const data = await response.json();

      history('/dashboard/home');
    } catch (error) {
      setError('An error occurred during adding user. Please try again later.');
      setIsLoading(false);
    }
  };

  
  return (
    <>
      <div id="adduser" className="modal-window">
        <div>
          <a href="#" title="Close" className="modal-close">
            X
          </a>
          <h1>Add User</h1>
          <form onSubmit={AddUser}>
            <div className="form-group">
              <label htmlFor="income">Income</label>
              <input
                type="number"
                name="income"
                autoComplete="off"
                required
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="debt">Debt</label>
              <input
                type="number" 
                name="debt"
                autoComplete="off"
                required
                value={debt}
                onChange={(e) => setDebt(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="currentsavings">Current Savings</label>
              <input
                type="number" 
                name="currentsavings"
                value={currentsavings} 
                autoComplete="off"
                onChange={(e) => setCurrentSavings(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="investmentr">Investment Returns</label>
              <input
                type="number"
                name="investmentr"
                autoComplete="off"
                required
                value={investementr}
                onChange={(e) => setInvestmentr(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="maritalstatus">Marital Status</label>
              <input
                type="text"
                name="maritalstatus"
                autoComplete="off"
                required
                value={maritalstatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="numchild">Number of Children</label>
              <input
                type="number"
                name="numchild"
                autoComplete="off"
                required
                value={numchild}
                onChange={(e) => setNumChild(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="age"
                name="age"
                autoComplete="off"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="btn-sbmt-cont">
              <button type="submit" value="SignUp" className="btn-sbmt" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <img src={Loader} className="loginbtn-loader" alt="Loader" /> Signing In....
                  </>
                ) : (
                  'Add User'
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

export default AddUser;
