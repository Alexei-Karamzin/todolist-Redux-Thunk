import {TaskStateType} from "../../App/App";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistActionType
} from "./todolists-reducer";
import {tasksApi,TaskType, UpdateTaskModelType} from "../../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId]
            let newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy
        }
        case 'REMOVE-TASK': {
            let copyState = {...state}
            let resultTasks = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            copyState[action.todolistId] = resultTasks
            return copyState
        }
        case 'UPDATE-TASK': {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, ...action.model}
                    : t)
            return ({...state})
        }
        case 'ADD-TODOLIST': {
            const stateCope = {...state}
            stateCope[action.todolist.id] = []
            return stateCope
        }
        case 'REMOVE-TODOLIST': {
            const stateCope = {...state}

            delete stateCope[action.todolistId]

            return stateCope
        }
        case "SET-TODOLIST": {
            const copyState = {...state}

            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })

            return copyState
        }
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state
    }
}

type ActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTasksActionType

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK',
    taskId,
    model,
    todolistId
} as const)

export const setTaskAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => ({
    type: 'SET-TASKS',
    tasks,
    todolistId
} as const)

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
        .then((res) => {
            dispatch(setTaskAC(res.data.items, todolistId))
        })
}

export const removeTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksApi.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksApi.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

export const changeTaskTitleTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
        console.log('task not found in the state')
        return
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        startDate: task.startDate,
        deadline: task.deadline,
        priority: task.priority,
        status: task.status,
        ...domainModel
    }

    tasksApi.updateTask(todolistId, taskId, apiModel)
        .then(res => {
            dispatch(updateTaskAC(taskId, domainModel, todolistId))
        })
}

export const changeTaskStatusTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
        console.log('task not found in the state')
        return
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        startDate: task.startDate,
        deadline: task.deadline,
        priority: task.priority,
        status: task.status,
        ...domainModel
    }

    tasksApi.updateTask(todolistId, taskId, apiModel)
        .then(res => {
            dispatch(updateTaskAC(taskId, domainModel, todolistId))
        })
}