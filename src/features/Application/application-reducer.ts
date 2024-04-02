
import {authAPI} from "../../api/todolists-api";
import {setIsLoggedInAC} from "../Auth/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: statusType,
    error: string,
    isInitialized: boolean
}


export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, thunkAPI) => {
    const res = await (authAPI.me())
    if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setIsLoggedInAC({value: true}))
    }
    return
})

export const asyncActions = {
    initializeAppTC
}

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: "idle",
        error: '',
        isInitialized: false
    },
    reducers: {
        setAppErrorAC(state, actions: PayloadAction<{ error: string }>) {
            state.error = actions.payload.error
        },
        setAppStatusAC(state, actions: PayloadAction<{ status: statusType }>) {
            state.status = actions.payload.status
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeAppTC.fulfilled, (state) => {
                state.isInitialized = true
            })
    }
})

export const applicationReducer = slice.reducer

export const {setAppErrorAC, setAppStatusAC} = slice.actions




