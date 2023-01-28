import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Message({ message, variant }) {
    return (
        <Alert variant="outlined" severity={variant}>
            {message}
        </Alert>
    );
}