import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {combineReducers} from 'redux';
import {applicationReducer} from "../features/Application/application-reducer";
import {authReducer} from "../features/Auth/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
// import {logger} from "../middleware/middleware";
import {useDispatch} from "react-redux";

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: applicationReducer,
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