import {v1} from "uuid";
import {FilterValueType, TaskStateType, TodolistType} from "../App";

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

export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.title, isDone: false}
            let newTasks = [newTask, ...state[action.todolistId]]
            state[action.todolistId] = newTasks
            return {...state}
        }
        case 'REMOVE-TASK': {
            let copyState = {...state}
            let resultTasks = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            copyState[action.todolistId] = resultTasks
            return copyState
        }
        case 'CHANGE-TASK-STATUS': {
            let copyState = {...state}
            let changeTask = copyState[action.todolistId].find(t => t.id === action.taskId)
            if (changeTask) {
                changeTask.isDone = action.isDone
            }
            return copyState
        }
        case 'CHANGE-TASK-TITLE': {
            let copyState = {...state}
            copyState[action.todolistId].map(ts => ts.id === action.taskId ? ts.title = action.title : null)
            return copyState
        }
        default:
            throw new Error('ERROR')
    }
}

type ActionType =
    | addTaskActionType
    | removeTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType

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