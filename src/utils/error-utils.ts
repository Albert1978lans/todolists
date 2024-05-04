import {setAppErrorAC, setAppStatusAC} from "../features/Application/application-reducer";
import {ResponseType} from '../api/types'
import {AxiosError} from "axios";

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}
export const handleAsyncServerAppError = <D>(data: ResponseType<D>, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppErrorAC(data.messages.length ? {error: data.messages[0]} : {error: 'some error'}))
    }
    thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}
export const handleAsyncServerNetworkAppError = (error: AxiosError, thunkAPI: ThunkAPIType) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
    thunkAPI.dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    return thunkAPI.rejectWithValue({errors: [error.message]})
}