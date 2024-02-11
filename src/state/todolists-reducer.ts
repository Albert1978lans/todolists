
import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {setAppStatusAC, statusType} from "./app-reducer";
import {handleServerNetworkAppError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatchType} from "./store";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: statusType
}

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialeState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialeState,
    reducers: {
        removeTodolistAC(state, actions: PayloadAction<{todolistId: string}>) {
            const index = state.findIndex(tl => tl.id === actions.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, actions: PayloadAction<{todolist: TodolistType}>) {
            state.unshift({...actions.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, actions: PayloadAction<{todolistId: string, title: string}>) {
            const index = state.findIndex(tl => tl.id === actions.payload.todolistId)
            if (index > -1) {
                state[index].title = actions.payload.title
            }
        },
        changeTodolistFilterAC(state, actions: PayloadAction<{todolistId: string, filter: FilterValuesType}>) {
            const index = state.findIndex(tl => tl.id === actions.payload.todolistId)
            if (index > -1) {
                state[index].filter = actions.payload.filter
            }
        },
        changeTodolistEntityStatusAC(state, actions: PayloadAction<{status: statusType, todolistId: string}>) {
            const index = state.findIndex(tl => tl.id === actions.payload.todolistId)
            if (index > -1) {
                state[index].entityStatus = actions.payload.status
            }
        },
        setTodolistAC(state, actions: PayloadAction<{todolists: Array<TodolistType>}>) {

            return actions.payload.todolists.map(tl => {
                return {...tl, filter: "all", entityStatus: "idle"}
            })
        },
        clearTodolistAC(state) {
            state = []
        }
    }
})

export const todolistsReducer = slice.reducer

export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
    setTodolistAC,
    clearTodolistAC
} = slice.actions

// Thunk

export const fetchTodolistsTC = () => {
    return(dispatch: AppDispatchType) => {
        dispatch(setAppStatusAC({status:'loading'}))
        todolistsAPI.getTodolist()
            .then(res => {
                const action = setTodolistAC({todolists: res.data})
                dispatch(action)
                dispatch(setAppStatusAC({status:'succeeded'}))
            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return(dispatch: AppDispatchType) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({status: 'loading', todolistId: todolistId}))
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                const action = removeTodolistAC({todolistId: todolistId})
                dispatch(action)
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}

export const addTodolistTC = (todolistTitle: string) => {
    return(dispatch: AppDispatchType) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.createTodolist(todolistTitle)
            .then(res => {
                const action = addTodolistAC({todolist: res.data.data.item})
                dispatch(action)
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return(dispatch: AppDispatchType) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                const action = changeTodolistTitleAC({todolistId: todolistId, title: title})
                dispatch(action)
            })
    }
}