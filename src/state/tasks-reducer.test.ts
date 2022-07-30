import { v1 } from "uuid";
import {
} from "./todolists-reducer";
import {TaskStateType} from "../App";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasks-reducer";

test('correct task should be added', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TaskStateType = {
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

    const endState = tasksReducer(startState, addTaskAC('new title', todolistId1))

    expect(endState[todolistId1].length).toBe(5)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1][0].title).toBe('new title')
})

test('correct task should be removed', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TaskStateType = {
        [todolistId1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "REST API", isDone: false}
        ],
        [todolistId2]: [
            {id: '6', title: "beer", isDone: true},
            {id: '7', title: "milk", isDone: false},
            {id: '8', title: "soda", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, removeTaskAC('1', todolistId1))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1].every(t=>t.id!='1')).toBeTruthy()
})

test('correct task should be change status', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TaskStateType = {
        [todolistId1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "REST API", isDone: false}
        ],
        [todolistId2]: [
            {id: '6', title: "beer", isDone: true},
            {id: '7', title: "milk", isDone: false},
            {id: '8', title: "soda", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, changeTaskStatusAC('1', false, todolistId1))

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1][0].isDone).toBe(false)
    expect(endState[todolistId1][1].isDone).toBe(true)
})

test('correct task should be change title', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TaskStateType = {
        [todolistId1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "REST API", isDone: false}
        ],
        [todolistId2]: [
            {id: '6', title: "beer", isDone: true},
            {id: '7', title: "milk", isDone: false},
            {id: '8', title: "soda", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, changeTaskTitleAC(todolistId1, '1', 'new title'))

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][0].title).toBe('beer')
    expect(endState[todolistId1][0].title).toBe('new title')
})


