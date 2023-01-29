import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { updateUser, getUserDetails } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'


import TextField from '@mui/material/TextField';
import { Box, Button } from "@mui/material"



import Message from '../components/Alert'
import Loader from '../components/Loader'




const UserEditScreen = () => {

    const userId = useParams();

    const [name, setName] = useState('')
    const [email, setEmail] = useState(0)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userDetail = useSelector((state) => state.userDetails)
    const { user } = userDetail
    const userUpdate = useSelector((state) => state.userUpdate)
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate, } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId.id) {
                dispatch(getUserDetails(userId.id))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }

    }, [dispatch, userId, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateUser({
                name, email, _id: userId.id, isAdmin: user.isAdmin
            })
        )
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

            <h1>Edit User</h1>
            {errorUpdate && <Message variant='error' message={errorUpdate}></Message>}
            {loadingUpdate && <Loader />}
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
            <Box mt={4}

                mb={4}>
                <Button variant="outlined" type='submit' >Update</Button>
            </Box>



        </Box>
    )

}

export default UserEditScreen