import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Box, Stack } from "@mui/material"


import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {

    const navigate = useNavigate()


    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }

    return (
        <form onSubmit={submitHandler}>

            <Box
                mt={4}
                // component="form"
                sx={{
                    '& .MuiTextField-root': { mt: 3, width: '60ch' },
                }}
                noValidate={false}
                autoComplete="off"

            >
                <h1>Shipping</h1>

                <Stack spacing={2}>
                    <div>
                        <TextField
                            value={address}
                            required
                            id="address"
                            label="Address"
                            defaultValue=""
                            placeholder='Enter Address'
                            onChange={(e) => setAddress(e.target.value)}

                        />

                    </div>
                    <div>
                        <TextField
                            value={city}
                            required
                            // error
                            id="city"
                            label="City"
                            defaultValue=""
                            placeholder='Enter City'
                            onChange={(e) => setCity(e.target.value)}

                        />

                    </div>
                    <div >
                        <TextField

                            required
                            value={postalCode}
                            placeholder='Enter Kode Pos'

                            id="kode_pos"
                            label="Kode Pos"
                            defaultValue=""
                            onChange={(e) => setPostalCode(e.target.value)}

                        />

                    </div>
                    <div >
                        <TextField

                            required
                            value={country}
                            placeholder='Enter Country'

                            id="country"
                            label="Country"
                            defaultValue=""
                            onChange={(e) => setCountry(e.target.value)}

                        />

                    </div>
                </Stack>

            </Box>
            <Box mt={4}

                mb={4}>
                <Button variant="outlined" type='submit'  >Continue</Button>
            </Box>
        </form>
    );


}
export default ShippingScreen