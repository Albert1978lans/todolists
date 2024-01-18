import {v1} from "uuid";
import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistAC, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {statusType} from "./app-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: "idle"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC({todolistId: todolistId1}))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})

test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, addTodolistAC({todolist: {
        id: 'new Todolist',
        title: newTodolistTitle,
        order: 0,
        addedDate: ''
    }}))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('all')

})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, changeTodolistTitleAC({todolistId: todolistId2, title: newTodolistTitle}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)

})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed'

    const action = changeTodolistFilterAC({todolistId: todolistId2, filter: newFilter})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)

})

test('todolists should be set to the state', () => {

    const todolists: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: "idle"},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: "idle"},
    ]

    const action = setTodolistAC({todolists: todolists})

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)

})

test('correct entityStatus of todolist should be changed', () => {

    let newStatus: statusType = 'loading'

    const action = changeTodolistEntityStatusAC({status: newStatus , todolistId: todolistId2})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe('loading')

})