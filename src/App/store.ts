import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../features/Todolist/todolists-reducer";
import {tasksReducer} from "../features/Todolist/tasks-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./app-reducer";

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

type AppDispatchType = ThunkDispatch<AppRootStateType, void, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()


// @ts-ignore
window.store = store