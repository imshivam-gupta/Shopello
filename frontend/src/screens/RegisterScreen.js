import React, { useState,useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../redux/actions/userActions'


const RegisterScreen = () => {

    let navigate = useNavigate();

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')

    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

    const submitHandler = (e) => {
        e.preventDefault()

        if(password!=confirmPassword)
        (
            setMessage('Passwords do not match')
        )

        else {
            dispatch(register(name, email, password))
        }
        // dispatch(login(email, password))
    }

    const dispatch = useDispatch()
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
          navigate(redirect)
        }
      }, [navigate, userInfo, redirect])

    return (
        <FormContainer>
            <h1> Sign Up </h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
                    Register
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                Have an Account?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Login
                </Link>
                </Col>
            </Row>

    </FormContainer>
    
    )
}

export default RegisterScreen