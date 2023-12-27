import axios from "axios";

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

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export enum TaskStatuses  {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export type TaskType = {
    id : string,
    title : string,
    description : string | null,
    todoListId : string,
    order : number,
    status : TaskStatuses,
    priority : TaskPriorities,
    startDate : string | null,
    deadline : string | null,
    addedDate : string
}
export type ResponseType<D = {}> = {
    data: D,
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}
type ResponseTaskType = {
    items: TaskType[],
    totalCount: number,
    error: null | string
}
export type UpdateTaskModelType = {
    title: string
    description: string | null
    status: number
    priority : number
    startDate : string | null
    deadline : string | null
}


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
    updateTask(todolistID: string, taskID: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistID}/tasks/${taskID}`, model)
    },
}

