import {Dispatch} from "redux";

const initialState: any = {}

export const loginReducer = (state: any = initialState, action: ActionType): any => {
    switch (action.type) {
        default:
            return state
    }
}

// actions

/*export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({
    type: 'REMOVE-TASK',
    taskId,
    todolistId
} as const)*/

// thunks

export const fetchTasksTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionType>) => {

}

// types

type ActionType = any
