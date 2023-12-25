import {AppRootStateType} from "../state/store";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistId1, todolistId2, todolistsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})



const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: "idle"},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: "idle"},
    ],
    tasks: {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, description: '', deadline: '', order: 0, addedDate: '', startDate: '', priority: TaskPriorities.Low, todoListId: todolistId1},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, description: '', deadline: '', order: 0, addedDate: '', startDate: '', priority: TaskPriorities.Low, todoListId: todolistId1},
            {id: v1(), title: 'ReactJS', status: TaskStatuses.New, description: '', deadline: '', order: 0, addedDate: '', startDate: '', priority: TaskPriorities.Low, todoListId: todolistId1},
            {id: v1(), title: 'Redux', status: TaskStatuses.New, description: '', deadline: '', order: 0, addedDate: '', startDate: '', priority: TaskPriorities.Low, todoListId: todolistId1},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', status: TaskStatuses.New, description: '', deadline: '', order: 0, addedDate: '', startDate: '', priority: TaskPriorities.Low, todoListId: todolistId2},
            {id: v1(), title: 'Bread', status: TaskStatuses.Completed, description: '', deadline: '', order: 0, addedDate: '', startDate: '', priority: TaskPriorities.Low, todoListId: todolistId2}
        ]
    },
    app: {
        status: "idle",
        error: null
    }
}

export const storyBookStore = createStore(rootReducer,initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}