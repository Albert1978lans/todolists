import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {AppActionsType, AppThunk} from "../../state/store";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../../state/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../utils/error-utils";



export type LoginActionsType = ReturnType<typeof setIsLoggedInAC>

type initialeStateType = {
    isLoggedIn: boolean
}

const initialeState: initialeStateType = {
    isLoggedIn: false
}

export const authReducer = (state:initialeStateType = initialeState, action: LoginActionsType): initialeStateType => {
    switch (action.type) {
        case "auth/SET-IS-LOGGED-IN":
            return {
                ...state,
                isLoggedIn: action.values
            }
        default:
            return state

    }
}

// Action

export const setIsLoggedInAC = (values: boolean) => {
    return {
        type: 'auth/SET-IS-LOGGED-IN',
        values
    } as const
}

// Thunk

export const loginTC = (data: LoginParamsType): AppThunk => {
    return (dispatch: Dispatch<AppActionsType>) => {

        dispatch(setAppStatusAC('loading'))

        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
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

export const signUpTC = (): AppThunk => {
    return (dispatch: Dispatch<AppActionsType>) => {

        dispatch(setAppStatusAC('loading'))

        authAPI.signUp()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(false))
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





