import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { login } from '../actions/userActions'
import TextField from '@mui/material/TextField';
import { Box, Card, Button, Typography } from "@mui/material"
import Loader from '../components/Loader'
import Message from '../components/Alert';



const LoginScreen = ({ history }) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation();

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'


    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))

    }


    return (
        <Card sx={{ margin: 5 }}>
            <Box onSubmit={submitHandler}
                mt={4}
                component="form"
                sx={{
                    '& .MuiTextField-root': { mt: 3, width: '45ch' },
                }}
                noValidate={false}
                autoComplete="off"
            >

                {error && <Box margin={2}>

                    <Message variant='error' message={<strong>{error}</strong>}></Message>
                </Box>
                }


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
                    <Button variant="outlined" type='submit' >{loading == true ? <Loader /> : 'Login'} </Button>
                </Box>



                <Box>
                    <Typography>Belum punya akun? </Typography>
                    <Typography>
                        <Link to={'/register'}>Daftar disini</Link>

                    </Typography>
                </Box>
            </Box>

        </Card>
    )
}

export default LoginScreen