import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/modal.css';
import '../../assets/css/form.css';
import Loader from '../../assets/images/Loader123.gif';
import Swal from 'sweetalert2';
import axios from 'axios';
import AdminEmailContext from '../context/adminContext';

const AddUser = () => {

  const [income,setIncome] =useState('');
  const [debt,setDebt] =useState('');
  const [expenses,setExpenses] =useState('');
  const [currentsavings,setCurrentSavings] =useState('');
  const [investementr,setInvestmentr] =useState('');
  const [maritalstatus,setMaritalStatus] =useState('');
  const [numchild,setNumChild] =useState('');
  const [age,setAge] =useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useNavigate(); 
  const { AdminEmail } = useContext(AdminEmailContext);


  const config = {
    headers: {
      'Content-Type': 'application/json',
  },
};
  const AddUser = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const data = {
        income: income, 
        expenses:expenses, 
        debt: debt, 
        current_savings: currentsavings, 
        investment_Returns:investementr,
        maritalStatus:maritalstatus, 
        number_of_children:numchild, 
        age:age,
        };

        const url = `http://localhost:8000/v1/user/afterSignUp/${AdminEmail}`;
        axios.post(url, data, config)
       .then((response) => {
         console.log('Data sent successfully:', response.data);
         Swal.fire({
           icon: (response.data.error) ? 'error' : 'success',
           title: (response.data.error) ? response.data.error : response.data.message,
           showConfirmButton: false,
           timer:1500,
         }
         )
        setIsLoading(false);
        {(response.data.error) ? <></> : history('dashboard/home')}
       })
       .catch((error) => {
         console.error('Error sending data:', error);
         setIsLoading(false);
       })
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
              <label htmlFor="expenses">Expenses</label>
              <input
                type="number"
                name="expenses"
                autoComplete="off"
                required
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
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
                type="number"
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
                    <img src={Loader} className="loginbtn-loader" alt="Loader" /> Submitting......
                  </>
                ) : (
                  'Submit'
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
