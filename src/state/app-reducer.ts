export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: statusType,
    error: string | null
}

const initialState: InitialStateType = {
    status: "idle",
    error: null
}

type setErrorType = {
    type: 'APP/SET-ERROR'
    error: string | null
}
type setStatusType = {
    type: 'APP/SET-STATUS'
    status: statusType
}

export type UiActionsType = setErrorType | setStatusType

export const appReducer = (state: InitialStateType = initialState, action: UiActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null): setErrorType => {
    return {type: 'APP/SET-ERROR', error}
}

export const setAppStatusAC = (status: statusType): setStatusType => {
    return {type: 'APP/SET-STATUS', status}
}