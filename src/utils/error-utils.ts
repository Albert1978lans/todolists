import {setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {AppDispatch} from "../state/store";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: AppDispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'some error'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkAppError = (error: any, dispatch: AppDispatch) => {
    dispatch(setAppStatusAC({status: 'failed'}))
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
}

// dispatch: Dispatch<setAppErrorActionType | setAppStatusActionType>