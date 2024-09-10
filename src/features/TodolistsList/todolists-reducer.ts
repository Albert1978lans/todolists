import {v1} from "uuid";
import {todolistsAPI} from "../../api/todolists-api";
import {setAppStatusAC, statusType} from "../Application/application-reducer";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkAppError,
} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {TodolistType} from "../../api/types";
import {ThunkError} from "../../utils/types";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: statusType
}

export const todolistId1 = v1()
export const todolistId2 = v1()

export const fetchTodolistsTC = createAsyncThunk<{todolists: Array<TodolistType>}, undefined, ThunkError>
('todolists/fetchTodolists',
    async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await (todolistsAPI.getTodolist())
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}

    } catch (error) {
        const err = error as AxiosError
        return handleAsyncServerNetworkAppError(err, thunkAPI)
    }
})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolistTC',
    async (param:{todolistId: string}, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        thunkAPI.dispatch(changeTodolistEntityStatusAC({status: 'loading', todolistId: param.todolistId}))
            try {
                const res = await todolistsAPI.deleteTodolist(param.todolistId)
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return{todolistId: param.todolistId}
            }
            catch (error) {
                const err = error as AxiosError
                return handleAsyncServerNetworkAppError(err, thunkAPI)
            }


    })
export const addTodolistTC = createAsyncThunk<
    {todolist: TodolistType},
    {todolistTitle: string},
    ThunkError
    >('todolists/addTodolistTC',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await todolistsAPI.createTodolist(param.todolistTitle)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {todolist: res.data.data.item}
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI, false)
            }

        }
        catch (error) {
            const err = error as AxiosError
            return handleAsyncServerNetworkAppError(err, thunkAPI)
        }
    })

export const changeTodolistTitleTC = createAsyncThunk<
    {todolistId: string, title: string},
    {todolistId: string, title: string},
    ThunkError
    >('todolists/changeTodolistTitle',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await todolistsAPI.updateTodolist(param.todolistId, param.title)

            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {todolistId: param.todolistId, title: param.title}
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI, false)
            }
        }
        catch (error) {
            const err = error as AxiosError
            return handleAsyncServerNetworkAppError(err, thunkAPI)
        }
    })

export const asyncActions = {
    fetchTodolistsTC,
    removeTodolistTC,
    addTodolistTC,
    changeTodolistTitleTC
}

export const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, actions: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === actions.payload.todolistId)
            if (index > -1) {
                state[index].filter = actions.payload.filter
            }
        },
        changeTodolistEntityStatusAC(state, actions: PayloadAction<{ status: statusType, todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === actions.payload.todolistId)
            if (index > -1) {
                state[index].entityStatus = actions.payload.status
            }
        },

        clearTodolistAC(state) {
            state = []
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => {
                    return {...tl, filter: "all", entityStatus: "idle"}
                })

            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todolistId)
                if (index > -1) {
                    state.splice(index, 1)
                }

            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todolistId)
                if (index > -1) {
                    state[index].title = action.payload.title
                }
            })

    }
})

export const todolistsReducer = slice.reducer

export const {
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
    clearTodolistAC
} = slice.actions






