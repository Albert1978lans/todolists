import {setAppErrorAC, setAppStatusAC} from "../features/Application/application-reducer";
import {ResponseType} from "../api/todolists-api";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: any, showError = true) => {
    // if (data.messages.length) {
    //     dispatch(setAppErrorAC({error: data.messages[0]}))
    // } else {
    //     dispatch(setAppErrorAC({error: 'some error'}))
    // }
    if (showError) {
        dispatch(setAppErrorAC(data.messages.length? {error: data.messages[0]} : {error: 'some error'}))
    }


    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkAppError = (error: any, dispatch: any) => {
    dispatch(setAppStatusAC({status: 'failed'}))
    dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
}