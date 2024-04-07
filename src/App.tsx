import React, {useState} from 'react';
import './app/App.css';
import {Todolist} from "./features/TodolistsList/Todolist/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {TodolistDomainType} from "./features/TodolistsList/todolists-reducer";
import {TasksStateType} from "./features/TodolistsList/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";


function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: "idle"},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: "idle"},
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

    const addTodolist = (todolistTitle: string) => {
        const newTodolist: TodolistDomainType = {
            id: v1(),
            title: todolistTitle,
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: "idle"
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }


    return (
        <div className='App'>
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(tl => {
                return <Todolist
                    key={tl.id}
                    todolist={tl}
                    tasks={tasks[tl.id]}
                />
            })}

        </div>
    );
}

export default App;
