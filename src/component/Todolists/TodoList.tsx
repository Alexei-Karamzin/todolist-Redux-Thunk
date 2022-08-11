import React, {useCallback, useEffect} from "react";
import {FilterValueType} from "../../App/App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditebleSpan/EditableSpan";

import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import {Button} from "@mui/material";
import {Task} from "../Tasks/Task";
import {TaskStatuses, TaskType} from "../../api/tasks-api";
import {useDispatch} from "react-redux";
import { fetchTasksTC } from "../../state/reducers/tasks-reducer";
import {useAppDispatch} from "../../state/store";

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    onChangeTitle: (todolistId: string, title: string) => void
    filter: FilterValueType
}


export const TodoList = React.memo((props: TodolistPropsType) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todolistId))
    }, [])

    const onChangeCheckboxHandler = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        props.changeStatus(taskId, status, todolistId)
    }, [props.changeStatus])

    const removeTodolistHandler = (todolistId: string) => {
        props.removeTodolist(todolistId)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistId)
    }, [props.addTask, props.todolistId])

    const onChangeTitleHandler = useCallback((title: string) => {
        props.onChangeTitle(props.todolistId, title)
    }, [props.onChangeTitle, props.todolistId])

    let taskForTodolist = props.tasks
    if (props.filter === 'completed') {
        taskForTodolist = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    }
    if (props.filter === 'active') {
        taskForTodolist = props.tasks.filter(task => task.status === TaskStatuses.New)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title}
                              onChangeInputSpan={onChangeTitleHandler}
                />
                <CancelPresentationIcon onClick={() => removeTodolistHandler(props.todolistId)}/>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    taskForTodolist.map((el) => <Task
                        key={el.id}
                        task={el}
                        removeTask={props.removeTask}
                        todolistId={props.todolistId}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={onChangeCheckboxHandler}
                    />)
                }
            </div>
            <div>
                <Button
                    color={"secondary"}
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    onClick={() => props.changeFilter("all", props.todolistId)}
                >All
                </Button>
                <Button
                    color={"success"}
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    onClick={() => props.changeFilter("active", props.todolistId)}
                >Active
                </Button>
                <Button
                    color={"error"}
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    onClick={() => props.changeFilter("completed", props.todolistId)}
                >Completed
                </Button>
            </div>
        </div>
    )
})


// react-scripts --openssl-legacy-provider start