import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { createOrder } from '../redux/actions/orderActions';

const PlaceOrder = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state=> state.cart)

  const {shippingAddress,cartItems} = cart

  if(!shippingAddress) navigate('/shipping')
  else if(!cart.paymentMethod) navigate('/payment')

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.shippingPrice = addDecimals(cart.itemsPrice > 500 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector(state=> state.orderCreate)
  const {order,success,error} = orderCreate

  useEffect(() => {
    if(success){
      navigate(`/order/${order._id}`)
    }
  }, [navigate, success])


  // useEffect(()=>{
  //   if(success){
  //     navigate(`/order/${order._id}`)
  //   }
  // },[navigate,success])


  const placeOrderHandler = () => {
    console.log(cart.cartItems)
    dispatch(createOrder
      (
        {
          orderItems: cart.cartItems,
          shippingAddress: shippingAddress,
          paymentMethod:cart.paymentMethod,
          itemsPrice:cart.itemsPrice,
          taxPrice:cart.taxPrice,
          shippingPrice:cart.shippingPrice,
          totalPrice:cart.totalPrice,
        }
      ));
  }





  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>

        <ListGroup variant='flush'>

          <ListGroup.Item >
                <h2>Shipping</h2>
                <p>
                  <strong>Address: </strong>
                  {cart.shippingAddress.address}, 
                  {cart.shippingAddress.city}{' '}
                  {cart.shippingAddress.postalCode},{' '}
                  {cart.shippingAddress.country}
                </p>
          </ListGroup.Item>

          {/* <br /> */}

          <ListGroup.Item >
              <h2>PAYMENT METHOD</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
          </ListGroup.Item>

          {/* <br /> */}

          <ListGroup.Item >
              <h2>ORDER ITEMS</h2>

              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : ( 
                
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => (

                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

              )}


          </ListGroup.Item>

          <br />

        </ListGroup>

        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>

              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>


      </Row>
    </>
  )
}

export default PlaceOrder