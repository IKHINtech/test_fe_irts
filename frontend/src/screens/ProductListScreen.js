// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Alert'
// import Loader from '../components/Loader'
// import Paginate from '../components/Paginate'

import Button from '@mui/material/Button';
import { Typography, Stack } from '@mui/material'
// import {
//     listProducts,
//     deleteProduct,
//     createProduct,
// } from '../actions/productActions'
// import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


const ProductListScreen = ({ history, match }) => {
    // const pageNumber = match.params.pageNumber || 1

    // const dispatch = useDispatch()

    // const productList = useSelector((state) => state.productList)
    // const { loading, error, products, page, pages } = productList

    // const productDelete = useSelector((state) => state.productDelete)
    // const {
    //     loading: loadingDelete,
    //     error: errorDelete,
    //     success: successDelete,
    // } = productDelete

    // const productCreate = useSelector((state) => state.productCreate)
    // const {
    //     loading: loadingCreate,
    //     error: errorCreate,
    //     success: successCreate,
    //     product: createdProduct,
    // } = productCreate

    // const userLogin = useSelector((state) => state.userLogin)
    // const { userInfo } = userLogin

    // useEffect(() => {
    //     dispatch({ type: PRODUCT_CREATE_RESET })

    //     if (!userInfo || !userInfo.isAdmin) {
    //         history.push('/login')
    //     }

    //     if (successCreate) {
    //         history.push(`/admin/product/${createdProduct._id}/edit`)
    //     } else {
    //         dispatch(listProducts('', pageNumber))
    //     }
    // }, [
    //     dispatch,
    //     history,
    //     userInfo,
    //     successDelete,
    //     successCreate,
    //     createdProduct,
    //     pageNumber,
    // ])

    // const deleteHandler = (id) => {
    //     if (window.confirm('Are you sure')) {
    //         dispatch(deleteProduct(id))
    //     }
    // }

    // const createProductHandler = () => {
    //     dispatch(createProduct())
    // }

    return (
        <>
            <Stack direction="row" spacing={2}>
                <Typography>Product</Typography>
                <Button variant="outlined">Create Product</Button>
            </Stack>
            {/* {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : <Button></Button>} */}
        </>
    )
}


export default ProductListScreen
