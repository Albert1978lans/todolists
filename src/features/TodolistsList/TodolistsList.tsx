import {Grid, Paper} from "@mui/material";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import React, {useCallback, useEffect} from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectTasks, selectTodolists} from "./selectors";
import {authSelectors} from "../Auth";
import {useActions} from "../../utils/redux-utils";
import {todolistsActions} from "./index";


type PropsType = {
    demo?: boolean
}

// изменение для экспериментального коммита

export const TodolistsList = ({demo = false, ...props}: PropsType) => {

    console.log('TodolistsList')

    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const {fetchTodolistsTC, addTodolistTC} = useActions(todolistsActions)


    useEffect(() => {
        if (demo || !isLoggedIn) return
        fetchTodolistsTC()
    }, [])

    const addTodolist = useCallback(async (todolistTitle: string) => {
        const resActions = await addTodolistTC({todolistTitle})
        if (todolistsActions.addTodolistTC.rejected.match(resActions)) {
            if (resActions.payload?.errors) {
                const error = resActions.payload.errors[0]
                throw new Error(error)
            } else {
                throw new Error('some error')
            }
        }
    }, [])
    if (!isLoggedIn) {
        return <Navigate replace to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3} style={{flexWrap: 'nowrap', overflowX: 'scroll'}}>
                {todolists.map(tl => {
                    return <Grid item key={tl.id} >
                        <div style={{width: '300px'}}>
                            <Todolist
                                key={tl.id}
                                todolist={tl}
                                tasks={tasks[tl.id]}
                                demo={demo}
                            />
                        </div>
                    </Grid>
                })}
            </Grid>
        </>
    )
}
