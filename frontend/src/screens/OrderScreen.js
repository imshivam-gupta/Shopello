import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

//^ Importing functionalitites from react router dom
import { Link, useNavigate,useParams } from 'react-router-dom'
import Loader from '../components/Loader';

import Message from '../components/Message';
import { createOrder, deliverOrder, getOrderDetails } from '../redux/actions/orderActions';
import { ORDER_DELIVER_RESET } from '../redux/constants/orderConstants';

const OrderScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector(state=> state.orderDetails)
  const {order,loading,error} = orderDetails
    
  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {

    if (!order || successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(id))
    }
    
  }, [dispatch,id,successDeliver])

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }



  return (
    loading ? <Loader /> : 
    error ? <Message variant='danger'>{error}</Message>:
  
    <>   

    <h1>Order {order._id}</h1>
    <Row>
        <Col md={8}>

        <ListGroup variant='flush'>

          <ListGroup.Item >
                <h2>Shipping</h2>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, 
                  {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {
                order.isDelivered? 
                <Message variant='success'>Delivered on {order.deliveredAt.substring(0,10)}</Message>:
                <Message variant='danger'>Not Delivered</Message>
                }
          </ListGroup.Item>

          {/* <br /> */}

          <ListGroup.Item >
              <h2>PAYMENT METHOD</h2>
                <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                </p>

                {
                order.isPaid? 
                <Message variant='success'>Paid on {order.paidAt}</Message>:
                <Message variant='danger'>Not Paid</Message>
                }

          </ListGroup.Item>

          {/* <br /> */}

          <ListGroup.Item >
              <h2>ORDER ITEMS</h2>

              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : ( 
                
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (

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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

            {error && 
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>}

              {loadingDeliver && <Loader />}
              {userInfo.isAdmin && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}

            </ListGroup>
          </Card>
        </Col>


      </Row>

    </>
  )
    

  
}

export default OrderScreen