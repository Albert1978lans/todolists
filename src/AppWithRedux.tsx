import React, {useCallback} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./state/hooks";
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {Menu} from "@mui/icons-material";
import {TodolistsList} from "./TodolistsList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./features/Login/Login";
import {signUpTC} from "./features/Login/login-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'

type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false, ...props}: PropsType) {

    console.log('AppWithRedux')
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)

    const signUp = useCallback(() => {
        const thunk = signUpTC()
        dispatch(thunk)
    }, [dispatch])




    return (
        <BrowserRouter>
            <div className='App'>
                <ErrorSnackbar/>

                <div className='App-container'>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <Menu/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                News
                            </Typography>
                            <Button color="inherit">Login</Button>
                            <Button color="inherit" onClick={signUp}>SignUp</Button>
                        </Toolbar>
                    </AppBar>
                    {status === 'loading' && <LinearProgress/>}
                    <Container fixed>
                        <Routes>
                            <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                            <Route path={'/login'} element={<Login/>}/>
                        </Routes>
                    </Container>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default AppWithRedux;
