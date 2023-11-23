import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    console.log('AppWithRedux')

    const  dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const addTask = useCallback(  (todolistId: string, title: string) => {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    }, [dispatch])

    const removeTask = useCallback( (todolistId: string, taskId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback( (todolistId: string, taskId: string, newStatus: TaskStatuses) => {
        const action = changeTaskStatusAC(taskId, newStatus, todolistId)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback( (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId,value)
        dispatch(action)
    }, [dispatch])
    const removeTodolist = useCallback( (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback((todolistTitle: string) => {
        const action = addTodolistAC(todolistTitle)
        dispatch(action)
    }, [dispatch])
    const changeTaskTitle = useCallback( (todolistId: string, taskId: string, title: string) => {
        const action =changeTaskTitleAC(taskId, title, todolistId)
        dispatch(action)
    }, [dispatch])
    const changeTodolistTitle = useCallback( (todolistId: string, title: string) => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatch(action)
    }, [dispatch])

    return (
        <div className='App'>
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(tl => {

                return <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    valueFilter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                />
            })}

        </div>
    );
}

export default AppWithRedux;
