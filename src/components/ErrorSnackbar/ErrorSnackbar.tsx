import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useAppSelector} from "../../features/TodolistsList/hooks";
import {setAppErrorAC} from "../../features/Application/application-reducer";
import {useAppDispatch} from "../../app/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {

    // console.log('ErrorSnackbar')

    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.app.error)
    console.log(error)
    const isOpen = error !== ''

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppErrorAC({error: ''}))
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

