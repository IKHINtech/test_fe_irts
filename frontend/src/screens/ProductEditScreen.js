import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { useNavigate, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { Box, Button } from "@mui/material"



import Message from '../components/Alert'
import Loader from '../components/Loader'


const ProductEditScreen = () => {
    const productId = useParams();
    const [product_name, setName] = useState('')
    const [product_price, setPrice] = useState(0)
    const [product_image_url, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [product_info, setInfo] = useState('')
    const [real_pdp_url, setPdpUrl] = useState('')

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
            if (!product.product_name || product._id !== productId.id) {
                dispatch(listProductDetails(productId.id))
            } else {
                setName(product.product_name)
                setPrice(product.product_price)
                setImage(product.product_image_url)
                setBrand(product.brand)
                setInfo(product.product_info)
                setPdpUrl(product.real_pdp_url)
            }
        }
    }, [dispatch, productId, product, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateProduct({
                _id: productId.id,
                product_name,
                product_price,
                product_image_url,
                brand,
                product_info,
                real_pdp_url,
            })
        )
    }

    return (
        <Box onSubmit={submitHandler}
            mt={4}
            component="form"
            sx={{
                '& .MuiTextField-root': { mt: 3, width: '60ch' },
            }}
            noValidate={false}
            autoComplete="off"
        >

            <h1>Edit Product</h1>
            {errorUpdate && <Message variant='error' message={errorUpdate}></Message>}
            {loadingUpdate && <Loader />}
            <div>
                <TextField
                    value={product_name}
                    required
                    // error
                    id="produc_name"
                    label="Product Name"
                    defaultValue=""
                    placeholder='Enter Product Name'
                    onChange={(e) => setName(e.target.value)}

                />

            </div>
            <div>
                <TextField
                    value={product_price}
                    required
                    // error
                    id="product_price"
                    label="Product Price"
                    defaultValue=""
                    type='number'
                    placeholder='Enter Product Price'
                    onChange={(e) => setPrice(e.target.value)}

                />

            </div>
            <div >
                <TextField

                    required
                    value={product_image_url}
                    placeholder='EnterImage URL'

                    id="image_url"
                    label="Product Image Url"
                    defaultValue=""
                    onChange={(e) => setImage(e.target.value)}

                />

            </div>
            <div >
                <TextField

                    required
                    value={brand}
                    placeholder='Enter Brand'

                    id="band_Product"
                    label="Brand Product"
                    defaultValue=""
                    onChange={(e) => setBrand(e.target.value)}

                />

            </div>
            <div >
                <TextField

                    required
                    value={product_info}
                    placeholder='Enter Info'

                    id="product_info"
                    label="Info Product"
                    defaultValue=""
                    onChange={(e) => setInfo(e.target.value)}

                />

            </div>

            <div >
                <TextField

                    required
                    value={real_pdp_url}
                    placeholder='Product URL'

                    id="product_url"
                    label="Product URL"
                    defaultValue=""
                    onChange={(e) => setPdpUrl(e.target.value)}

                />

            </div>
            <Box mt={4}

                mb={4}>
                <Button variant="outlined" type='submit' >Update</Button>
            </Box>



        </Box>
    )

}

export default ProductEditScreen