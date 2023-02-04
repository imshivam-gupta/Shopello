import React from 'react'

//^ Using the header and footer that will be common for all screens 
import Header from './components/Header'
import Footer from './components/Footer';


//^ Using the Routes and Router functionality of react router dom for routes
import { Routes, Route } from 'react-router-dom'


//^ Importing the required bootsrap components
import { Container,Col, Row } from 'react-bootstrap';


//^ Importing various screens to use in app
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import Sidecart from './components/Sidecart';

import { useSelector } from 'react-redux';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrder from './screens/PlaceOrder';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';


const App = () => {

    //^ Deconstructing the product Details state obtained
    const cart        = useSelector(state => state.cart);
    const {cartItems} = cart;

  return (
    <>
      
      <Header />

        <Row className='app-row my-3'>
          <Col md={cartItems.length>0 ? '11' : '12'}>
              <Container className='app-container'>
                
                <Routes>
                  <Route path="/" element={<HomeScreen />} />
                  <Route path="/product/:id" element={<ProductScreen />}/>
                  <Route path="/cart/:id?" element={<CartScreen />}/>
                  <Route path="/login" element={<LoginScreen />} />
                  <Route path="/register" element={<RegisterScreen />} />
                  <Route path="/profile" element={<ProfileScreen />} />
                  <Route path='/shipping' element={<ShippingScreen />} />
                  <Route path='/payment' element={<PaymentScreen />} />
                  <Route path='/placeorder' element={<PlaceOrder />} />
                  <Route path='/order/:id' element={<OrderScreen />} />
                  <Route path='/admin/userlist' element={<UserListScreen />} />
                  <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
                  <Route path='/admin/productlist' element={<ProductListScreen />} />
                  <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
                  <Route path='/admin/orderlist' element={<OrderListScreen />} />
                  <Route path='/search/:keyword' element={<HomeScreen />} />
                  <Route path='/page/:pageNumber' element={<HomeScreen />} />
                  <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
                  <Route path='/admin/productlist/page/:pageNumber' element={<ProductListScreen />} />
                </Routes>

                {/* <Sidecart /> */}

              </Container>
            </Col >
            {/* {cartItems.length>0 &&  
            <Col md="1" className='sidecart-component'>
              
               <Sidecart />
              
            </Col>} */}
        </Row>


      <Footer />

    </>
  )
}

export default App