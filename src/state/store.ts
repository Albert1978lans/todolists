import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {combineReducers} from 'redux';
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/login-reducer";
import {configureStore} from "@reduxjs/toolkit";
// import {logger} from "../middleware/middleware";
import {useDispatch} from "react-redux";

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
export type RootReducer = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducer>        // типизация стэйта приложения
export type AppStore = typeof store
export type AppDispatchType = typeof store.dispatch  // типизация dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()


// @ts-ignore
window.store = store