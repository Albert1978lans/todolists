import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {setAppStatusAC} from "../../state/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTodolistAC} from "../../state/todolists-reducer";
import {clearTaskAC} from "../../state/tasks-reducer";
import {AppDispatch} from "../../state/store";

const initialeState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialeState,
    reducers: {
        setIsLoggedInAC(state, actions: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = actions.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// Thunk

export const loginTC = (data: LoginParamsType) => {
    return (dispatch: AppDispatch) => {

        dispatch(setAppStatusAC({status: 'loading'}))

        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({value: true}))
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

export const logOutTC = () => {
    return (dispatch: AppDispatch) => {

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







