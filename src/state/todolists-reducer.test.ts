import { v1 } from "uuid";
import {todolistReducer} from "./todolist-reducer";
import {TodolistType} from "../App";

test('correct todolist should be removed', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'test_1', filter: "all"},
        {id: todolistId2, title: 'test_2', filter: "all"}
    ]

    const endState = todolistReducer(startState, {type: 'REMOVE-TODOLIST', todolistId: todolistId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be added', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'test_1', filter: "all"},
        {id: todolistId2, title: 'test_2', filter: "all"}
    ]

    const endState = todolistReducer(startState, {type: 'ADD-TODOLIST', title: 'new title'})

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('new title')
})