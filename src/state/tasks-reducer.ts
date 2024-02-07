import {
    addTodolistAC,
    removeTodolistAC,
    setTodolistAC,
} from "./todolists-reducer";
import {TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {AppDispatch, AppRootStateType} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


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

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', (todolistID: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    return todolistsAPI.getTasks(todolistID)
        .then(res => {
            const tasks = res.data.items
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {tasks, todolistID}; //передаём payload в extraReducers case fetchTasksTC ниже
        })
})

const slice = createSlice({
    name: 'tasks',
    initialState: initialeState,
    reducers: {
        removeTaskAC(state, actions: PayloadAction<{ todolistId: string, taskId: string }>) {
            const indexTask = state[actions.payload.todolistId].findIndex(t => t.id === actions.payload.taskId)
            if (indexTask > -1) {
                state[actions.payload.todolistId].splice(indexTask, 1)
            }

        },
        addTaskAC(state, actions: PayloadAction<{ task: TaskType }>) {
            state[actions.payload.task.todoListId].unshift(actions.payload.task)
        },
        updateTaskAC(state, actions: PayloadAction<{ taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[actions.payload.todolistId]
            const indexTask = tasks.findIndex(t => t.id === actions.payload.taskId)
            if (indexTask > -1) {
                tasks[indexTask] = {...tasks[indexTask], ...actions.payload.domainModel}
            }

        },

        clearTaskAC(state) {
            state = {}
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(removeTodolistAC, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(addTodolistAC, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(setTodolistAC, (state, action) => {
                action.payload.todolists.forEach(tl => {
                    state[tl.id] = []
                })
            })
            .addCase(fetchTasksTC.fulfilled, (state, action) => {
                state[action.payload.todolistID] = action.payload.tasks    // payload приходит с санки fetchTasksTC выше
            })
    },
})

export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, clearTaskAC} = slice.actions


// Thunk

export const removeTaskTC = (todolistID: string, taskID: string) => {
    return (dispatch: AppDispatch) => {

        dispatch(setAppStatusAC({status: 'loading'}))

        todolistsAPI.deleteTask(todolistID, taskID)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC({todolistId: todolistID, taskId: taskID}))
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
export const addTaskTC = (todolistID: string, title: string) => {
    return (dispatch: AppDispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.createTask(todolistID, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC({task: res.data.data.item}))
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

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {

    return (dispatch: AppDispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC({status: 'loading'}))

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
                    dispatch(updateTaskAC({taskId: taskId, domainModel: model, todolistId: todolistId}))
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


