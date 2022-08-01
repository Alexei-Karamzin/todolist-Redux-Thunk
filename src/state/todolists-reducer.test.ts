import { v1 } from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {TodolistType} from "../App/App";

test('correct todolist should be removed', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'test_1', filter: "all"},
        {id: todolistId2, title: 'test_2', filter: "all"}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

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

    const endState = todolistsReducer(startState, addTodolistAC('new title'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('new title')
})

test('correct todolist should be changed title', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'test_1', filter: "all"},
        {id: todolistId2, title: 'test_2', filter: "all"}
    ]

    const endState = todolistsReducer(startState,changeTodolistTitleAC(todolistId2,'new title'))

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe('new title')
})

test('correct todolist changed filter', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'test_1', filter: "all"},
        {id: todolistId2, title: 'test_2', filter: "all"}
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC('completed', todolistId2))

    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe('completed')
    expect(endState[0].filter).toBe('all')
})