
import { Box, Button, Card, CardMedia } from '@mui/material'

function Item(props) {


    return (
        <Box>
            <Card>
                <CardMedia component="img"
                    sx={{ width: 1 }} src={props.item.image} />
            </Card>
        </Box>
    )
}

export default Item