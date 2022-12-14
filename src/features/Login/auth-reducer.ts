import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../App/app-reducer";
import {authApi, LoginParamsType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions

export const setIsLoggedInAC = (value: boolean) =>
    ({
        type: 'login/SET-IS-LOGGED-IN',
        value
    } as const)

// thunks

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionType | SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch<ActionType | SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

// types

type ActionType =
    | ReturnType <typeof setIsLoggedInAC>

type InitialStateType = {
    isLoggedIn: boolean
}
