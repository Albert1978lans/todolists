import {authAPI, FieldErrorType, LoginParamsType} from "../../api/todolists-api";
import {setAppStatusAC} from "../../state/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTodolistAC} from "../../state/todolists-reducer";
import {clearTaskAC} from "../../state/tasks-reducer";
import {AppDispatchType} from "../../state/store";

export const loginTC = createAsyncThunk<
    {isLoggedIn: boolean},                                                     // Returned
    LoginParamsType,                                                           // ThunkArg
    {rejectValue: {errors: string[], fieldsErrors?: Array<FieldErrorType>}}    // ThunkApiConfig
    >
('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await (authAPI.login(param))
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {isLoggedIn: true}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)

                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        }
        catch(error) {
            // const error: AxiosError = err
            // handleServerNetworkAppError(error, thunkAPI.dispatch)
            // return thunkAPI.rejectWithValue({errors: null, fieldsErrors: undefined})
            return {isLoggedIn: false}
        }
})

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, actions: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = actions.payload.value
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginTC.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// Thunk



export const logOutTC = () => {
    return (dispatch: AppDispatchType) => {

        dispatch(setAppStatusAC({status: 'loading'}))

        dispatch(clearTodolistAC())
        dispatch(clearTaskAC())

        authAPI.logOut()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({value:false}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}







