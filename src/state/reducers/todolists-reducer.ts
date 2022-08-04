import {v1} from "uuid";
import {FilterValueType, TodolistType} from "../../App/App";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistId: string
    value: FilterValueType
}

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialState: Array<TodolistType> = [
    {id: todolistId1, title: 'tl 1', filter: "all"},
    {id: todolistId2, title: 'tl 2', filter: 'all'}
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.value} : tl)
        }
        default:
            return state
    }
}

type ActionType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const
}

export const changeTodolistFilterAC = (value: FilterValueType, todolistId: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', value, todolistId} as const
}