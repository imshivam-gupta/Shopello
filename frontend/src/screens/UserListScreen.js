import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';

import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { deleteUser, listUsers } from '../redux/actions/userActions';

const UserListScreen = () => {

    const dispatch = useDispatch();
    const usersList = useSelector(state=> state.usersList)
    const {loading,error,users} = usersList;

    const navigate = useNavigate();

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin;

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin)  dispatch(listUsers())
        else navigate('/')
    }
    ,
    [dispatch,navigate,userInfo,successDelete])


    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')) dispatch(deleteUser(id))
    }

  return (
    <>
        <h1> Users </h1>
        {
            loading ? (<Loader/>) : error ? 
            (<Message variant='danger'>Error Occured</Message>):
            (
                <Table bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th style={{textAlign:'center'}}>ADMIN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user =>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                
                                <td style={{textAlign:'center'}}>
                                    {user.isAdmin ? (
                                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                                    ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}
                                </td>

                                <td>
                                    <Link to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                        </Button>
                                    </Link>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
        }
    </>
  )
}

export default UserListScreen