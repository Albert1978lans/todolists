import {authAPI, FieldErrorType, LoginParamsType} from "../../api/todolists-api";
import {setAppStatusAC} from "../Application/application-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const loginTC = createAsyncThunk<undefined,                                                                        // Returned
    LoginParamsType,                                                                  // ThunkArg
    { rejectValue: { errors: string[] | null, fieldsErrors?: Array<FieldErrorType> } }    // ThunkApiConfig
    >
('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await (authAPI.login(param))
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        // const error: AxiosError = err
        // handleServerNetworkAppError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: null, fieldsErrors: undefined})

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
            handleServerAppError(res.data, thunkAPI.dispatch)
            thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
            return thunkAPI.rejectWithValue({})
        }
    } catch (error) {
        handleServerNetworkAppError({message: 'error network'}, thunkAPI.dispatch)
        thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
        return thunkAPI.rejectWithValue({})
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









