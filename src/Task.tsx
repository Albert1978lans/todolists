import React, {ChangeEvent} from "react";
import EditableSpane from "./EditableSpane";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newStatus: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Task = React.memo((props:TaskPropsType) => {

    const removeTask = () => props.removeTask(props.todolistId, props.task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.checked
            ? props.changeTaskStatus(props.todolistId, props.task.id, TaskStatuses.Completed)
            :props.changeTaskStatus(props.todolistId, props.task.id, TaskStatuses.New)
    }
    const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, title)
    }

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                onChange={onChangeHandler}
            />
            <EditableSpane title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete />
            </IconButton>
        </div>
    )
})