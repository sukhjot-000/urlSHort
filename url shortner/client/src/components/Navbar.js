import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  useEffect(() => {
    // Read values from local storage
    const storedUserName = localStorage.getItem('userName') || '';
    const storedToken = localStorage.getItem('token') || '';

    // Dispatch action to set user in the Redux store
    dispatch({
      type: 'setUser',
      payload: {
        userName: storedUserName,
        token: storedToken,
      },
    });
    
  }, [dispatch]);
  const [openBasic, setOpenBasic] = useState(false);
  const [user, setUser] = useState({
    userName: localStorage.getItem('userName') || '',
    token: localStorage.getItem('token') || '',
  });

  const logoutUser = () => {
    // Clear local storage
    window.localStorage.removeItem('userName');
    window.localStorage.removeItem('token');
    dispatch({
      type: 'setUser',
      payload: {
        userName: "",
        token: ""
      },
    });

    // Update state to reflect the logout
    setUser({
      userName: '',
      token: '',
    });
    navigate('signIn');
  };

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
      <NavLink to=""><MDBNavbarBrand href=''>Url Shortner</MDBNavbarBrand></NavLink>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <NavLink to="">
                <MDBNavbarLink active aria-current='page' href='#'>
                  Home
                </MDBNavbarLink>
              </NavLink>
            </MDBNavbarItem>
            {user.userName ? (
              <MDBNavbarItem>
                <NavLink to="GetUrls">
                  <MDBNavbarLink active aria-current='page' href='#'>
                    My URLs
                  </MDBNavbarLink>
                </NavLink>
              </MDBNavbarItem>
            ) : null}
            {!user.userName ? (
              <>
                <MDBNavbarItem>
                  <NavLink to="Signup">
                    <MDBNavbarLink active aria-current='page' href='#'>
                      SignUp
                    </MDBNavbarLink>
                  </NavLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <NavLink to="SignIn">
                    <MDBNavbarLink active aria-current='page' href='#'>
                      SignIn
                    </MDBNavbarLink>
                  </NavLink>
                </MDBNavbarItem>
              </>
            ) : null}
            
            {user.userName ? (
              <>
                <MDBNavbarItem onClick={logoutUser}>
                  <MDBNavbarLink active aria-current='page'>
                    Logout
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink active aria-current='page' href=''>
                    Welcome, {user.userName}
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            ) : null}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
