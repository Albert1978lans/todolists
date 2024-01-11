import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC, fetchTodolistsTC,
    removeTodolistTC
} from "./state/todolists-reducer";
import {
    addTaskTC,
    removeTaskTC, updateTaskTC,
} from "./state/tasks-reducer";
import {useAppDispatch, useAppSelector} from "./state/hooks";
import {TaskStatuses} from "./api/todolists-api";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = 'all' | 'active' | 'completed'

type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false, ...props}: PropsType) {

    console.log('AppWithRedux')

    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const status = useAppSelector(state => state.app.status)

    useEffect(() => {
        if (demo) return
        dispatch(fetchTodolistsTC())
    }, [])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskTC(todolistID, title))
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        const thunk = removeTaskTC(todolistId, taskId)
        dispatch(thunk)
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, newStatus: TaskStatuses) => {
        const thunk = updateTaskTC(taskId, {status: newStatus}, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const thunk = removeTodolistTC(todolistId)
        dispatch(thunk)
    }, [dispatch])

    const addTodolist = useCallback((todolistTitle: string) => {
        const thunk = addTodolistTC(todolistTitle)
        dispatch(thunk)
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        const action = updateTaskTC(taskId, {title: title}, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        const thunk = changeTodolistTitleTC(todolistId, title)
        dispatch(thunk)
    }, [dispatch])

    return (
        <div className='App'>
            <ErrorSnackbar/>
            {status === 'loading' && <LinearProgress/>}
            <div className='App-container'>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <Menu/>
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
                    <Grid container spacing={3}>
                        {todolists.map(tl => {

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    todolist={tl}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                        })}
                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default AppWithRedux;
