
import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunk} from "./store";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {filter: FilterValuesType}

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

export type TodolistsActionsType =
    RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType |
    SetTodolistActionType

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialeState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialeState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            return [
                {...action.todolist, filter: "all"},
                ...state,
            ]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        case "SET-TODOLISTS":
            return action.todolists.map(tl => {
                return {...tl, filter: "all"}
            })

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
export const setTodolistAC = (todolist: Array<TodolistType>):SetTodolistActionType => {
    return {
        type: 'SET-TODOLISTS',
        todolists: todolist
    }
}

// Thunk

export const fetchTodolistsTC = (): AppThunk => {
    return(dispatch: Dispatch<AppActionsType>) => {
        todolistsAPI.getTodolist()
            .then(res => {
                const action = setTodolistAC(res.data)
                dispatch(action)
            })
    }
}

export const removeTodolistTC = (todolistId: string): AppThunk => {
    return(dispatch: Dispatch<AppActionsType>) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                const action = removeTodolistAC(todolistId)
                dispatch(action)
            })
    }
}

export const addTodolistTC = (todolistTitle: string): AppThunk => {
    return(dispatch: Dispatch<AppActionsType>) => {
        todolistsAPI.createTodolist(todolistTitle)
            .then(res => {
                const action = addTodolistAC(res.data.data.item)
                dispatch(action)
            })
    }
}