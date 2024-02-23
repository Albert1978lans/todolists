
import {addTodolistTC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const newTodolist = {todolist:{
            id: 'new Todolist',
            title: 'new todolist',
            order: 0,
            addedDate: ''
        }}

    const action = addTodolistTC.fulfilled(newTodolist, '',
        {todolistTitle: newTodolist.todolist.title})

    const endTaskState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTaskState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})