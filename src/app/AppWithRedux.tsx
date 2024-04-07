import React, {useCallback, useEffect} from 'react';
import './App.css';
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
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Menu} from "@mui/icons-material";
import {TodolistsList} from "../features/TodolistsList";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Auth";
import {useSelector} from "react-redux";
import {selectIsInitialized, selectStatus} from "../features/Application/selectors";
import {authActions, authSelectors} from "../features/Auth";
import {useActions} from "../utils/redux-utils";
import {appActions} from "../features/Application";


type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false, ...props}: PropsType) {
    // console.log('AppWithRedux')
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const {logOutTC} = useActions(authActions)
    const {initializeAppTC} = useActions(appActions)

    useEffect(() => {
        if (!demo) {
            initializeAppTC()
        }

    }, [])

    const logoutHandler =  useCallback(()=> {
        logOutTC()
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
