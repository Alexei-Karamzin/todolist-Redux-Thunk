import {v1} from "uuid";
import {TaskStateType} from "../../App/App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTaskAC, tasksReducer} from "./tasks-reducer";
import {TaskPriority, TaskStatuses} from "../../api/tasks-api";
import {setTodolistAC} from "./todolists-reducer";

test('correct task should be added', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TaskStateType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''}
        ],
        [todolistId2]: [
            {id: v1(), title: 'test 1', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: 'test 2', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: 'test 3', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
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
            {id: '1', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: '2', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: '3', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: '4', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''}
        ],
        [todolistId2]: [
            {id: '5', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: '6', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: '7', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''}
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
            {id: '1', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: '2', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: '3', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: '4', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''}
        ],
        [todolistId2]: [
            {id: '5', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: '6', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: '7', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''}
        ]
    }

    const endState = tasksReducer(startState, changeTaskStatusAC('2', TaskStatuses.Completed, todolistId1))

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1][0].status).toBe(TaskStatuses.InProgress)
    expect(endState[todolistId1][1].status).toBe(TaskStatuses.Completed)
})

test('correct task should be change title', ()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TaskStateType = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: '2', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: '3', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: '4', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''}
        ],
        [todolistId2]: [
            {id: '5', title: 'beer', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: '6', title: 'beer', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: '7', title: 'beer', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''}
        ]
    }

    const endState = tasksReducer(startState, changeTaskTitleAC(todolistId1, '1', 'new title'))

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][0].title).toBe('beer')
    expect(endState[todolistId1][0].title).toBe('new title')
})


test('empty arrays should be added when we set todolists', ()=>{

    const endState = tasksReducer({}, setTodolistAC(
        [
            {id: '1', title: 'HTML&CSS', order: 0, addedDate: ''},
            {id: '2', title: 'HTML&CSS', order: 0, addedDate: ''}
        ]
    ))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})


test('tasks should be added for todolists', ()=>{

    const endState = tasksReducer({
        'todolistId1': [],
        'todolistId2': []
    }, setTaskAC([
        {id: '1', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
        {id: '2', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
        {id: '3', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
        {id: '4', title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''}
    ], 'todolistId1'
    ))

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(0)
})