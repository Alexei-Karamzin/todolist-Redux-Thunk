import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "db201859-ca8d-43e6-86f0-2e698d4710cf"
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TasksType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string
    deadline: string
    addedDate: string
}

type ResponseType<D = {}> = {
    resultCode: number,
    messages: string[],
    data: D
}

type GetTasksResponse = {
    items: Array<TasksType>
    totalCount: number
    error: string
}

type CreateUpdateTaskType = {
    item: TasksType
}

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<CreateUpdateTaskType>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<CreateUpdateTaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
    }
}
