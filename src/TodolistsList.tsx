import {Grid, Paper} from "@mui/material";
import AddItemForm from "./AddItemForm";
import {Todolist} from "./Todolist";
import React, {useCallback, useEffect} from "react";
import {useAppSelector} from "./state/hooks";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC
} from "./state/todolists-reducer";
import {addTaskTC, removeTask, updateTaskTC} from "./state/tasks-reducer";
import {TaskStatuses} from "./api/todolists-api";
import {FilterValuesType} from "./AppWithRedux";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "./state/store";


type PropsType = {
    demo?: boolean
}

// изменение для экспериментального коммита

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

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC({todolistId, title}))
    }, [dispatch])

    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        const thunk = removeTask({todolistId, taskId})
        dispatch(thunk)
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, newStatus: TaskStatuses) => {
        dispatch(updateTaskTC({taskId: taskId, domainModel: {status: newStatus}, todolistId: todolistId}))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC({todolistId: todolistId, filter: value})
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const thunk = removeTodolistTC({todolistId})
        dispatch(thunk)
    }, [dispatch])

    const addTodolist = useCallback((todolistTitle: string) => {
        const thunk = addTodolistTC({todolistTitle})
        dispatch(thunk)
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC({taskId, domainModel: {title}, todolistId}))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        const thunk = changeTodolistTitleTC({todolistId, title})
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
                                deleteTask={deleteTask}
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
