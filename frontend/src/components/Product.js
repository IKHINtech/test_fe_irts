import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'

import { Button, CardActionArea, CardActions, Box, CardHeader } from '@mui/material';

export default function Product({ product }) {
    return (
        <Card sx={{ maxWidth: 230 }}>
            <CardHeader
                action={
                    product.product_info.toUpperCase() == 'STOK HABIS' ? <Box></Box> : <Button variant="contained" size="small" color="primary" disabled={product.product_info.toUpperCase() === "STOK HABIS"}  >
                        {product.product_info}
                    </Button>
                }
            />
            <Link to={`/product/${product._id}`}>
                <CardMedia
                    src={product.product_image_url}
                    component="img"
                    alt={product.product_name}
                />
            </Link>
            <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                    {product.product_name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Rp. {product.product_price}
                </Typography>
            </CardContent>

            <CardActions>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {product.brand}
                </Typography>
            </CardActions>
        </Card>
    );
}


