import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

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

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'tl 1', filter: "all"},
        {id: todolistId2, title: 'tl 2', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "REST API", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "beer", isDone: true},
            {id: v1(), title: "milk", isDone: false},
            {id: v1(), title: "soda", isDone: false},
        ]
    })

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const removeTodolist = (todolistId: string) => {
        let newTodolists = todolists.filter(tl => tl.id !== todolistId)

        setTodolists([...newTodolists])
    }
    const addTodolist = (title: string) => {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        todolists.map(tl => tl.id === todolistId ? tl.title = title : null)
        setTodolists([...todolists])
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        tasks[todolistId].map(ts => ts.id === taskId ? ts.title = title : null)
        setTasks({...tasks})
    }
    const removeTask = (taskId: string, todolistId: string) => {
        let resultTasks = tasks[todolistId].filter(task => task.id !== taskId)
        tasks[todolistId] = resultTasks
        setTasks({...tasks})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let changeTask = tasks[todolistId].find(t => t.id === taskId)
        if (changeTask) {
            changeTask.isDone = isDone
        }

        setTasks({...tasks})
    }
    const addTask = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title, isDone: false}
        let todolistTask = tasks[todolistId]
        let newTasks = [newTask, ...todolistTask]
        tasks[todolistId] = newTasks
        setTasks({...tasks})
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


