import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {FilterValuesType, TodolistDomainType} from "./state/todolists-reducer";
import {TasksStateType} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";


function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, description: '', deadline: '', order: 0, addedDate: '', startDate: '', priority: TaskPriorities.Low, todoListId: todolistId1},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, description: '', deadline: '', order: 0, addedDate: '', startDate: '', priority: TaskPriorities.Low, todoListId: todolistId1},
            {id: v1(), title: 'ReactJS', status: TaskStatuses.New, description: '', deadline: '', order: 0, addedDate: '', startDate: '', priority: TaskPriorities.Low, todoListId: todolistId1},
            {id: v1(), title: 'Redux', status: TaskStatuses.New, description: '', deadline: '', order: 0, addedDate: '', startDate: '', priority: TaskPriorities.Low, todoListId: todolistId1},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', status: TaskStatuses.New, description: '', deadline: '', order: 0, addedDate: '', startDate: '', priority: TaskPriorities.Low, todoListId: todolistId1},
            {id: v1(), title: 'Bread', status: TaskStatuses.Completed, description: '', deadline: '', order: 0, addedDate: '', startDate: '', priority: TaskPriorities.Low, todoListId: todolistId1}
        ]
    })

    function addTask(todolistId: string, title: string) {
        let newTask = {id: v1(), title: title, status: TaskStatuses.New, description: '', deadline: '', order: 0, addedDate: '', startDate: '', priority: TaskPriorities.Low, todoListId: todolistId1}

        let newTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        setTasks(newTasks)
    }

    function removeTask(todolistId: string, taskId: string) {
        const resultTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        setTasks(resultTasks)
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newStatus: TaskStatuses) => {
        const newTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, status: newStatus} : t)
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
        const newTodolist: TodolistDomainType = {id: v1(), title: todolistTitle, filter: "all", addedDate: '', order: 0}
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

export default App;
