import React,{useState} from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod, saveShippingAddress } from '../redux/actions/cartActions'
import {Link, useNavigate} from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'


const PaymentScreen = () => {

    const navigate = useNavigate();

    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress) navigate('/shipping')

    const [paymentMethod,setPaymentMethod] = useState('Paypal')

    const dispatch = useDispatch();

    const SubmitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
        <h1>PAYMENT METHOD</h1>
        <Form onSubmit={SubmitHandler}>

            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
            </Form.Group>

            <Col>
                <Form.Check
                    type='radio'
                    label='Paypal or Credit Card'
                    id='Paypal'
                    name='paymentMethod'
                    value='Paypal'
                    checked
                    onChange={(e)=> setPaymentMethod(e.target.value)}
                />



            
            </Col>

            <Button type='submit' variant='primary' className='my-3'>
                Continue
            </Button>

        </Form>
      </FormContainer>
    )
}

export default PaymentScreen