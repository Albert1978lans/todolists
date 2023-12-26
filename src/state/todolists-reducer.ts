
import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunk} from "./store";
import {setAppStatusAC, statusType} from "./app-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: statusType
}

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string,
    filter: FilterValuesType
}
export type SetTodolistActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

export type ChangeTodolistEntityStatusActionType = {
    type: 'CHANGE-TODOLIST-ENTITY-STATUS'
    status: statusType
    todolistId: string
}

export type TodolistsActionsType =
    RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType |
    SetTodolistActionType |
    ChangeTodolistEntityStatusActionType

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialeState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialeState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            return [
                {...action.todolist, filter: "all", entityStatus: "idle"},
                ...state,
            ]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        case "SET-TODOLISTS":
            return action.todolists.map(tl => {
                return {...tl, filter: "all", entityStatus: "idle"}
            })
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)

        default:
            return state

    }
}

// Action

export const removeTodolistAC = (todolistId: string):RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id: todolistId
    }
}

export const addTodolistAC = (todolist: TodolistType):AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        todolist
    }
}

export const changeTodolistTitleAC = (todolistId: string, title: string):ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id: todolistId,
        title: title
    }
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType):ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId,
        filter: filter
    }
}

export const changeTodolistEntityStatusAC = (status: statusType, todolistId: string):ChangeTodolistEntityStatusActionType => {
    return {
        type: 'CHANGE-TODOLIST-ENTITY-STATUS',
        status,
        todolistId
    }
}

export const setTodolistAC = (todolist: Array<TodolistType>):SetTodolistActionType => {
    return {
        type: 'SET-TODOLISTS',
        todolists: todolist
    }
}


// Thunk

export const fetchTodolistsTC = (): AppThunk => {
    return(dispatch: Dispatch<AppActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTodolist()
            .then(res => {
                const action = setTodolistAC(res.data)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const removeTodolistTC = (todolistId: string): AppThunk => {
    return(dispatch: Dispatch<AppActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC('loading', todolistId))
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                const action = removeTodolistAC(todolistId)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const addTodolistTC = (todolistTitle: string): AppThunk => {
    return(dispatch: Dispatch<AppActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTodolist(todolistTitle)
            .then(res => {
                const action = addTodolistAC(res.data.data.item)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => {
    return(dispatch: Dispatch<AppActionsType>) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                const action = changeTodolistTitleAC(todolistId, title)
                dispatch(action)
            })
    }
}