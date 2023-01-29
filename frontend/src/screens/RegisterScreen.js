import { register } from '../actions/userActions'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from "@mui/material"




import Loader from '../components/Loader'
import Message from '../components/Alert'
import { Link, useLocation } from 'react-router-dom'

const RegisterScreen = () => {
    const { location } = useLocation();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
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

            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <div>
                <TextField
                    value={email}
                    required
                    // error
                    id="name"
                    label="Name"
                    defaultValue=""
                    placeholder='Enter Name'
                    onChange={(e) => setName(e.target.value)}

                />

            </div>
            <div>
                <TextField
                    value={email}
                    required
                    // error
                    id="email"
                    label="Email"
                    defaultValue=""
                    placeholder='Enter Email'
                    onChange={(e) => setEmail(e.target.value)}

                />

            </div>
            <div >
                <TextField

                    required
                    value={password}
                    placeholder='Enter Password'

                    id="password"
                    label="Password"
                    defaultValue=""
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}

                />

            </div>
            <div >
                <TextField

                    required
                    value={confirmPassword}
                    placeholder='Confirm Password'

                    id="confirmPassword"
                    label="Confirm Password"
                    defaultValue=""
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}

                />

            </div>
            <Box mt={4}

                mb={4}>
                <Button variant="outlined" type='submit' w>Register</Button>
            </Box>



        </Box>
    )


}

export default RegisterScreen