import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom'
import { useDispatch, } from 'react-redux'


import {
    listProducts,
} from '../actions/productActions'

export default function BasicPagination({ count, pageData }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [page, setPage] = React.useState(1);

    const handleChange = (event, value) => {
        navigate(`/admin/productlist/?pageNumber=${value}`)
        setPage(value)
        dispatch(listProducts('', value))


    };


    return (
        <Pagination count={count} page={pageData} onChange={handleChange} />

    );
}