import {TaskStateType, TodolistType} from "../App/App";
import {tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";


test('property with todolistId should be added', ()=>{
    const startTaskState: TaskStateType = {}
    const startTodolistState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist')
    const endTasksState = tasksReducer(startTaskState, action)
    const endTodolistsState = todolistsReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})

test('property with todolistId should be deleted', ()=>{
    const startState: TaskStateType = {
        'todolistId1': [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "REST API", isDone: false}
        ],
        'todolistId2': [
            {id: v1(), title: "beer", isDone: true},
            {id: v1(), title: "milk", isDone: false},
            {id: v1(), title: "soda", isDone: false},
        ]
    }

    const action = removeTodolistAC('todolistId1')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId1']).toBeUndefined()
})
