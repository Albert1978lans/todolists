import {
    addTodolistAC,
    removeTodolistAC,
    setTodolistAC,
} from "./todolists-reducer";
import {TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {AppActionsType, AppRootStateType, AppThunk} from "./store";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../utils/error-utils";




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
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistAC>
    | SetTasksActionType
    | ReturnType<typeof clearTaskAC>

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

        case addTodolistAC.type:
            return {
                ...state,
                [action.payload.todolist.id]: [],
            }
        case removeTodolistAC.type: {
            let stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        }
        case setTodolistAC.type: {
            const copyState = {...state}
            action.payload.todolists.forEach(tl => {
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
        case 'CLEAR-TASKS': {
            let copyState = {...state}
            copyState = {}
            return copyState
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

export const clearTaskAC = () => {
    return {
        type: 'CLEAR-TASKS'
    } as const
}

// Thunk

export const fetchTasksTC = (todolistID: string): AppThunk => {
    return(dispatch: Dispatch<AppActionsType>) => {

        dispatch(setAppStatusAC({status:'loading'}))

        todolistsAPI.getTasks(todolistID)
            .then(res => {
                if (res.data.error === null) {
                    dispatch(setTasksAC(todolistID, res.data.items))
                    dispatch(setAppStatusAC({status:'succeeded'}))
                } else {
                    dispatch(setAppErrorAC({error: res.data.error}))
                }
            })
            .catch(error => {
                dispatch(setAppStatusAC({status:'failed'}))
                dispatch(setAppErrorAC(error ? error : 'Some error occurred'))
            })
    }
}

export const removeTaskTC = (todolistID: string, taskID: string): AppThunk => {
    return (dispatch: Dispatch<AppActionsType>) => {

        dispatch(setAppStatusAC({status: 'loading'}))

        todolistsAPI.deleteTask(todolistID, taskID)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(todolistID, taskID))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}
export const addTaskTC = (todolistID: string, title: string): AppThunk => {
    return (dispatch: Dispatch<AppActionsType>) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.createTask(todolistID, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
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

        dispatch(setAppStatusAC({status:'loading'}))
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
                    dispatch(setAppStatusAC({status:'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}


