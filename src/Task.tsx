import React from "react";
import {Checkbox, IconButton} from "@mui/material";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import {EditableSpan} from "./EditebleSpan";
import RestoreFromTrashSharpIcon from "@mui/icons-material/RestoreFromTrashSharp";
import {TasksType} from "./TodoList";


type TaskPropsType = {
    task: TasksType
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    removeTask: (id: string, todolistId: string) => void
    todolistId: string
    onChangeCheckboxHandler: (taskId: string, isDone: boolean, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const onChangeTitleHandler = (title: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, title)
    }

    const removeTaskHandler = () => props.removeTask(props.task.id, props.todolistId)

    return <div className={props.task.isDone ? 'isDone' : ''} key={props.task.id}>
        <Checkbox
            icon={<CheckCircleOutlineSharpIcon/>}
            checkedIcon={<CheckCircleSharpIcon/>}
            checked={props.task.isDone}
            onChange={(e) => props.onChangeCheckboxHandler(props.task.id, e.currentTarget.checked, props.todolistId)}
        />
        <EditableSpan title={props.task.title} onChangeInputSpan={onChangeTitleHandler}/>
        <IconButton onClick={removeTaskHandler}>
            <RestoreFromTrashSharpIcon/>
        </IconButton>
    </div>
})