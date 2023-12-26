import './App.css';
import React, {useCallback, useEffect} from "react";
import AddItemForm from './AddItemForm'
import EditableSpane from "./EditableSpane";
import {Task} from "./Task";
import {FilterValuesType, TodolistDomainType} from "./state/todolists-reducer";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {useAppDispatch} from "./state/hooks";
import {fetchTasksTC} from "./state/tasks-reducer";


type TodolistPropsType = {
    todolist:TodolistDomainType
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newStatus: TaskStatuses) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo=false, ...props}: TodolistPropsType) => {

        console.log('Todolist')

        const dispatch = useAppDispatch()

        useEffect(() => {
            if (demo) {
                return
            }
            dispatch(fetchTasksTC(props.todolist.id))
        },[])

        const removeTodolist = (todolistId: string) => {
            props.removeTodolist(todolistId)
        }

        const addTask = useCallback((titleTask: string) => {
            props.addTask(props.todolist.id, titleTask)
        }, [props.addTask, props.todolist.id])
        const changeTodolistTitle = useCallback((title: string) => {
            props.changeTodolistTitle(props.todolist.id, title)
        }, [props.changeTodolistTitle, props.todolist.id])

        const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.changeFilter, props.todolist.id])
        const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.changeFilter, props.todolist.id])
        const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.changeFilter, props.todolist.id])

        let tasksForTodolists = props.tasks
        if (props.todolist.filter === 'active') {
            tasksForTodolists = tasksForTodolists.filter(t => t.status === TaskStatuses.New)
        } else if (props.todolist.filter === 'completed') {
            tasksForTodolists = tasksForTodolists.filter(t => t.status === TaskStatuses.Completed)
        }

        return (

            <div className={'Todolist'}>
                <h3>
                    <EditableSpane title={props.todolist.title} changeTitle={changeTodolistTitle}/>
                    <button onClick={() => removeTodolist(props.todolist.id)} disabled={props.todolist.entityStatus === 'loading'}>X</button>
                </h3>
                <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>

                <ul>
                    {tasksForTodolists.map(t =>
                        <Task
                            key={t.id}
                            todolistId={props.todolist.id}
                            task={t}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                        />
                    )}
                </ul>
                <div>
                    <button className={props.todolist.filter === 'all' ? 'active-button' : ""}
                            onClick={onAllClickHandler}>All
                    </button>
                    <button className={props.todolist.filter === 'active' ? 'active-button' : ""}
                            onClick={onActiveClickHandler}>Active
                    </button>
                    <button className={props.todolist.filter === 'completed' ? 'active-button' : ""}
                            onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>

        );
    }
)


