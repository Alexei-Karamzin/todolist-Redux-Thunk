import {TaskStateType} from "../../App/App";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistAC,
    SetTodolistActionType
} from "./todolists-reducer";
import {TaskPriority, tasksApi, TaskStatuses, TaskType} from "../../api/tasks-api";
import {Dispatch} from "redux";
import {todolistsApi} from "../../api/todolists-api";

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
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, status: action.status}
                    : t)
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
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
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTasksActionType

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    taskId,
    status,
    todolistId
} as const)
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE',
    todolistId,
    taskId,
    title
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
        .then( res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

export const changeTaskTitleTC = (taskId: string, title: string, todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.updateTask(todolistId, taskId, title)
        .then( res => {
            dispatch(changeTaskTitleAC(todolistId, taskId, title))
        })
}
