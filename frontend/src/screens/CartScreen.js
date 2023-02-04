import React,{ useEffect} from 'react'

//^ Importing functionalitites from react router dom
import { useSearchParams, Link, useNavigate,useParams } from 'react-router-dom'

//^ Importing components from react bootstrap
import { Row, Col, ListGroup,Image,Form,Button, Card } from 'react-bootstrap'

//^ Importing from react redux
import {useSelector, useDispatch} from 'react-redux'
import { addToCart, removeFromCart } from '../redux/actions/cartActions';

//^ Icon import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/fontawesome-free-solid'
import Message from '../components/Message';


const CartScreen = () => {

  let   navigate = useNavigate();
  const dispatch = useDispatch();

  //^ Fetching id from params
  const {id} = useParams();
  
  let   [searchParams] = useSearchParams();
  const para           = []
  for (const entry of searchParams.entries()) {
    const [param, value] = entry;
    para.push(value);
  }
  const search_qty = para[0];

  //^ Deconstructing the product Details state obtained
  const cart        = useSelector(state => state.cart);
  const {cartItems} = cart;

  //^ On component loading loading in it the product details 
  useEffect( 
    () => {  dispatch(addToCart(id,search_qty)) },
    [dispatch,search_qty,id]
  )

  const removeFromCartHandler = (id) =>{
    dispatch( removeFromCart(id))
  }

  const checkOutHandler =() =>{
    navigate(`/login?redirect=/shipping`)
  }

  const round_off = (num) => num.toFixed(2);

  const goBack = () => {
		navigate(-1) 
	}

  return (
    <>
      <Row>
        
        <Col md={8}>
          <div className = 'go-back' onClick = {goBack}>Go Back</div>
          <h1>Shopping Cart</h1>

          {cartItems.length===0 ? <Message> Your Cart is empty <Link to='/'> Go Back</Link> </Message>: 
          (
              <ListGroup variant = 'flush'>
                { cartItems.map ( item => (
      
                  <ListGroup.Item key={item.product}>
                    <Row>

                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>

                      <Col md={4}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>

                      <Col md={2}>
                        ${item.price}
                      </Col>

                      <Col md={2}>

                        <Form.Control 
                          as='select' 
                          value={item.qty} 
                          onChange= { (e) => dispatch(addToCart(item.product,Number(e.target.value))) }
                        >

                          {
                            [...Array(item.countInStock).keys()].map(
                              (x) => ( <option key={x+1} value={x+1}>{x+1}</option> )
                            )
                          }

                        </Form.Control>

                      </Col>

                      <Col md={2}>
                        <Button 
                          type='button' 
                          variant='light'
                          onClick={ ()=> removeFromCartHandler(item.product) }
                        > 
                        <i className='fas fa-trash' />
                        </Button>
                      </Col>

                    </Row>
                  </ListGroup.Item>

                ))}
            </ListGroup>
          )}

        </Col>

        <Col md={4}>
          <Card className='subtotal-card'>
            <ListGroup variant='flush'>
              <ListGroup.Item>

                <div className='order-has-gift '>

                  {
                    Number(cartItems.reduce( (acc, curr) => acc + Number(curr.qty)*Number(curr.price), 0))>500 &&
                    <div> <FontAwesomeIcon icon={faCheckCircle} style={{color:'green'}}/>  Your order is eligible for FREE Delivery</div> 
                  }

                  <br />
                

                  Subtotal  (
                  {  cartItems.reduce( (acc, curr) => acc + Number(curr.qty), 0)    }   items): &nbsp;
                  
                  <b>
                    ${  
                      round_off(
                        cartItems.reduce( (acc, curr) => acc + Number(curr.qty)*Number(curr.price), 0)
                      )
                    }
                  </b>

                </div>

                <br />
          

                <Button 
                  variant="warning" 
                  type='button' 
                  className='btn-block'
                  disabled={cartItems.length===0}
                  onClick={checkOutHandler} 
                > 
                  Proceed to Buy 
                </Button>
                
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

      </Row>
    </>
  )
}

export default CartScreen