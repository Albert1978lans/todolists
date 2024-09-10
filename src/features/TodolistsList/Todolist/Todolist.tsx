import '../../../app/App.css';
import React, {useCallback, useEffect} from "react";
import AddItemForm from '../../../components/AddItemForm/AddItemForm'
import EditableSpane from "../../../components/EditableSpan/EditableSpane";
import {Task} from "./Task/Task";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/types";
import {Button, IconButton, Paper} from "@mui/material";
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
        const {fetchTasks, addTaskTC} = useActions(tasksActions)

        useEffect(() => {
            if (demo) {
                return
            }
            fetchTasks(props.todolist.id)
        }, [])

        const removeTodolist = () => {
            removeTodolistTC({todolistId: props.todolist.id})
        }

        const addTask = useCallback(async (titleTask: string) => {
            const resultAction = await addTaskTC({todolistId: props.todolist.id, title: titleTask})
            if (tasksActions.addTaskTC.rejected.match(resultAction)) {
                if (resultAction.payload?.errors?.length) {
                    const errorMessage = resultAction.payload?.errors[0]
                    throw new Error(errorMessage)
                } else {
                    throw new Error('Some error')
                }

            }
        }, [])

        const changeTodolistTitle = useCallback(async (title: string) => {
            const resultAction = await changeTodolistTitleTC({todolistId: props.todolist.id, title})

            if (todolistsActions.changeTodolistTitleTC.rejected.match(resultAction)) {
                if (resultAction.payload?.errors) {
                    const error = resultAction.payload.errors[0]
                    throw new Error(error)
                }
            }

        }, [props.todolist.id])

        const onButtonClickHandler = useCallback((filter: FilterValuesType) => changeTodolistFilterAC({
            filter: filter,
            todolistId: props.todolist.id
        }), [props.todolist.id])

        let tasksForTodolists = props.tasks
        if (props.todolist.filter === 'active') {
            tasksForTodolists = tasksForTodolists.filter(t => t.status === TaskStatuses.New)
        } else if (props.todolist.filter === 'completed') {
            tasksForTodolists = tasksForTodolists.filter(t => t.status === TaskStatuses.Completed)
        }

        type ColorType = "error" | "inherit" | "primary" | "secondary" | "info" | "success" | "warning" | undefined

        const renderFilterButton = (filter: FilterValuesType, color: ColorType) => {
            return <Button variant={props.todolist.filter === filter ? 'contained' : "text"}
                           color={color}
                           onClick={() => onButtonClickHandler(filter)}>{filter}
            </Button>
        }

        return (

            <Paper style={{padding: '10px', position: 'relative'}}>
                <IconButton aria-label="delete"
                            onClick={removeTodolist}
                            disabled={props.todolist.entityStatus === 'loading'}
                            size={'small'}
                            style={{position: 'absolute', right: '5px', top: '5px'}}
                >
                    <Delete fontSize={"small"}/>
                </IconButton>
                <h3>
                    <EditableSpane title={props.todolist.title} changeTitle={changeTodolistTitle}/>
                </h3>
                <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>

                <div>
                    {tasksForTodolists.map(t =>
                        <Task
                            key={t.id}
                            todolistId={props.todolist.id}
                            task={t}
                        />
                    )}
                    {!tasksForTodolists.length && <div style={{padding: '5px', color: 'grey'}}>No tasks</div>}
                </div>
                <div>
                    {renderFilterButton('all', "primary")}
                    {renderFilterButton('active', "success")}
                    {renderFilterButton('completed', "secondary")}
                </div>
            </Paper>

        );
    }
)


