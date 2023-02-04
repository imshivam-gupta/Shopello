import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';

import { useDispatch,useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listOrders } from '../redux/actions/orderActions';
import { createProduct, deleteProduct, listProducts } from '../redux/actions/productActions';
import { deleteUser, listUsers } from '../redux/actions/userActions';
import { PRODUCT_CREATE_RESET } from '../redux/constants/productConstants';

const OrderListScreen = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const orderListAll = useSelector(state=> state.orderListAll)
    const {loading,error,orders} = orderListAll

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    useEffect(()=>{
        if(userInfo && userInfo.isAdmin) dispatch(listOrders())
        else navigate('/')
    }
    ,
    [dispatch,navigate,userInfo])


  return (
    <>
 
        <h1>Orders</h1>

        {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table   bordered hover responsive className='table-sm'>
          <thead>
            <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (

               <tr key={order._id}>
                
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice}</td>
                        <td style={{textAlign:'center'}}>
                            {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                            ) : (
                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                            )}
                        </td>
                        <td style={{textAlign:'center'}}>
                            {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                            ) : (
                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                            )}
                        </td>
                        <td style={{textAlign:'center'}}>
                            <Link to={`/order/${order._id}`}>
                                Details
                            </Link>
                        </td>

             </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen