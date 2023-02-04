import React, { useEffect,useState} from 'react'

//^ Importing functionalitites from react router dom
import { Link, useNavigate,useParams } from 'react-router-dom'

//^ Importing components from react bootstrap
import { Row, Col, ListGroup, Card, Button, Image, Form } from 'react-bootstrap'

//^ Importing own components
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';


//^ Importing from react redux
import {useSelector, useDispatch} from 'react-redux'
import { createProductReview, listProductDetails } from '../redux/actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/productConstants';



const ProductScreen = () => {


    let   navigate = useNavigate();
    const dispatch = useDispatch();

    //^ Fetching id from params
    const {id} = useParams();

    //^ Deconstructing the product Details state obtained
    const productDetails          = useSelector(state => state.productDetails);
    const {product,loading,error} = productDetails;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate         = useSelector(state => state.productReviewCreate);
    const {error:errorProductReview,success: successProductReview} = productReviewCreate;

    //^ If user wants to update cart item quantity then doing it using usestate since no sharing of state required
    const [qty,setQty]  = useState(1);
    const [rating,setRating]  = useState(0);
    const [comment,setComment]  = useState('');

    var alreadyReviewd;

    if(product && product.reviews) {alreadyReviewd = product.reviews.find(r=> r.user.toString() === userInfo._id.toString())}


    
    //^ Changing url to update qty
    const addToCountHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }
    
    //^ On component loading loading in it the product details 
    useEffect( 
        () => {  
            if(successProductReview) {
                alert('Review Submitted!')
                setRating(0)
                setComment('')
                dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
            }
            dispatch(listProductDetails(id)) }, 
        [dispatch,id,successProductReview]
    )

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
          createProductReview(id, {
            rating,
            comment,
          })
        )
      }

    
    return (
        <>
            <Link to={'/'}> Go Back </Link>

            <br /><br />

            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:
            ( <>
                <Row>
                    
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>

                    <Col md={4}>
                        <ListGroup variant='flush'>

                            <ListGroup.Item> <h3>{product.name}</h3> </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                    text={product.numReviews + ' reviews'}
                                />
                            </ListGroup.Item>

                            <ListGroup.Item> Price: ${product.price} </ListGroup.Item>

                            <ListGroup.Item> Description: {product.description} </ListGroup.Item>

                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>

                                <ListGroup.Item>
                                    <Row>
                                        <Col> Price: </Col>
                                        <Col> <strong>${product.price}</strong> </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status: </Col>
                                        <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock>0 && (
                                
                                    <ListGroup.Item className='product-cart-adder'> 
                                        <Row>
                                            <Col>Qty: </Col>
                                            <Col>
                                                <Form.Control 
                                                    as       = 'select'
                                                    value    = {qty}
                                                    onChange = { (e) => setQty(e.target.value) }
                                                >
                                                {
                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                        )
                                                    )
                                                }
                                                </Form.Control>
                                            </Col>
                                            </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                    <Button 
                                        onClick={addToCountHandler}
                                        className='btn-block' 
                                        type='Button'
                                        disabled={product.countInStock===0}
                                    >
                                        {product.countInStock >0 ? 'Add to Cart': 'Out of Stock'}
                                    </Button>
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                
                <br /><br />

                <Row>
                    <Col md={6}>
                        <h2 className='mb-3'>Reviews</h2>
                        {product && product.reviews &&  product.reviews.length===0 && <Message>No Reviews Till Now</Message>}

                        <ListGroup variant = 'flush'>
                        { product.reviews &&  product.reviews.map ( review => 
                            (
                                <ListGroup.Item key={review._id}>
                                    <div className='mb-1'>{review.name}</div>
                                    <div className=''><Rating value={review.rating} /></div>
                                    <div className='mb-2'>{review.createdAt.substring(0,10)}</div>
                                    <div className='my-1'>{review.comment} </div>
                                </ListGroup.Item>
                            )
                        )}

                {!alreadyReviewd &&
                            <ListGroup.Item>
                                <h2>Write a Customer Review</h2> <br />
                                
                                
            {errorProductReview && ( <Message variant='danger'>{errorProductReview}</Message> )}

                  {userInfo  ? (
                    <>
                       
                            <Form onSubmit={submitHandler}>

                            <Form.Group controlId='rating'>

                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                as='select'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                >

                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                                </Form.Control>

                            </Form.Group>  <br/>

                            <Form.Group controlId='comment'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                as='textarea'
                                row='3'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                ></Form.Control>
                            </Form.Group>  <br />

                            <Button type='submit' variant='primary'>
                                Submit
                            </Button>

                            </Form>
                       
                    </>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
                 }

                        </ListGroup>


                    </Col>

                </Row>
                </>
            )}
        </>
    )
}

export default ProductScreen