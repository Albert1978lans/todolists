import React from 'react';
import './App.css';
import {useAppSelector} from "./state/hooks";
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {Menu} from "@mui/icons-material";
import {TodolistsList} from "./TodolistsList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./features/Login/Login";

export type FilterValuesType = 'all' | 'active' | 'completed'

type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false, ...props}: PropsType) {

    console.log('AppWithRedux')

    const status = useAppSelector(state => state.app.status)

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
