import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')
    // const task2 = [
    //     {id: 1, title: 'Hello World', isDone: true},
    //     {id: 2, title: 'I am Happy', isDone: false},
    //     {id: 3, title: 'Yo', isDone: false},
    // ]

    function removeTask(id:number) {
        const resultTasks = tasks.filter( t => t.id !== id)
        setTasks(resultTasks)
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
            />
            {/*<Todolist title='Songs' tasks={task2}/>*/}
        </div>
    );
}

export default App;
