import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Alert'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { useNavigate } from 'react-router-dom'
import { Stack, } from '@mui/system'
import { Box, TextField, Button } from '@mui/material'

const ProfileScreen = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return (
        <Stack direction={'row'}>
            <Box onSubmit={submitHandler}
                mt={4}
                component="form"
                sx={{
                    '& .MuiTextField-root': { mt: 3, width: '40ch' },
                }}
                noValidate={false}
                autoComplete="off"
            >

                <h1>User Profile</h1>
                {message && <Message variant='error' message={<strong>{message}</strong>} ></Message>}
                {error && <Message variant='error' message={<strong>{error}</strong>}></Message>}
                {success && <Message variant='success' message={<strong>{success}</strong>}></Message>}

                <div>
                    <TextField
                        value={name}
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
                    <Button variant="outlined" type='submit' > {loading == true ? <Loader /> : 'Update'}</Button>
                </Box>



            </Box>

        </Stack>
    )

}

export default ProfileScreen