import './App.css';
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

function Todolist(props: TodolistPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')

    const newTitleOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const buttonOnClickHandler = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={newTitleOnChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button
                    onClick={buttonOnClickHandler}
                >+
                </button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    const removeTask = () => props.removeTask(t.id)
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={removeTask}>X</button>
                        </li>
                    )
                })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>

    );
}

export default Todolist;