import {setAppErrorAC, setAppErrorActionType, setAppStatusAC, setAppStatusActionType} from "../state/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<setAppErrorActionType | setAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'some error'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkAppError = (error: any, dispatch: Dispatch<setAppErrorActionType | setAppStatusActionType>) => {
    dispatch(setAppStatusAC({status: 'failed'}))
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
}