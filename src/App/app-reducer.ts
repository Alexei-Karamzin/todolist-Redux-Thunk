
const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

// actions

export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

// types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = typeof initialState

/*export type InitialStateType = {
    //происходит ли взаимодействие с сервером
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    // текст ошибки в параметр string
    error: null | string
}*/

export type SetErrorActionType = ReturnType<typeof setErrorAC>;
export type SetStatusActionType = ReturnType<typeof setStatusAC>;
type ActionsType =
    | SetErrorActionType
    | SetStatusActionType
