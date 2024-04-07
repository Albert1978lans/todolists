import {asyncActions as todolistsAsyncActions, slice as todolistsSlice} from "./todolists-reducer";
import {asyncActions as taskAsyncActions, slice as tasksSlice} from "./tasks-reducer";
import {TodolistsList} from './TodolistsList'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...todolistsSlice.actions
}

const tasksActions = {
    ...taskAsyncActions,
    ...tasksSlice.actions
}

const todolistsReducer = todolistsSlice.reducer
const tasksReducer = tasksSlice.reducer

export {
    todolistsActions,
    tasksActions,
    todolistsReducer,
    tasksReducer,
    TodolistsList
}