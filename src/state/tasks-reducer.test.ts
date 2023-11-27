import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, setTasksAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, setTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {v1} from "uuid";

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: 'todolistId1', description: '', order: 0, addedDate: '', deadline: '', priority: TaskPriorities.Low, startDate: ''},
            { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '', order: 0, addedDate: '', deadline: '', priority: TaskPriorities.Low, startDate: '' },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: 'todolistId1', description: '', order: 0, addedDate: '', deadline: '', priority: TaskPriorities.Low, startDate: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: 'todolistId2', description: '', order: 0, addedDate: '', deadline: '', priority: TaskPriorities.Low, startDate: '' },
            { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '', order: 0, addedDate: '', deadline: '', priority: TaskPriorities.Low, startDate: '' },
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: 'todolistId2', description: '', order: 0, addedDate: '', deadline: '', priority: TaskPriorities.Low, startDate: '' }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('todolistId2', '2')
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(2)
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy()
})

test('correct task should be added to correct array', () => {

        const action = addTaskAC(
        {
            id : v1(),
            title : 'juce',
            description : '',
            todoListId : 'todolistId2',
            order : 0,
            status : TaskStatuses.New,
            priority : TaskPriorities.Low,
            startDate : '',
            deadline : '',
            addedDate : ''
        }
    )

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId2"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe('juce')
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC('2', 'Milkyway', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Milkyway')
    expect(endState['todolistId1'][1].title).toBe('JS')
})

test('new property with new array should be added when new todolist is added', () => {

    const action = addTodolistAC('new todolist')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')

    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistsId shouls be deleted', () => {

    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)


    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
})

test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistAC([
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 2', order: 0, addedDate: ''}
    ])


    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)


    expect(keys.length).toBe(2)
    expect(endState['1']).toEqual([])
    expect(endState['2']).toEqual([])
})

test('tasks should be added for todolist', () => {

    const action = setTasksAC("todolistId2", startState["todolistId2"])

    const endState = tasksReducer(
        {
            ["todolistId1"]: [],
            ["todolistId2"]: []
        },
        action
    )

    expect(endState['todolistId1'].length).toBe(0)
    expect(endState['todolistId2'].length).toBe(3)
})


