import React, {ChangeEvent} from "react";
import EditableSpane from "../../../../components/EditableSpan/EditableSpane";
import {TaskStatuses, TaskType} from "../../../../api/types";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useActions} from "../../../../utils/redux-utils";
import {tasksActions} from "../../index";


type TaskPropsType = {
    todolistId: string
    task: TaskType
}

export const Task = React.memo((props:TaskPropsType) => {
    const {todolistId, task} = props
    console.log('Task')

    const {removeTask, updateTaskTC} = useActions(tasksActions)

    const deleteTask = () => removeTask({todolistId: todolistId, taskId: task.id})
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.checked
            ? updateTaskTC({taskId: task.id, domainModel:{status: TaskStatuses.Completed}, todolistId: todolistId})
            : updateTaskTC({taskId: task.id, domainModel:{status: TaskStatuses.New}, todolistId: todolistId})
    }
    const changeTaskTitle = (title: string) => {
        updateTaskTC({taskId: task.id, domainModel:{title}, todolistId: todolistId})
    }

    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''} style={{position: 'relative'}}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={onChangeHandler}
            />
            <EditableSpane title={task.title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={deleteTask} style={{position: 'absolute', top: '2px', right: '2px'}}>
                <Delete />
            </IconButton>
        </div>
    )
})