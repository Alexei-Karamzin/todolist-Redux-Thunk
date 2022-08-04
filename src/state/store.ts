import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./reducers/todolists-reducer";
import {tasksReducer} from "./reducers/tasks-reducer";

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)



// @ts-ignore
window.store = store