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
    changeTaskStatus: (id: string, newIsDone: boolean) => void
    valueFilter: FilterValuesType

}

function Todolist(props: TodolistPropsType) {

    const [taskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const newTitleOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === 'Enter') {
            if(taskTitle.trim() !== '') {
                props.addTask(taskTitle.trim())
                setNewTaskTitle('')
            } else {
                setError('error')
            }

        }
    }
    const buttonOnClickHandler = () => {
        if(taskTitle.trim() !== '') {
            props.addTask(taskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('error')
        }
    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={newTitleOnChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button
                    onClick={buttonOnClickHandler}
                >+ </button>
                {error && <div className='error-message'>This requared</div>}
            </div>
            <ul>
                {props.tasks.map(t => {

                    const removeTask = () => props.removeTask(t.id)
                    const onChangeHandler =(e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? 'is-done': ''}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeHandler}
                            />
                            <span>{t.title}</span>
                            <button onClick={removeTask}>X</button>
                        </li>
                    )
                })
                }
            </ul>
            <div>
                <button className={props.valueFilter === 'all' ?'active-button':""} onClick={onAllClickHandler}>All</button>
                <button className={props.valueFilter === 'active' ?'active-button':""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.valueFilter === 'completed' ?'active-button':""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>

    );
}

export default Todolist;