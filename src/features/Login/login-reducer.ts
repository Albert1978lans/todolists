import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {AppActionsType, AppThunk} from "../../state/store";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../state/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTodolistAC} from "../../state/todolists-reducer";
import {clearTaskAC} from "../../state/tasks-reducer";



export type LoginActionsType = ReturnType<typeof setIsLoggedInAC>



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

// export const authReducer = (state:initialeStateType = initialeState, action: LoginActionsType): initialeStateType => {
//     switch (action.type) {
//         case "auth/SET-IS-LOGGED-IN":
//             return {
//                 ...state,
//                 isLoggedIn: action.values
//             }
//         default:
//             return state
//
//     }
// }

// Action

// export const setIsLoggedInAC = (values: boolean) => {
//     return {
//         type: 'auth/SET-IS-LOGGED-IN',
//         values
//     } as const
// }

// Thunk

export const loginTC = (data: LoginParamsType): AppThunk => {
    return (dispatch: Dispatch<AppActionsType>) => {

        dispatch(setAppStatusAC('loading'))

        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({value: true}))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}

export const logOutTC = (): AppThunk => {
    return (dispatch: Dispatch<AppActionsType>) => {

        dispatch(setAppStatusAC('loading'))

        dispatch(clearTodolistAC())
        dispatch(clearTaskAC())

        authAPI.logOut()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({value:false}))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}







