import React, {ChangeEvent} from "react";
import EditableSpane from "./EditableSpane";
import {TaskType} from "./Todolist";


type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Task = React.memo((props:TaskPropsType) => {

    const removeTask = () => props.removeTask(props.todolistId, props.task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked)
    }
    const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, title)
    }

    return (
        <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <input
                type="checkbox"
                checked={props.task.isDone}
                onChange={onChangeHandler}
            />
            <EditableSpane title={props.task.title} changeTitle={changeTaskTitle}/>
            <button onClick={removeTask}>X</button>
        </li>
    )
})