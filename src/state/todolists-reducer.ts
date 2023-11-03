import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
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

type ActionType =
    RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialeState: Array<TodolistType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: Array<TodolistType> = initialeState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            return [
                {id: action.todolistId, title: action.title, filter: "all"},
                ...state,
            ]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        default:
            return state

    }
}

export const removeTodolistAC = (todolistId: string):RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id: todolistId
    }
}

export const addTodolistAC = (title: string):AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        todolistId: v1()
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