import '../../../app/App.css';
import React, {useCallback, useEffect} from "react";
import AddItemForm from '../../../components/AddItemForm/AddItemForm'
import EditableSpane from "../../../components/EditableSpan/EditableSpane";
import {Task} from "./Task/Task";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useActions} from "../../../utils/redux-utils";
import {tasksActions} from "../index";


type TodolistPropsType = {
    todolist:TodolistDomainType
    tasks: TaskType[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newStatus: TaskStatuses) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo=false, ...props}: TodolistPropsType) => {

        // console.log('Todolist')

        // const dispatch = useAppDispatch()

        const {fetchTasks} = useActions(tasksActions)

        useEffect(() => {
            if (demo) {
                return
            }
            fetchTasks(props.todolist.id)
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
                    {/*<button onClick={() => removeTodolist(props.todolist.id)} disabled={props.todolist.entityStatus === 'loading'}>X</button>*/}
                    <IconButton aria-label="delete" onClick={() => removeTodolist(props.todolist.id)} disabled={props.todolist.entityStatus === 'loading'}>
                        <Delete />
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>

                <ul>
                    {tasksForTodolists.map(t =>
                        <Task
                            key={t.id}
                            todolistId={props.todolist.id}
                            task={t}
                            deleteTask={props.deleteTask}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                        />
                    )}
                </ul>
                <div>
                    <Button variant={props.todolist.filter === 'all' ? 'contained' : "text"}
                            onClick={onAllClickHandler}>All
                    </Button>
                    <Button variant={props.todolist.filter === 'active' ? 'contained' : "text"}
                            color={'success'}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button variant={props.todolist.filter === 'completed' ? 'contained' : "text"}
                            color={"secondary"}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>

        );
    }
)


