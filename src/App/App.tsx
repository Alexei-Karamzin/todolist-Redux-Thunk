import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {TaskType} from "../api/tasks-api";
import {TodolistsList} from "../features/Todolist/TodolistsList";
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "../component/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {Route, Routes} from "react-router-dom";
import {Login} from '../features/Login/Login';

export type FilterValueType = 'all' | 'completed' | 'active'

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

export function App({demo = false}: PropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
            <div className="App">
                <ErrorSnackbar />
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
                    {status === 'loading' && <LinearProgress color="success"/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={"/"} element={<TodolistsList demo={demo}/>}/>
                        <Route path={"/login"} element={<Login />}/>
                    </Routes>
                </Container>
            </div>
    );
}



