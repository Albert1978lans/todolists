import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'fb06af8a-0542-41c9-aba3-9af2aab7afee'
    }
}

type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type CreateTodolistResponseType = {
    data: {
        item: TodolistType
    },
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}
type DeleteTodolistResponseType = {
    data: {},
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}
type UpdateTodolistResponseType = {
    data: {},
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}

export const todolistsAPI = {
    getTodolists() {
        return axios.get<TodolistType[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    createTodolist(title: string) {
        return axios.post<CreateTodolistResponseType>('https://social-network.samuraijs.com/api/1.1/todo-lists',{title: title}, settings)
    },
    deleteTodolist(todolistID: string) {
        return axios.delete<DeleteTodolistResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, settings)
    },
    updateTodolist(todolistID: string, title: string) {
        return axios.put<UpdateTodolistResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`,{title: title}, settings)
    },
}