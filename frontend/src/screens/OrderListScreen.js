import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Alert'
import Loader from '../components/Loader'
import { listOrders, listMyOrders } from '../actions/orderActions'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { Box, } from '@mui/system'
import { Button, Table } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';

const OrderListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location)

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (location.pathname == '/orders') {
            dispatch(listMyOrders())

        } else {
            if (userInfo && userInfo.isAdmin) {
                dispatch(listOrders())
            } else {
                navigate('/login')
            }

        }

    }, [dispatch, userInfo])

    return (
        <>
            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='error' message={<strong>{error}</strong>}></Message>
            ) : <Box>
                <Box mb={2}>
                    <Table >
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
                                    <td>Rp. {order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <ClearIcon />
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <ClearIcon />)}
                                    </td>
                                    <td>
                                        <Link to={`/order/${order._id}`}>
                                            <Button variant='outline' color='primary'>
                                                Details
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table></Box>

            </Box>}

        </>
    )

}
export default OrderListScreen