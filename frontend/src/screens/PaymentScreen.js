import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import { FormLabel, FormControlLabel, RadioGroup, Radio, Button, FormControl } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Box, Stack } from '@mui/system'

const PaymentScreen = () => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    const navigate = useNavigate()

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Transfer Bank')

    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <Box margin={10}>
            <form onSubmit={submitHandler}>
                <Stack>
                    <FormControl margin='normal'>
                        <FormLabel id="demo-radio-buttons-group-label">Select Payment</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Transfer"
                            name="paymentMethod"
                        >
                            <FormControlLabel value="Transfer" control={<Radio />} label="Transfer Bank" />
                        </RadioGroup>
                    </FormControl>

                    <Button type='submit' variant='outline'>
                        Continue
                    </Button>
                </Stack>
            </form>
        </Box>
    )

}
export default PaymentScreen