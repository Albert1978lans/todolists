import {Grid, Paper} from "@mui/material";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../api/todolists-api";
import {FilterValuesType} from "../../app/AppWithRedux";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectTasks, selectTodolists} from "./selectors";
import {authSelectors} from "../Auth";
import {useActions} from "../../utils/redux-utils";
import {tasksActions, todolistsActions} from "./index";


type PropsType = {
    demo?: boolean
}

// изменение для экспериментального коммита

export const TodolistsList = ({demo = false, ...props}: PropsType) => {

    // console.log('TodolistsList')

    // const dispatch = useAppDispatch()

    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const {fetchTodolistsTC, removeTodolistTC, addTodolistTC, changeTodolistTitleTC, changeTodolistFilterAC} = useActions(todolistsActions)
    const {addTaskTC, removeTask, updateTaskTC} = useActions(tasksActions)

    useEffect(() => {
        if (demo || !isLoggedIn) return
        fetchTodolistsTC()
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        addTaskTC({todolistId, title})
    }, [])

    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        removeTask({todolistId, taskId})
    }, [])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, newStatus: TaskStatuses) => {
        updateTaskTC({taskId: taskId, domainModel: {status: newStatus}, todolistId: todolistId})
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        changeTodolistFilterAC({todolistId: todolistId, filter: value})
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        removeTodolistTC({todolistId})
    }, [])

    const addTodolist = useCallback((todolistTitle: string) => {
        addTodolistTC({todolistTitle})
    }, [])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        updateTaskTC({taskId, domainModel: {title}, todolistId})
    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        changeTodolistTitleTC({todolistId, title})
    }, [])

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
