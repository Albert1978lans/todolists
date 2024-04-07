import '../../../app/App.css';
import React, {useCallback, useEffect} from "react";
import AddItemForm from '../../../components/AddItemForm/AddItemForm'
import EditableSpane from "../../../components/EditableSpan/EditableSpane";
import {Task} from "./Task/Task";
import {TodolistDomainType} from "../todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useActions} from "../../../utils/redux-utils";
import {tasksActions, todolistsActions} from "../index";


type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistPropsType) => {

        console.log('Todolist')
        const {removeTodolistTC, changeTodolistTitleTC, changeTodolistFilterAC} = useActions(todolistsActions)
        const {addTaskTC} = useActions(tasksActions)

        // const dispatch = useAppDispatch()

        const {fetchTasks} = useActions(tasksActions)

        useEffect(() => {
            if (demo) {
                return
            }
            fetchTasks(props.todolist.id)
        }, [])

        const removeTodolist = (todolistId: string) => {
            removeTodolistTC({todolistId: todolistId})
        }

        const addTask = useCallback((titleTask: string) => {
            addTaskTC({todolistId: props.todolist.id, title: titleTask})
        }, [props.todolist.id])
        const changeTodolistTitle = useCallback((title: string) => {
            changeTodolistTitleTC({todolistId: props.todolist.id, title})
        }, [props.todolist.id])

        const onAllClickHandler = useCallback(() => changeTodolistFilterAC({
            filter: 'all',
            todolistId: props.todolist.id
        }), [props.todolist.id])
        const onActiveClickHandler = useCallback(() => changeTodolistFilterAC({
            filter: 'active',
            todolistId: props.todolist.id
        }), [props.todolist.id])
        const onCompletedClickHandler = useCallback(() => changeTodolistFilterAC({
            filter: 'completed',
            todolistId: props.todolist.id
        }), [props.todolist.id])

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
                    <IconButton aria-label="delete" onClick={() => removeTodolist(props.todolist.id)}
                                disabled={props.todolist.entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>

                <ul>
                    {tasksForTodolists.map(t =>
                        <Task
                            key={t.id}
                            todolistId={props.todolist.id}
                            task={t}
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


