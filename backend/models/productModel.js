import mongoose from 'mongoose'
const productSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        product_name: {
            type: String,
            required: true,
        },
        product_price: {
            type: Number,
            required: true
        },
        brand: {
            type: String,
            required: false,
        },
        product_image_url: {
            type: String,
            required: true,
        },
        product_info: {
            type: String,
            required: false,
        },
        real_pdp_url: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product