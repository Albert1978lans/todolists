import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, removeTask, tasksReducer, updateTaskAC} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";

export type FilterValuesType = 'all' | 'active' | 'completed'


function AppWithReducers() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchToTodolistsReducers] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: "idle"},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: "idle"},
    ])
    const [tasks, dispatchToTasksReducers] = useReducer(tasksReducer, {

        [todolistId1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                description: '',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                description: '',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'ReactJS',
                status: TaskStatuses.New,
                description: '',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'Redux',
                status: TaskStatuses.New,
                description: '',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId1
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.New,
                description: '',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'Bread',
                status: TaskStatuses.Completed,
                description: '',
                deadline: '',
                order: 0,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId1
            }
        ]
    })

    function addTask(todolistId: string, title: string) {
        const action = addTaskAC(
            {
                task: {
                    id: v1(),
                    title: title,
                    description: '',
                    todoListId: todolistId,
                    order: 0,
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    addedDate: ''
                }
            }
        )
        dispatchToTasksReducers(action)
    }

    function deleteTask(todolistId: string, taskId: string) {
        const action = removeTask({todolistId, taskId})
        // dispatchToTasksReducers(action)
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newStatus: TaskStatuses) => {
        const action = updateTaskAC({taskId: taskId, domainModel: {status: newStatus}, todolistId: todolistId})
        dispatchToTasksReducers(action)
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC({todolistId: todolistId, filter: value})
        dispatchToTodolistsReducers(action)
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC({todolistId: todolistId})
        dispatchToTodolistsReducers(action)
        dispatchToTasksReducers(action)
    }
    const addTodolist = (todolistTitle: string) => {
        const action = addTodolistAC({
            todolist: {
                id: v1(),
                title: todolistTitle,
                addedDate: '',
                order: 0
            }
        })
        dispatchToTodolistsReducers(action)
        dispatchToTasksReducers(action)
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        const action = updateTaskAC({taskId: taskId, domainModel: {title: title}, todolistId: todolistId})
        dispatchToTasksReducers(action)
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        const action = changeTodolistTitleAC({todolistId: todolistId, title: title})
        dispatchToTodolistsReducers(action)
    }

    return (
        <div className='App'>
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(tl => {
                let tasksForTodolists = tasks[tl.id]
                if (tl.filter === 'active') {
                    tasksForTodolists = tasksForTodolists.filter(t => t.status === TaskStatuses.New)
                } else if (tl.filter === 'completed') {
                    tasksForTodolists = tasksForTodolists.filter(t => t.status === TaskStatuses.Completed)
                }
                return <Todolist
                    key={tl.id}
                    todolist={tl}
                    tasks={tasksForTodolists}
                    deleteTask={deleteTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                />
            })}

        </div>
    );
}

export default AppWithReducers;
