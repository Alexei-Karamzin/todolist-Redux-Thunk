import {TaskStateType, TodolistType} from "../../App/App";
import {tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriority, TaskStatuses} from "../../api/tasks-api";


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
            {id: v1(), title: "HTML&CSS", description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: "JS", description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: "ReactJS", description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: "REST API", description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''}
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
