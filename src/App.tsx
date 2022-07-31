import React from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {AppRootStateType} from "./state/store";

export type FilterValueType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

export function App() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    const changeFilter = (value: FilterValueType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }
    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }
    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasks[tl.id]

                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(task => task.isDone === true)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(task => task.isDone === false)
                            }

                            return <Grid item>
                                <Paper elevation={3} style={{padding: '10px'}}>
                                    <TodoList
                                        key={tl.id}
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeTaskStatus}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        onChangeTitle={changeTodolistTitle}
                                        filter={tl.filter}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


