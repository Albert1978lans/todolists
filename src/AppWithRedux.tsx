import React, {useCallback, useEffect} from 'react';
import './App.css';
import {useAppDispatch} from "./state/store";
import {useAppSelector} from "./state/hooks";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {Menu} from "@mui/icons-material";
import {TodolistsList} from "./TodolistsList";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./features/Login/Login";
import {initializeAppTC} from "./state/app-reducer";
import {logOutTC} from "./features/Login/login-reducer";


export type FilterValuesType = 'all' | 'active' | 'completed'

type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false, ...props}: PropsType) {


    // console.log('AppWithRedux')
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!demo) {
            dispatch(initializeAppTC())
        }

    }, [])

    const logoutHandler =  useCallback(()=> {
        dispatch(logOutTC())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '40%', width: '100%', textAlign: 'center' }}>
            <CircularProgress />
        </div>
    }

    return (

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
                            {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log Out</Button>}
                        </Toolbar>
                    </AppBar>
                    {status === 'loading' && <LinearProgress/>}
                    <Container fixed>
                        <Routes>
                            <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                            <Route path={'/login'} element={<Login/>}/>
                            <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                            <Route path='*' element={<Navigate  to='/404'/>} />
                        </Routes>
                    </Container>
                </div>
            </div>

    );
}

export default AppWithRedux;
