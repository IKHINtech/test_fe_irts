import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Alert'
import Loader from '../components/Loader'
import BasicPagination from '../components/Paginate'
import BasicTable from '../components/BasicTable'



import Button from '@mui/material/Button';
import { Typography, Stack } from '@mui/material'
import {
    listProducts,
    deleteProduct,
    createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'



const ProductListScreen = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const pageNumber = searchParams.get('pageNumber') || 1

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages, total } = productList

    const productDelete = useSelector((state) => state.productDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login')
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))
        }
    }, [
        dispatch,
        // history,
        userInfo,
        successDelete,
        successCreate,
        createdProduct,
        pageNumber,
    ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }
    const handleEdit = (id) => {
        console.log(id)
        navigate(`/admin/product/${id}/edit`)
    }

    return (
        <>
            <Stack direction="row" spacing={2}>
                <Typography>Product</Typography>
                <Button variant="outlined">Create Product</Button>
            </Stack>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Box>
                    <Box mb={2}>
                        <BasicTable rows={products} delete={deleteHandler} edit={handleEdit} />
                    </Box>
                    <Box display="flex"
                        alignItems="center"
                        justifyContent="center">
                        <BasicPagination count={pages} page={pageNumber} />
                    </Box>
                </Box>
            )}
        </>
    )
}


export default ProductListScreen
