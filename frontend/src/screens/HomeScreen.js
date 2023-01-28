import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import Carousel from '../components/ProductCarousel'
import { Paper } from '@mui/material'
import ResponsiveAppBar from '../components/Header'
import Product from '../components/Product'
import Message from '../components/Alert'
import { Stack, Box } from '@mui/system'
import Grid from '@mui/material/Grid';
import Loader from '../components/Loader'






const HomeScreen = () => {

    const [searchParams] = useSearchParams();
    console.log(searchParams)

    const keyword = searchParams.get('keyword')

    const pageNumber = searchParams.get('pageNumber', 1)

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        console.log(products)
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />
            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
                <Box sx={{ flexGrow: 1 }} mt={10}>
                    <Grid mt={30} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {products.map((product, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <Product product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                // <Stack direction={'row'} spacing={8} mt={2}
                // >
                //     {products.map((product) => <Box key={product._id}>

                //         <Product product={product} />

                //     </Box>)}




                // </Stack>

            )}

        </>








    )

}

export default HomeScreen
