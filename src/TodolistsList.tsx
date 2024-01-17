import {Grid, Paper} from "@mui/material";
import AddItemForm from "./AddItemForm";
import {Todolist} from "./Todolist";
import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./state/hooks";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC
} from "./state/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./state/tasks-reducer";
import {TaskStatuses} from "./api/todolists-api";
import {FilterValuesType} from "./AppWithRedux";
import {Navigate} from "react-router-dom";


type PropsType = {
    demo?: boolean
}

export const TodolistsList = ({demo = false, ...props}: PropsType) => {

    // console.log('TodolistsList')

    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) return
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

    if (!isLoggedIn) {
        return <Navigate replace to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(tl => {

                    return <Grid key={tl.id} item>
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
        </>
    )
}
