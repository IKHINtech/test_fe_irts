import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Alert'
import Loader from '../components/Loader'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Stack, List, ListItem, TableRow, TableCell, CardMedia, Button, Card, } from '@mui/material'
import {
    getOrderDetails,
} from '../actions/orderActions'



const OrderScreen = () => {
    const navigate = useNavigate()
    const orderId = useParams()
    console.log(orderId.id)
    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

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
        if (!userInfo) {
            navigate('/login')
        }
        console.log('aaaa')

        if (!order || order._id !== orderId.id) {
            console.log('ssss')
            dispatch(getOrderDetails(orderId.id))
        }
    }, [dispatch, orderId, order])

    return loading ? (<Loader />) : error ? (<Message variant='error' message={<strong>{error}</strong>}></Message>) : (
        <>
            <Box margin={4}>
                <Stack direction={'row'} spacing={2}>

                    <Card sx={{ display: 'flex' }} >
                        <List component={"nav"}>

                            <ListItem>
                                <Stack>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Address :</strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                        {order.shippingAddress.postalCode},{' '}
                                        {order.shippingAddress.country}
                                    </p>
                                </Stack>

                            </ListItem>
                            <ListItem>
                                <Stack>
                                    <h2>Payment Method</h2>
                                    <strong> Method :</strong>
                                    {order.paymentMethod}
                                </Stack>

                            </ListItem>

                            {order.orderItems.map((item, index) => (
                                <ListItem key={index}>

                                    <TableRow sx={{ width: 600 }} >
                                        <TableCell><CardMedia
                                            component="img"
                                            sx={{ width: 50 }}
                                            src={item.image}
                                        /> </TableCell>
                                        <TableCell><Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </TableCell>
                                        <TableCell> {item.qty} x Rp. {item.price} = Rp. {item.qty * item.price}</TableCell>
                                        <TableCell>

                                        </TableCell>


                                    </TableRow>
                                </ListItem>
                            ))}

                        </List>
                    </Card>

                    <Card sx={{ width: 300 }}>
                        <List>

                            <ListItem>


                                <h2>
                                    Order Summary
                                </h2>

                            </ListItem>
                            <ListItem>
                                <TableRow>
                                    <TableCell>
                                        Shipping
                                    </TableCell>
                                    <TableCell>
                                        Rp. {order.itemsPrice}
                                    </TableCell>
                                </TableRow>
                            </ListItem>
                            <ListItem>
                                <TableRow>
                                    <TableCell>
                                        Tax
                                    </TableCell>
                                    <TableCell>
                                        Rp. {order.taxPrice}
                                    </TableCell>
                                </TableRow>
                            </ListItem>
                            <ListItem>
                                <TableRow>
                                    <TableCell>
                                        Total
                                    </TableCell>
                                    <TableCell>
                                        Rp. {order.totalPrice}
                                    </TableCell>
                                </TableRow>
                            </ListItem>

                        </List>

                    </Card>

                </Stack>

            </Box>

        </>)



}
export default OrderScreen