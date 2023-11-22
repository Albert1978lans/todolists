import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'fb06af8a-0542-41c9-aba3-9af2aab7afee'
    }
}

export const todolistsAPI = {
    getTodolists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    createTodolist(title: string) {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title: title}, settings)
    },
    deleteTodolist(todolistID: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, settings)
    },
    updateTodolist(todolistID: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`,{title: title}, settings)
    },
}