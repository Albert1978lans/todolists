import {TasksActionsType, tasksReducer} from './tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from './todolists-reducer';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {UiActionsType, appReducer} from "./app-reducer";
import {authReducer, LoginActionsType} from "../features/Login/login-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})


// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>        // типизация стэйта приложения

export type AppActionsType = TodolistsActionsType
    | TasksActionsType
    | UiActionsType
    | LoginActionsType
// типизация экшэн крейторов

export type AppDispatch =ThunkDispatch<AppRootStateType, unknown, AppActionsType>  // типизация dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>


// @ts-ignore
window.store = store