import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { login } from '../actions/userActions'
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from "@mui/material"



const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { location } = useLocation();
    console.log(location);

    const dispatch = useDispatch()

    // const redirect = location.search ? location.search.split('=')[1] : '/'


    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin
    useEffect(() => {
        // if (userInfo) {
        //     history.push(redirect)
        // }
    }, [history, userInfo,])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
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
            <Typography>
                Jika anda memiliki akun, masuk dengan email anda.
            </Typography>

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
            <Box mt={4}

                mb={4}>
                <Button variant="outlined" type='submit' w>Login</Button>
            </Box>

            <Box>
                <Typography>Belum punya akun? </Typography>
                <Typography>
                    <Link to={'/register'}>Daftar disini</Link>

                </Typography>
            </Box>
        </Box>


    )
}

export default LoginScreen