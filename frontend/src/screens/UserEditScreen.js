import React, { useState,useEffect } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, register, updateUser } from '../redux/actions/userActions'
import { USER_UPDATE_RESET } from '../redux/constants/userConstants'


const UserEditScreen = () => {

    let navigate = useNavigate();
    //^ Fetching id from params
    const {id} = useParams();

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin,setIsAdmin] = useState(false)
    const [message,setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate

    useEffect(() => {
        if(successUpdate) { 
            dispatch({
            type: USER_UPDATE_RESET
        }
        )
        navigate('/admin/userlist')
    }
      
    if(!user || user._id!== id) dispatch(getUserDetails(id))

    else{
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
    }
    }, [dispatch,user,id,successUpdate])


    const submitHandler = (e) => {
        e.preventDefault()
        console.log({_id:id,name,email,isAdmin})
        dispatch(updateUser({_id:id,name,email,isAdmin}))
    }


    return (
        <>
            <Link to={'/admin/userlist'}> Go Back </Link>

            <FormContainer>
                <h1>Edit User </h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading ? <Loader /> : message ? <Message variant='danger'>{message}</Message>:
                (
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

                    <Form.Group controlId='isAdmin'>
                        <Form.Label>Password</Form.Label>
                        <Form.Check
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                    </Form.Group>

                    <br />

                

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                    

                </Form>
                )
                }

  

        </FormContainer>


        </>    
    )
}

export default UserEditScreen