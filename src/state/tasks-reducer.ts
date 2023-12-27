import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistActionType
} from "./todolists-reducer";
import {TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {AppActionsType, AppRootStateType, AppThunk} from "./store";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";


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
    task:TaskType
}

type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    taskId: string
    todolistId: string
    model: UpdateDomainTaskModelType
}
type SetTasksActionType = {
    type: 'SET-TASKS'
    todolistId: string
    tasks: Array<TaskType>
}

export type TasksActionsType = RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
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
                [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolist.id]: [],
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

// Action

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskId: taskId,
        todolistId: todolistId
    }
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const updateTaskAC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', taskId, model: domainModel, todolistId}
}

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>): SetTasksActionType => {
    return {type: 'SET-TASKS',todolistId, tasks}
}

// Thunk

export const fetchTasksTC = (todolistID: string): AppThunk => {
    return(dispatch: Dispatch<AppActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTasks(todolistID)
            .then(res => {
                const action = setTasksAC(todolistID, res.data.items)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const removeTaskTC = (todolistID: string, taskID: string): AppThunk => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistsAPI.deleteTask(todolistID, taskID)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(todolistID, taskID))
                }

            })
    }
}
export const addTaskTC = (todolistID: string, title: string): AppThunk => {
    return (dispatch: Dispatch<AppActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTask(todolistID, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('some error'))
                    }
                    dispatch(setAppStatusAC('failed'))
                }

            })
            .catch(error => {
                dispatch(setAppStatusAC('failed'))
                dispatch(setAppErrorAC(error.message))
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string | null
    status?: number
    priority?: number
    startDate?: string | null
    deadline?: string | null
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk => {
    return (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {

        dispatch(setAppStatusAC('loading'))
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)

        if (!task) {
            console.warn('task not found')
            return
        }

        const model: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, model)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, model, todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('some error'))
                    }
                    dispatch(setAppStatusAC('failed'))
                }

            })
            .catch(error => {
                dispatch(setAppStatusAC('failed'))
                dispatch(setAppErrorAC(error.message))
            })
    }
}


