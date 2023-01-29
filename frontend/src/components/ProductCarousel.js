


import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Item from "./Item"

function ProductCarousel() {

    var items = [
        {
            image: "https://storage.googleapis.com/eraspacelink/pmp/production/banners/images/zcPRxIwNxJML9WWpGSxsFC0KPTGl2LzmVkLjDjEj.jpg",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            image: "https://storage.googleapis.com/eraspacelink/pmp/production/banners/images/JhDfDSPTo5R7Ye4UwcjONHWrv0LDHwBHnNfxdjVz.jpg",
            description: "Hello World!"
        }, {
            image: "https://storage.googleapis.com/eraspacelink/pmp/production/banners/images/0EyNx9McmUqIWz5ZwdxolWqVUWKApwuKc7Y6OLvf.jpg",
            description: "Hello World!"

        }
    ]


    return (
        <Carousel>
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}



export default ProductCarousel