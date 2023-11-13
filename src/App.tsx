import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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
        let newTask = {id: v1(), title: title, isDone: false}
        // let newTasks = [newTask, ...tasks]
        // setTasks(newTasks)

        let newTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        setTasks(newTasks)
    }

    function removeTask(todolistId: string, taskId: string) {
        const resultTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        setTasks(resultTasks)
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        // const newTasks = tasks.map(t => t.id === taskId ? {...t, isDone : newIsDone} : t)
        const newTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)
        }
        setTasks(newTasks)
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let newTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl)
        setTodolists(newTodolists)
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(
            todolists.filter(tl => tl.id !== todolistId)
        )
        delete tasks[todolistId]
    }
    const addTodolist = (todolistTitle: string) => {
        const newTodolist: TodolistType = {id: v1(), title: todolistTitle, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks(
            {
                ...tasks,
                [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: title} : t)
            }
        )
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: title} : tl))
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

export default App;
