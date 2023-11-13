import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
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

export type FilterValuesType = 'all' | 'active' | 'completed'

// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }

function AppWithReducers() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchToTodolistsReducers] = useReducer(todolistsReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, dispatchToTasksReducers] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Bread', isDone: true}
        ]
    })

    function addTask(todolistId: string, title: string) {
        const action = addTaskAC(title, todolistId)
        dispatchToTasksReducers(action)
    }

    function removeTask(todolistId: string, taskId: string) {
        const action = removeTaskAC(taskId, todolistId)
        dispatchToTasksReducers(action)
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        const action = changeTaskStatusAC(taskId, newIsDone, todolistId)
        dispatchToTasksReducers(action)
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId,value)
        dispatchToTodolistsReducers(action)
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistsReducers(action)
        dispatchToTasksReducers(action)
    }
    const addTodolist = (todolistTitle: string) => {
        const action = addTodolistAC(todolistTitle)
        dispatchToTodolistsReducers(action)
        dispatchToTasksReducers(action)
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        const action =changeTaskTitleAC(taskId, title, todolistId)
        dispatchToTasksReducers(action)
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatchToTodolistsReducers(action)
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
