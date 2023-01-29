import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@mui/material/Button';

import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Alert';
import { Box, Stack } from "@mui/material"
import Loader from '../components/Loader'


import TextField from '@mui/material/TextField';
import {
    listProducts,
    createProduct,
} from '../actions/productActions'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogCreateProduct() {

    const [product_name, setName] = useState('')
    const [product_price, setPrice] = useState(0)
    const [product_image_url, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [product_info, setInfo] = useState('')
    const [real_pdp_url, setPdpUrl] = useState('')
    const [message, setMessage] = useState(null)


    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
    } = productCreate


    const createProductHandler = (e) => {
        e.preventDefault()
        if (userInfo == null) {
            navigate('/login')
        } else {
            dispatch(createProduct(
                {
                    product_name,
                    product_price,
                    product_image_url,
                    brand,
                    product_info,
                    real_pdp_url,
                }
            ),)
        }


        navigate('/admin/productlist/')

    }



    return (
        <div>

            <Box onSubmit={createProductHandler}
                mt={4}
                component="form"
                sx={{
                    '& .MuiTextField-root': { mt: 3, width: '60ch' },
                }}
                noValidate={false}
                autoComplete="off"

            >
                <h1>Tambah Produk</h1>
                {message && <Message variant='error' message={<strong>{message}</strong>} ></Message>}
                {errorCreate && <Message variant='error' message={<strong>{errorCreate}</strong>}></Message>}

                <Stack spacing={2}>
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
                            onChange={function (e) {
                                setPdpUrl(e.target.value)
                            }
                            }
                        />

                    </div>
                </Stack>

            </Box>
            <Box mt={4}

                mb={4}>
                <Button variant="outlined" type='submit' onClick={createProductHandler} > {loadingCreate == true ? <Loader /> : 'Tambah'}</Button>
            </Box>
        </div>
    );
}

