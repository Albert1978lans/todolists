import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function removeTask(taskId:string) {
        const resultTasks = tasks.filter( t => t.id !== taskId)
        setTasks(resultTasks)
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        const newTasks = tasks.map(t => t.id === taskId ? {...t, isDone : newIsDone} : t)
        setTasks(newTasks)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    let tasksForTodolists = tasks
    if (filter === 'active') {
        tasksForTodolists = tasks.filter(t => !t.isDone)
    } else if (filter === 'completed') {
        tasksForTodolists = tasks.filter(t => t.isDone)
    }

    return (
        <div className='App'>
            <Todolist
                title='What to learn'
                tasks={tasksForTodolists}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                valueFilter={filter}
            />
        </div>
    );
}

export default App;
