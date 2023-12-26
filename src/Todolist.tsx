import './App.css';
import React, {useCallback, useEffect} from "react";
import AddItemForm from './AddItemForm'
import EditableSpane from "./EditableSpane";
import {Task} from "./Task";
import {FilterValuesType} from "./state/todolists-reducer";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {useAppDispatch} from "./state/hooks";
import {fetchTasksTC} from "./state/tasks-reducer";
import {statusType} from "./state/app-reducer";


type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newStatus: TaskStatuses) => void
    valueFilter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    entityStatus: statusType
    demo?: boolean
}

export const Todolist = React.memo(({demo=false, ...props}: TodolistPropsType) => {

        console.log('Todolist')

        const dispatch = useAppDispatch()

        useEffect(() => {
            if (demo) {
                return
            }
            dispatch(fetchTasksTC(props.todolistId))
        },[])

        const removeTodolist = (todolistId: string) => {
            props.removeTodolist(todolistId)
        }

        const addTask = useCallback((titleTask: string) => {
            props.addTask(props.todolistId, titleTask)
        }, [props.addTask, props.todolistId])
        const changeTodolistTitle = useCallback((title: string) => {
            props.changeTodolistTitle(props.todolistId, title)
        }, [props.changeTodolistTitle, props.todolistId])

        const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolistId), [props.changeFilter, props.todolistId])
        const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolistId), [props.changeFilter, props.todolistId])
        const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolistId), [props.changeFilter, props.todolistId])

        let tasksForTodolists = props.tasks
        if (props.valueFilter === 'active') {
            tasksForTodolists = tasksForTodolists.filter(t => t.status === TaskStatuses.New)
        } else if (props.valueFilter === 'completed') {
            tasksForTodolists = tasksForTodolists.filter(t => t.status === TaskStatuses.Completed)
        }

        return (

            <div className={'Todolist'}>
                <h3>
                    <EditableSpane title={props.title} changeTitle={changeTodolistTitle}/>
                    <button onClick={() => removeTodolist(props.todolistId)} disabled={props.entityStatus === 'loading'}>X</button>
                </h3>
                <AddItemForm addItem={addTask}/>

                <ul>
                    {tasksForTodolists.map(t =>
                        <Task
                            key={t.id}
                            todolistId={props.todolistId}
                            task={t}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                        />
                    )}
                </ul>
                <div>
                    <button className={props.valueFilter === 'all' ? 'active-button' : ""}
                            onClick={onAllClickHandler}>All
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
)


