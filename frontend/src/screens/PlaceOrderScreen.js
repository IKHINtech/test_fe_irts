import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import { ListItem, TableCell, TableRow, Box, Stack, Card, List, CardMedia, Button } from '@mui/material'

const PlaceOrderScreen = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    if (!cart.shippingAddress.address) {
        navigate('/shipping')
    } else if (!cart.paymentMethod) {
        navigate('/payment')
    }
    //   Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2)

    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, success, } = orderCreate

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: ORDER_CREATE_RESET })
        }
        // eslint-disable-next-line
    }, [success])

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        )
    }
    return (
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
                                        {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                                        {cart.shippingAddress.postalCode},{' '}
                                        {cart.shippingAddress.country}
                                    </p>
                                </Stack>

                            </ListItem>
                            <ListItem>
                                <Stack>
                                    <h2>Payment Method</h2>
                                    <strong> Method :</strong>
                                    {cart.paymentMethod}
                                </Stack>

                            </ListItem>

                            {cart.cartItems.map((item, index) => (
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
                                        Rp. {cart.itemsPrice}
                                    </TableCell>
                                </TableRow>
                            </ListItem>
                            <ListItem>
                                <TableRow>
                                    <TableCell>
                                        Tax
                                    </TableCell>
                                    <TableCell>
                                        Rp. {cart.taxPrice}
                                    </TableCell>
                                </TableRow>
                            </ListItem>
                            <ListItem>
                                <TableRow>
                                    <TableCell>
                                        Total
                                    </TableCell>
                                    <TableCell>
                                        Rp. {cart.totalPrice}
                                    </TableCell>
                                </TableRow>
                            </ListItem>
                            <ListItem>
                                <Button variant="contained" onClick={placeOrderHandler}>
                                    Procces To Checkout
                                </Button>
                            </ListItem>
                        </List>

                    </Card>

                </Stack>

            </Box>

        </>
    )
}
export default PlaceOrderScreen