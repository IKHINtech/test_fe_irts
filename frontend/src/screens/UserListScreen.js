import React, { useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import Message from '../components/Alert'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import { Box, } from '@mui/material'
import EnhancedTable from '../components/DataTable'
import { useNavigate } from 'react-router-dom'

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteUser(id))
        }
    }

    const handleEdit = (id) => {
        navigator(`/admin/user/${id}/edit`)
    }

    return (
        <>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='error' message={<strong>{error}</strong>}></Message>
            ) : (
                <Box>
                    <Box mb={2}>
                        <EnhancedTable rows={users} delete={deleteHandler} edit={handleEdit} />
                    </Box>
                    <Box display="flex"
                        alignItems="center"
                        justifyContent="center">
                    </Box>
                </Box>
            )}
        </>
    )
}

export default UserListScreen
