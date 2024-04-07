import {action} from '@storybook/addon-actions'
import {Task} from "./Task";
import React from "react";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolists-api";
import {ReduxStoreProviderDecorator} from "../../../../stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}



const removeTaskCallback = action('Task removed')
const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')

export const TaskBaseExample = (props: any) => {
    return <>
        <Task
            todolistId={'todolistId1'}
            task={{id: '1', title: 'css', status: TaskStatuses.Completed, description: '', deadline: '',
                order: 0, addedDate: '', startDate: '', priority: TaskPriorities.Low, todoListId: 'todolistId1'}}
        />
        <Task
            todolistId={'todolistId2'}
            task={{id: '2', title: 'React', status: TaskStatuses.New, description: '', deadline: '',
                order: 0, addedDate: '', startDate: '', priority: TaskPriorities.Low, todoListId: 'todolistId2'}}
        />
    </>
}