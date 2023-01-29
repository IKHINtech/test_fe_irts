import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/system';


export default function BasicTable(props) {
    const rows = props.rows;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell align="right">Product Price</TableCell>
                        <TableCell align="right">Brand</TableCell>
                        <TableCell align="right">Product Info</TableCell>
                        <TableCell align="right">Product Image</TableCell>
                        <TableCell align="right">Action</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row._id}
                            component="th"

                            scope="row"
                            padding="none"
                        >
                            <TableCell component="th" scope="row">
                                {row.product_name}
                            </TableCell>
                            <TableCell align="right">{row.product_price}</TableCell>
                            <TableCell align="right">{row.brand}</TableCell>
                            <TableCell align="right">{row.product_info}</TableCell>
                            <TableCell align="right">{row.product_image_url}</TableCell>
                            <TableCell align="right">

                                <Stack direction={'row'}>
                                    <IconButton color="primary" onClick={function () {
                                        props.edit(row._id)
                                    }} ><EditIcon /></IconButton><IconButton color="error" onClick={() => props.delete(row._id)} ><DeleteIcon /></IconButton>
                                </Stack>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}