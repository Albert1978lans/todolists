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
type ResponseType<D = {}> = {
    data: D,
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}

export const todolistsAPI = {
    getTodolist() {
        return axios.get<ResponseType>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    createTodolist(title: string) {
        return axios.post<ResponseType<{item: TodolistType}>>('https://social-network.samuraijs.com/api/1.1/todo-lists',{title: title}, settings)
    },
    deleteTodolist(todolistID: string) {
        return axios.delete<ResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, settings)
    },
    updateTodolist(todolistID: string, title: string) {
        return axios.put<ResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`,{title: title}, settings)
    },
}