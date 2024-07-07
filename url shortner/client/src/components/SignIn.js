import React, { useState } from 'react';
// import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';


export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Event handlers to update state
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Your logic for handling the form submission with email and password
      console.log('Email:', email);
      console.log('Password:', password);

      // Sending login request
      let response = await axios.post(
        'http://localhost:3000/api/v1/user/getUser',
        {
          email,
          password,
        }
      );

      console.log(response.data);
      if (response.data.userName) {
        dispatch({
          type: 'setUser',
          payload: {
            userName: response.data.userName,
            token: response.data.token,
          },
        });
        window.localStorage.setItem('userName',  response.data.userName);
        window.localStorage.setItem('token', response.data.token);
        // Redirect to home page
        navigate('/');
        window.location.reload()
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

//   return (
//     <form onSubmit={handleSubmit}>
//       <MDBInput
//         className='mb-4'
//         id='form1Example1'
//         label='Email address'
//         value={email}
//         onChange={handleEmailChange}
//       />
//       <MDBInput
//         className='mb-4'
//         type='password'
//         id='form1Example2'
//         label='Password'
//         value={password}
//         onChange={handlePasswordChange}
//       />

//       <MDBBtn type='submit' block>
//         Sign in
//       </MDBBtn>
//     </form>
//   );
  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
        </MDBCol>
        <MDBCol col='4' md='6'>
          <MDBInput wrapperClass='mb-4' label='Email address'  type='email' size="lg" value={email}  onChange={handleEmailChange}/>
          <MDBInput wrapperClass='mb-4' label='Password' type='password' size="lg" value={password} onChange={handlePasswordChange}/>
          <MDBBtn className="mb-4 w-100" size="lg" onClick={handleSubmit}>Sign in</MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );







}
