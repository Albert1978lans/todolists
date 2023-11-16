
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";
import React from "react";

export default {
    title: 'Task Component',
    component: Task
}



const removeTaskCallback = action('Task removed')
const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')

export const TaskBaseExample = (props: any) => {
    return <>
        <Task
            todolistId={'todolistId1'}
            task={{id: '1', title: 'css', isDone: true}}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
        />
        <Task
            todolistId={'todolistId2'}
            task={{id: '2', title: 'React', isDone: false}}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
        />
    </>
}