import {TasksActionsType, tasksReducer} from './tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from './todolists-reducer';
import {combineReducers} from 'redux';
import {ThunkAction} from "redux-thunk";
import {UiActionsType, appReducer} from "./app-reducer";
import {authReducer, LoginActionsType} from "../features/Login/login-reducer";
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
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(logger)
})





export type AppRootStateType = ReturnType<typeof rootReducer>        // типизация стэйта приложения
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch  // типизация dispatch

export type AppActionsType = TodolistsActionsType
    | TasksActionsType
    | UiActionsType
    | LoginActionsType
// типизация экшэн крейторов


// export type AppDispatch =ThunkDispatch<AppRootStateType, unknown, AppActionsType>  // типизация dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>



// @ts-ignore
window.store = store