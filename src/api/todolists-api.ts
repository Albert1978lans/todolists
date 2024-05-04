import axios from "axios";
import {UpdateDomainTaskModelType} from "../features/TodolistsList/tasks-reducer";
import {ResponseTaskType, TodolistType, ResponseType, TaskType} from "./types";

const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'fb06af8a-0542-41c9-aba3-9af2aab7afee'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})



export const todolistsAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists',{title: title})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
    },
    updateTodolist(todolistID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistID}`,{title: title})
    },
    getTasks(todolistID: string) {
        return instance.get<ResponseTaskType>(`todo-lists/${todolistID}/tasks`)
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
    },
    createTask(todolistID: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistID}/tasks`, {title: title})
    },
    updateTask(todolistID: string, taskID: string, model: UpdateDomainTaskModelType) {
        return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistID}/tasks/${taskID}`, model)
    },
}

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{userId: number}>>(`/auth/login`, data)
    },
    logOut() {
        return instance.delete<ResponseType>(`/auth/login`)
    },
    me() {
        return instance.get<ResponseType<{id: number, email: string, login: string}>>(`/auth/me`)
    }
}

