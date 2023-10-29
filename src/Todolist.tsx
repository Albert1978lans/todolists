import './App.css';
import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from './AddItemForm'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDone: boolean) => void
    valueFilter: FilterValuesType
    removeTodolist: (todolistId: string) => void

}

function Todolist(props: TodolistPropsType) {

    const removeTodolist = (todolistId: string) => {
        props.removeTodolist(todolistId)
    }

    const addTask = (titleTask: string) => {
        props.addTask(props.todolistId, titleTask)
    }

    const onAllClickHandler = () => props.changeFilter('all', props.todolistId)
    const onActiveClickHandler = () => props.changeFilter('active', props.todolistId)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.todolistId)

    return (

        <div>
            <h3>
                {props.title}
                <button onClick={() => removeTodolist(props.todolistId)}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul>
                {props.tasks.map(t => {

                    const removeTask = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
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
                <button className={props.valueFilter === 'all' ? 'active-button' : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.valueFilter === 'active' ? 'active-button' : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.valueFilter === 'completed' ? 'active-button' : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>

    );
}

export default Todolist;

