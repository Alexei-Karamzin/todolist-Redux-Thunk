import {FilterValueType} from "../../App/App";
import {todolistsApi, TodolistType} from "../../api/todolists-api";
import { Dispatch } from "redux";
import {RequestStatusType, setStatusAC, SetStatusActionType} from "../../App/app-reducer";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter( tl => tl.id != action.todolistId)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map( tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map( tl => tl.id === action.todolistId ? {...tl, filter: action.value} : tl)
        case "SET-TODOLIST":
            return action.todolists.map( tl => ({...tl, filter: "all", entityStatus: "idle"}))
        default:
            return state
    }
}

// actions

export const setTodolistAC = (todolists: Array<TodolistType>) =>
    ({
    type: 'SET-TODOLIST',
    todolists
} as const)
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    title
} as const)
export const changeTodolistFilterAC = (value: FilterValueType, todolistId: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER',value,todolistId} as const)

// thunks

export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC('loading'))
    todolistsApi.getTodolists()
            .then((res) => {
                dispatch(setTodolistAC(res.data))
                dispatch(setStatusAC('succeeded'))
            })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsApi.deleteTodolist(id)
        .then((res) => {
            dispatch(removeTodolistAC(id))
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsApi.updateTodolist(title, id)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC('loading'))
    todolistsApi.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setStatusAC('succeeded'))
        })
}

//types

type ActionType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistActionType
    | SetStatusActionType

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistAC>
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}