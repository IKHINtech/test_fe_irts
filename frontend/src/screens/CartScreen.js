import React, { useEffect } from 'react'
import { Link, useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Alert'
import { addToCart, removeFromCart } from '../actions/cartActions'
import DeleteIcon from '@mui/icons-material/Delete';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';

import { Box, Stack } from '@mui/system'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { List, ListItem, Typography, TableCell, TableRow, Button, IconButton } from '@mui/material'

const CartScreen = () => {
    const [searchParams] = useSearchParams();
    const productId = useParams()
    const navigate = useNavigate()


    const qty = searchParams.get('qty') || 1


    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId.id, qty))
        }
    }, [dispatch, productId.id, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    return (
        <>
            <h1>Shopping Cart</h1>
            <Box margin={4}>
                <Stack direction={'row'} spacing={2}>
                    {cartItems.length === 0 ? (
                        <Typography> Your cart is empty <Link to='/'>Go Back</Link></Typography>
                    ) : (
                        <Card sx={{ display: 'flex' }} >


                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                </CardContent>
                            </Box>
                            <List component={"nav"}>
                                {cartItems.map((item) => (
                                    <ListItem key={item.product}>

                                        <TableRow sx={{ width: 600 }} >
                                            <TableCell><CardMedia
                                                component="img"
                                                sx={{ width: 50 }}
                                                src={item.image}
                                            /> </TableCell>
                                            <TableCell><Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </TableCell>
                                            <TableCell>Rp. {item.price}</TableCell>
                                            <TableCell>
                                                <FormControl fullWidth>
                                                    <InputLabel id="simple-select-label">Qty</InputLabel>
                                                    <Select
                                                        labelId="simple-select-label"
                                                        id="simple-select"
                                                        value={item.qty}
                                                        label="qty"
                                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                    >
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell>

                                                <IconButton onClick={() => removeFromCartHandler(item.product)}>
                                                    <DeleteIcon />
                                                </IconButton>

                                            </TableCell>

                                        </TableRow>
                                    </ListItem>
                                ))}
                            </List>
                        </Card>)}

                    {cartItems.length === 0 ? (<Box></Box>) : <Card sx={{ width: 300 }}>
                        <List>

                            <ListItem>
                                <Stack>

                                    <h2>
                                        Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                    </h2>
                                    <Typography>Rp.
                                        {cartItems
                                            .reduce((acc, item) => acc + item.qty * item.price, 0)
                                            .toFixed(2)}</Typography>
                                </Stack>
                            </ListItem>
                            <ListItem>
                                <Button variant="contained" onClick={checkoutHandler}>
                                    Procces To Checkout
                                </Button>
                            </ListItem>
                        </List>

                    </Card>}

                </Stack>

            </Box>

        </>
    )

}

export default CartScreen