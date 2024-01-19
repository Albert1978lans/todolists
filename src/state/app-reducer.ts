
import {AppDispatch} from "./store";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/login-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: statusType,
    error: string,
    isInitialized: boolean
}

const initialState = {
    status: "idle",
    error: '',
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, actions: PayloadAction<{error: string}>) {
                state.error = actions.payload.error
        },
        setAppStatusAC(state, actions: PayloadAction<{status: statusType}>) {
            state.status = actions.payload.status
        },
        setAppIsInitializedAC(state, actions: PayloadAction<{value: boolean}>) {
            state.isInitialized = actions.payload.value
        }
    }
})

export const appReducer = slice.reducer

export const {setAppErrorAC, setAppStatusAC, setAppIsInitializedAC} = slice.actions

// Thunk

export const initializeAppTC = () => {
    return(dispatch: AppDispatch) => {
        authAPI.me()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({value: true}))
                }
                dispatch(setAppIsInitializedAC({value: true}))
            })
    }
}

