import React from 'react'

//^ IMPORTING THE NAVBAR,NAV FROM BOOTSTRAP TO USE IN HEADER
import {Nav,Navbar,Container,NavDropdown,NavItem } from 'react-bootstrap'


//^ USING THEN NAVLINK FROM REACT ROUTER DOM
import {NavLink,Link, Navigate, useNavigate} from "react-router-dom";


import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo } = userLogin

    let navigate= useNavigate

    const LogoutHandler = async () =>{
        await dispatch(logout())
        navigate('/signin')
    }

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" className='py-3 px-5'>
            
            {/* LOGO OF OUR WEBSITE THAT WILL BE LINKED TO HOMEPAGE */}
            <NavLink to="/"> 
                <Navbar.Brand >Shopello</Navbar.Brand> 
            </NavLink>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            
            {/* giving the user cart and profile sections */}
            <Navbar.Collapse id="basic-navbar-nav">

                <SearchBox />

                <Nav className="ml-auto">
                    
                    
                <Link to="/cart" className='nav-link'>
                            <NavItem  >
                                <i className='fas fa-shopping-cart'/> Cart
                            </NavItem >
                        </Link>


                        { userInfo ? 
                            (
                                <NavDropdown title={userInfo.name} id='username' className='nav-link'>
                                    <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item> 
                                    <NavDropdown.Item onClick={LogoutHandler}> Logout  </NavDropdown.Item>
                                </NavDropdown>
                            ):
                            (
                                <Link to="/login" className='nav-link'>
                                    <NavItem>
                                        <i className='fas fa-user'/> Sign in
                                    </NavItem >
                                </Link>
                            )
                        }
                        
                        
{/* 
                        <Nav.Link href="/cart">
                            <i className='fas fa-shopping-cart'></i>Cart
                        </Nav.Link>
                 
                     */}
                  
                        {/* <Nav.Link href ="/signin">
                            <i className='fas fa-user'></i>Sign in
                        </Nav.Link> */}
                   
                   {userInfo && userInfo.isAdmin && (
                    <NavDropdown title='Menu' id='adminmenu' className='nav-link'>
                        <NavDropdown.Item as={Link} to='admin/userlist'>Users</NavDropdown.Item> 
                        <NavDropdown.Item as={Link} to='admin/productlist'>Products</NavDropdown.Item> 
                        <NavDropdown.Item as={Link} to='admin/orderlist'>Orders</NavDropdown.Item> 
                    </NavDropdown>
                   )}
                  

                    </Nav>

                </Navbar.Collapse>


        </Navbar>
    </header>
  )
}

export default Header