import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {setAppStatusAC, statusType} from "./app-reducer";
import {handleServerNetworkAppError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: statusType
}

export const todolistId1 = v1()
export const todolistId2 = v1()

export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists',
    async (param, {dispatch,rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await (todolistsAPI.getTodolist())

        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}

    } catch (error) {
        handleServerNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolistTC',
    async (param:{todolistId: string}, {dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({status: 'loading', todolistId: param.todolistId}))
        const res = await todolistsAPI.deleteTodolist(param.todolistId)
            try {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return{todolistId: param.todolistId}
            }
            catch (error) {
                handleServerNetworkAppError(error, dispatch)
                return rejectWithValue(null)
            }


    })

export const addTodolistTC = createAsyncThunk('todolists/addTodolistTC',
    async (param:{todolistTitle: string}, {dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.createTodolist(param.todolistTitle)
            try {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return {todolist: res.data.data.item}
            }
            catch (error) {
                handleServerNetworkAppError(error, dispatch)
                return rejectWithValue(null)
            }
    })

export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle',
    async (param:{todolistId: string, title: string}, {dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.updateTodolist(param.todolistId, param.title)
        try {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolistId: param.todolistId, title: param.title}
        }
        catch (error) {
            handleServerNetworkAppError(error, dispatch)
            return rejectWithValue(null)
        }
    })


const slice = createSlice({
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






