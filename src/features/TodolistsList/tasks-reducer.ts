import {
    addTodolistTC,
    fetchTodolistsTC, removeTodolistTC
} from "./todolists-reducer";
import {TaskType, todolistsAPI} from "../../api/todolists-api";
import {AppRootStateType} from "../../app/store";
import {setAppStatusAC} from "../Application/application-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


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

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string | null
    status?: number
    priority?: number
    startDate?: string | null
    deadline?: string | null
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {tasks, todolistId}; //передаём payload в extraReducers case fetchTasks ниже

})

export const removeTask = createAsyncThunk('tasks/removeTask', async (param: { todolistId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await (todolistsAPI.deleteTask(param.todolistId, param.taskId))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolistId: param.todolistId, taskId: param.taskId}

})

export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: {todolistId: string, title: string}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await (todolistsAPI.createTask(param.todolistId, param.title))

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {task: res.data.data.item}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }

    }
    catch (error) {
        handleServerNetworkAppError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: {taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string}, thunkAPI) => {

        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

        const state = thunkAPI.getState() as AppRootStateType
        const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)

        if (!task) {
            return thunkAPI.rejectWithValue('task not found')
        }

        const model: UpdateDomainTaskModelType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            ...param.domainModel
        }

        const res = await (todolistsAPI.updateTask(param.todolistId, param.taskId, model))

            try {
                if (res.data.resultCode === 0) {
                    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                    return {taskId: param.taskId, domainModel: model, todolistId: param.todolistId}
                } else {
                    handleServerAppError(res.data, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue({})
                }
            }
            catch(error)  {
                handleServerNetworkAppError(error, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({})
            }

})

export const asyncActions = {
    fetchTasks,
    removeTask,
    addTaskTC,
    updateTaskTC
}

export const slice = createSlice({
    name: 'tasks',
    initialState: initialeState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                action.payload.todolists.forEach(tl => {
                    state[tl.id] = []
                })
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks    // payload приходит с санки fetchTasksTC выше
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const indexTask = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
                if (indexTask > -1) {
                    state[action.payload.todolistId].splice(indexTask, 1)
                }
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const indexTask = tasks.findIndex(t => t.id === action.payload.taskId)
                if (indexTask > -1) {
                    tasks[indexTask] = {...tasks[indexTask], ...action.payload.domainModel}
                }
            })
    },
})

export const tasksReducer = slice.reducer








