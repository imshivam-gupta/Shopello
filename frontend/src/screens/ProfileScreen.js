import React, { useState,useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form,Button,Row,Col, Table} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, register, updateUserProfile } from '../redux/actions/userActions'
import { listMyOrders } from '../redux/actions/orderActions'


//^ Icon import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa } from '@fortawesome/fontawesome-free-solid'


const ProfileScreen = () => {

    const [name,setName]                       = useState('');
    const [email,setEmail]                     = useState('');
    const [password,setPassword]               = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [message,setMessage]                 = useState(null);

    const dispatch = useDispatch();

    const userDetails              = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails


    const ordersList              = useSelector((state) => state.ordersList)
    const { loading:loadingOrders , error:errorOrders , orders } = ordersList


    const userLogin    = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile    = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    let navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
          navigate('/login')
        }
        else {
            if(!user)
        {
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        }
            else{
                setName(user.name)
                setEmail(user.email)
            }
        }
            
    //         else{
    //             setName(user.name)
    //             setEmail(user.email)
    //         }
    //     }
      }, [navigate, userInfo, dispatch,user,listMyOrders])


    const submitHandler = (e) => {
        e.preventDefault()

        if(password!=confirmPassword)
        (
            setMessage('Passwords do not match')
        )

        else {
            dispatch(updateUserProfile({id:user._id,name,email,password}))
        }

    }

    return (
        <Row>
            <Col md={3} className='px-4'>
            <h2> User Profile</h2>
            <br />
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <br />

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <br />

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <br />

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='confirmPassword'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <br />

                <Button type='submit' variant='primary'>
                    Update Profile
                </Button>

            </Form>

            </Col>

            <Col md={9} className='px-5'>
                <h2>My Orders</h2>
                <br />
                {
                    loadingOrders? <Loader /> : errorOrders ? <Message variant='red'>{error}</Message>:
                    (
                        <Table bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0,10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td  style={{ color: 'red',textAlign:'center' }}>{order.isPaid
                                            ? (order.paidAt.substring(0,10)) :
                                            <i className='fas fa-times' />
                                        }</td>
                                        <td  style={{ color: 'red',textAlign:'center' }}>{order.isDelivered
                                            ? (order.deliveredAt.substring(0,10)) :
                                            <i className='fas fa-times' />
                                        }</td>

                                        <td >
                                            <Link to={`/order/${order._id}`}>Details</Link>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
                }
            </Col>



        </Row>    
    )
}

export default ProfileScreen