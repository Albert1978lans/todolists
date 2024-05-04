import {AppRootStateType, RootReducer} from "../../app/store";
import {Provider} from "react-redux";
import {combineReducers} from "redux";
import {tasksReducer} from "../../features/TodolistsList/tasks-reducer";
import {todolistId1, todolistId2, todolistsReducer} from "../../features/TodolistsList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/types";
import {applicationReducer} from "../../features/Application/application-reducer";
import {authReducer} from "../../features/Auth/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";

const rootReducer: RootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: applicationReducer,
    auth: authReducer
})



const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: "idle"},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: "loading"},
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
        status: "success",
        error: '',
        isInitialized: true
    },
    auth: {
        isLoggedIn: true
    }
}
export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
})
// export const storyBookStore = createStore(rootReducer,initialGlobalState as AppRootStateType, applyMiddleware(thunkMiddleware))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
export const BrowserRouterDecorator = (storyFn: any) => {
    return <HashRouter>{storyFn()}</HashRouter>
}