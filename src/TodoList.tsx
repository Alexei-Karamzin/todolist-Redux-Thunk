import React, {useCallback} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditebleSpan";

import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import {Button, Checkbox, IconButton} from "@mui/material";
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import RestoreFromTrashSharpIcon from '@mui/icons-material/RestoreFromTrashSharp';

 type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    onChangeTitle: (todolistId: string, title: string) => void
    filter: FilterValueType
}

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export const TodoList = React.memo((props: TodolistPropsType) => {

    console.log('todolist call')

    const onChangeCheckboxHandler = (taskId: string, isDone: boolean, todolistId: string) => {
        debugger
        props.changeStatus(taskId, isDone, todolistId)
    }

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
        taskForTodolist = props.tasks.filter(task => task.isDone === true)
    }
    if (props.filter === 'active') {
        taskForTodolist = props.tasks.filter(task => task.isDone === false)
    }

    return (
        <div>
            <EditableSpan
                title={props.title}
                onChangeInputSpan={onChangeTitleHandler}
            />
            <CancelPresentationIcon
                onClick={() => removeTodolistHandler(props.todolistId)}
            />
            <AddItemForm
                addItem={addTask}
            />
            <div>
                {
                    taskForTodolist.map((el) => {

                        const onChangeTitleHandler = (title: string) => {
                            props.changeTaskTitle(props.todolistId, el.id, title)
                        }

                        const removeTaskHandler = () => props.removeTask(el.id, props.todolistId)

                        return <div className={el.isDone ? 'isDone' : ''} key={el.id}>
                            <Checkbox
                                icon={<CheckCircleOutlineSharpIcon />}
                                checkedIcon={<CheckCircleSharpIcon />}
                                checked={el.isDone}
                                onChange={(e) => onChangeCheckboxHandler(el.id, e.currentTarget.checked, props.todolistId)}
                            />
                            <EditableSpan title={el.title} onChangeInputSpan={onChangeTitleHandler}/>
                            <IconButton onClick={removeTaskHandler}>
                                <RestoreFromTrashSharpIcon />
                            </IconButton>
                        </div>
                    })
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