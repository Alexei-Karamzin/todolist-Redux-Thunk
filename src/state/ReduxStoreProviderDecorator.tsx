import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import { AppRootStateType} from "./store";
import { tasksReducer } from './reducers/tasks-reducer'
import { todolistsReducer } from './reducers/todolists-reducer'
import {TaskPriority} from "../api/tasks-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: 'JS', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Beer', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: 'React Book', description: '', todoListId: 'todolistId1', order: 0, status: 1, priority: TaskPriority.Low,startDate: '', deadline: '', addedDate: ''},
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>)

/*
export const ReduxStoreProviderDecorator = (StoryFC: any/!*() => React.ReactNode*!/) => {
    return <Provider store={store}>
        {StoryFC()}
    </Provider>
}*/
