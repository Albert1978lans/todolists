import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistAC,
    SetTodolistActionType
} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";
import {AppActionsType, AppThunk} from "./store";
import {Dispatch} from "redux";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}
type SetTasksActionType = {
    type: 'SET-TASKS'
    todolistId: string
    tasks: Array<TaskType>
}

export type TasksActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTasksActionType

const initialeState: TasksStateType = {
    // [todolistId1]: [
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    //     {id: v1(), title: 'Redux', isDone: false},
    // ],
    // [todolistId2]: [
    //     {id: v1(), title: 'Milk', isDone: false},
    //     {id: v1(), title: 'Bread', isDone: true}
    // ]
}

export const tasksReducer = (state: TasksStateType = initialeState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [
                    {id: v1(), title: action.title, status: TaskStatuses.New, order: 0, description: '', addedDate: '',
                         startDate: '', deadline: '', priority: 0, todoListId: action.todolistId},
                    ...state[action.todolistId]
                ]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: [],
            }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }


        default:
            return state

    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskId: taskId,
        todolistId: todolistId
    }
}

// Action

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, newStatus: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status: newStatus, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>): SetTasksActionType => {
    return {type: 'SET-TASKS',todolistId, tasks}
}

// Thunk

export const fetchTasksTC = (todolistID: string): AppThunk => {
    return(dispatch: Dispatch<AppActionsType>) => {
        todolistsAPI.getTasks(todolistID)
            .then(res => {
                const action = setTasksAC(todolistID, res.data.items)
                dispatch(action)
            })
    }
}

