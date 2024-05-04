import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {setAppStatusAC} from "../Application/application-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {ThunkError} from "../../utils/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkAppError} from "../../utils/error-utils";

export const loginTC = createAsyncThunk<undefined, LoginParamsType, ThunkError>
('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await (authAPI.login(param))
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        const err = error as AxiosError
        return handleAsyncServerNetworkAppError(err, thunkAPI)
    }
})
export const logOutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await (authAPI.logOut())
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        const err = error as AxiosError
        return handleAsyncServerNetworkAppError(err, thunkAPI)
    }
})

export const asyncActions = {
    loginTC,
    logOutTC
}

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, actions: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = actions.payload.value
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginTC.fulfilled, (state) => {
                state.isLoggedIn = true
            })
            .addCase(logOutTC.fulfilled, (state) => {
                state.isLoggedIn = false
            })
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions









