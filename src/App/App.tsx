import React, {useCallback, useEffect} from 'react';
import '../App.css';
import {TodoList} from "../component/Todolists/TodoList";
import {AddItemForm} from "../component/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector} from "react-redux";
import {
    addTaskTC,
    changeTaskStatusTC,
    changeTaskTitleTC,
    removeTasksTC
} from "../state/reducers/tasks-reducer";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, fetchTodolistsTC,
    removeTodolistTC,
    TodolistDomainType
} from "../state/reducers/todolists-reducer";
import {AppRootStateType, useAppDispatch} from "../state/store";
import {TaskStatuses, TaskType} from "../api/tasks-api";

export type FilterValueType = 'all' | 'completed' | 'active'


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export function App() {

    const dispatch = useAppDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleTC(taskId, {title}, todolistId))
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTasksTC(todolistId, taskId))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(changeTaskStatusTC(taskId, {status}, todolistId))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

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


