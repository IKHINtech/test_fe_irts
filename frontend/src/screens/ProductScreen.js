import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
// import Rating from '../components/Rating'
// import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
    listProductDetails,
    createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { Button, CardHeader, Divider, List, ListItem, Paper, TableCell, TableRow } from '@mui/material'
import { Stack } from '@mui/system'


const ProductScreen = ({ history, match, }) => {
    const theme = useTheme();
    let { id } = useParams();

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
        }
        if (!product._id || product._id !== id) {
            dispatch(listProductDetails(id))
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
    }, [dispatch, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createProductReview(match.params.id, {
                rating,
                comment,
            })
        )
    }

    return (
        <>
            <Box margin={4} >

                <Link to='/'>
                    <Button variant="outlined" > Go Back</Button>
                </Link>

                <Box mt={2} >

                    <Stack direction={'row'} spacing={2}>
                        <Card sx={{ display: 'flex' }} >


                            <CardMedia
                                component="img"
                                sx={{ width: 430 }}
                                src={product.product_image_url}
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {product.product_name}
                                    </Typography>
                                    <Typography variant="h5" color="text.secondary" component="div">
                                        Rp. {product.product_price}
                                    </Typography>
                                </CardContent>

                            </Box>
                        </Card>
                        <Card sx={{ width: 250 }} >


                            <List component="nav" >
                                <ListItem>
                                    <TableRow>
                                        <TableCell>Harga :</TableCell>
                                        <TableCell>Rp. {product.product_price}</TableCell>

                                    </TableRow>
                                </ListItem>
                                <ListItem>
                                    <TableRow>
                                        <TableCell>Status :</TableCell>
                                        <TableCell>{product.product_info}</TableCell>

                                    </TableRow>
                                </ListItem>

                                <ListItem>
                                    <TableRow>
                                        <TableCell>Qty :</TableCell>
                                        <TableCell>

                                            <FormControl fullWidth>
                                                <InputLabel id="simple-select-label">Qty</InputLabel>
                                                <Select
                                                    labelId="simple-select-label"
                                                    id="simple-select"
                                                    value={qty}
                                                    label="qty"
                                                    onChange={(e) => setQty(e.target.value)}
                                                >
                                                    <MenuItem value={1}>1</MenuItem>
                                                    <MenuItem value={2}>2</MenuItem>
                                                    <MenuItem value={3}>3</MenuItem>
                                                </Select>
                                            </FormControl>

                                        </TableCell>

                                    </TableRow>
                                </ListItem>
                                <Divider></Divider>


                            </List>
                        </Card>


                    </Stack>
                </Box>

            </Box>
        </>
    )

}

export default ProductScreen