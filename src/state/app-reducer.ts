import {Dispatch} from "redux";
import {AppActionsType, AppThunk} from "./store";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/login-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../utils/error-utils";
import {clearTodolistAC} from "./todolists-reducer";
import {clearTaskAC} from "./tasks-reducer";

export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: statusType,
    error: string | null,
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}

export type setAppErrorActionType = {
    type: 'APP/SET-ERROR'
    error: string | null
}
export type setAppStatusActionType = {
    type: 'APP/SET-STATUS'
    status: statusType
}

export type UiActionsType =
    setAppErrorActionType |
    setAppStatusActionType |
    ReturnType<typeof setAppIsInitializedAC>

export const appReducer = (state: InitialStateType = initialState, action: UiActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.values}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null): setAppErrorActionType => {
    return {type: 'APP/SET-ERROR', error}
}

export const setAppStatusAC = (status: statusType): setAppStatusActionType => {
    return {type: 'APP/SET-STATUS', status}
}

export const setAppIsInitializedAC = (values: boolean) => {
    return {type: 'APP/SET-IS-INITIALIZED', values} as const
}

// Thunk

export const initializeAppTC = () => {
    return(dispatch: Dispatch<AppActionsType>) => {
        authAPI.me()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({value: true}))
                }
                dispatch(setAppIsInitializedAC(true))
            })
    }
}

