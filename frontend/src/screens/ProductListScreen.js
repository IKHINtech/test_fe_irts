import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Alert'
import Loader from '../components/Loader'
import BasicPagination from '../components/Paginate'
import BasicTable from '../components/BasicTable'



import Button from '@mui/material/Button';
import {
    listProducts,
    deleteProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'

import Grid from '@mui/material/Grid';



const ProductListScreen = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const pageNumber = searchParams.get('pageNumber') || 1

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, pages, } = productList

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

        } else {
            dispatch(listProducts('', pageNumber))
        }
    }, [
        dispatch,
        // history,
        userInfo,
        successDelete,
        createdProduct,
        pageNumber,
    ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProduct(id))
        }
    }


    const handleEdit = (id) => {
        navigate(`/admin/product/${id}/edit`)
    }

    const handleAdd = () => {
        navigate('/admin/product/add')
    }

    return (
        <>
            <Grid mt={4} mb={4} container justifyContent="flex-end">
                <Button variant="outlined" onClick={handleAdd} >
                    Tambah Produk
                </Button>

            </Grid>


            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='error' message={<strong>{errorDelete}</strong>}></Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='error' message={<strong>{errorCreate}</strong>}></Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='error' message={<strong>{error}</strong>}></Message>
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
