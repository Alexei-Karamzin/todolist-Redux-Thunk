import {v1} from "uuid";
import {TaskStateType} from "../../App/App";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";

type addTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type removeTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

const initialState: TaskStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "REST API", isDone: false}
    ],
    [todolistId2]: [
        {id: v1(), title: "beer", isDone: true},
        {id: v1(), title: "milk", isDone: false},
        {id: v1(), title: "soda", isDone: false},
    ]
}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.title, isDone: false}
            let newTasks = [newTask, ...state[action.todolistId]]
            state[action.todolistId] = newTasks
            return ({...state})
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
                    ? {...t, isDone: action.isDone}
                    : t)
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        }
        case 'ADD-TODOLIST': {
            const stateCope = {...state}
            stateCope[action.todolistId] = []
            return stateCope
        }
        case 'REMOVE-TODOLIST': {
            const stateCope = {...state}

            delete stateCope[action.todolistId]

            return stateCope
        }
        default:
            return state
    }
}

type ActionType =
    | addTaskActionType
    | removeTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId} as const
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId} as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
}
