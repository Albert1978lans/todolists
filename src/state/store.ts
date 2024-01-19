import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {combineReducers} from 'redux';
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/login-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {logger} from "../middleware/middleware";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(logger)
})

export type AppRootStateType = ReturnType<typeof rootReducer>        // типизация стэйта приложения
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch  // типизация dispatch


// @ts-ignore
window.store = store