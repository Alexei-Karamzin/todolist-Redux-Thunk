import { v1 } from "uuid";
import {TodolistType} from "../App";

type ActionType = {
    type: string,
    [key: string]: any
}

export const todolistReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: "all"
            }]
        }
        default:
            throw new Error('ERROR')
    }
}