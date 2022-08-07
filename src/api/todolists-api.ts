import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "db201859-ca8d-43e6-86f0-2e698d4710cf"
    }
}

export const todolistsApi = {
    getTodolists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    createTodolist() {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'AXIOS 01'}, settings)
    },
    deleteTodolist(id: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
    },
    updateTodolist(title: string, id: string) {
        return axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, settings)
    }
}