import React, {useReducer} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    const  dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    function addTask(todolistId: string, title: string) {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    }

    function removeTask(todolistId: string, taskId: string) {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        const action = changeTaskStatusAC(taskId, newIsDone, todolistId)
        dispatch(action)
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId,value)
        dispatch(action)
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }
    const addTodolist = (todolistTitle: string) => {
        const action = addTodolistAC(todolistTitle)
        dispatch(action)
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        const action =changeTaskTitleAC(taskId, title, todolistId)
        dispatch(action)
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatch(action)
    }

    return (
        <div className='App'>
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(tl => {
                let tasksForTodolists = tasks[tl.id]
                if (tl.filter === 'active') {
                    tasksForTodolists = tasksForTodolists.filter(t => !t.isDone)
                } else if (tl.filter === 'completed') {
                    tasksForTodolists = tasksForTodolists.filter(t => t.isDone)
                }
                return <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolists}
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

export default AppWithReducers;
