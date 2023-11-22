import {useEffect, useState} from "react";
import {TaskType, todolistsAPI, UpdateRequestType} from "../api/todolists-api";


export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'fb06af8a-0542-41c9-aba3-9af2aab7afee'
    }
}

export const GetTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        todolistsAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>
        {state
            ? state.map((t: any, i: number) => {
                return <div key={t.id}>
                    <b>{i + 1}) </b>
                    <b style={{color: 'red'}}>id: </b>{t.id}
                    <b style={{color: 'red'}}> title: </b>{t.title}
                    <b style={{color: 'red'}}> addedDate: </b>{t.addedDate}
                    <b style={{color: 'red'}}> order: </b>{t.order}
                </div>
            })
            : 'пусто'
        }
    </div>

}

export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        todolistsAPI.createTodolist('new Todolist')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)} </div>

}

export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        let todolistID = '9f1157cf-4358-4116-8397-e55bba6aecd2'
        todolistsAPI.deleteTodolist(todolistID)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)} </div>

}

export const UpdateTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        let todolistID = '29e2dc28-a97a-4563-a577-5506f7b4827f'

        todolistsAPI.updateTodolist(todolistID, 'update Todolist')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)} </div>

}

export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistID = 'c853dee7-be6c-42a1-8025-df15a4226c1f'
        todolistsAPI.getTasks(todolistID)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>
        {/*{JSON.stringify(state)}*/}
        <div>
            {state ? <div>
                    <b style={{color: 'red'}}>totalCount: </b>{state.totalCount}
                </div>
                : 'пусто'
            }
        </div>
        <div>
            {

                state
                    ? state.items
                        ? state.items.map((t: TaskType, i: number) => {
                            return <div key={i + 1}>
                                <b>{i + 1}) </b>
                                <b style={{color: 'red'}}>todolistID: </b>{t.todoListId}
                                <b style={{color: 'red'}}> id: </b>{t.id}
                                <b style={{color: 'red'}}> title: </b>{t.title}
                                <b style={{color: 'red'}}> status: </b>{t.status}
                                <b style={{color: 'red'}}> order: </b>{t.order}
                            </div>
                        })
                        : 'тасок ещё нет'
                    : 'пусто'
            }
        </div>

    </div>
}

export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        const todolistID = 'c853dee7-be6c-42a1-8025-df15a4226c1f'
        const taskID = '6142abd5-49ef-4d13-9a7d-87fc111be8e4'
        todolistsAPI.deleteTask(todolistID, taskID)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)} </div>

}

export const CreateTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        const todolistID = 'c853dee7-be6c-42a1-8025-df15a4226c1f'
        const title = 'new Task'
        todolistsAPI.createTask(todolistID, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)} </div>

}

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        const todolistID = 'c853dee7-be6c-42a1-8025-df15a4226c1f'
        const taskID = '7575dc9b-decc-490d-92c9-3223bc90d86b'
        const changedTask: UpdateRequestType = {
            title: 'update Task',
            description: '',
            status: 0,
            priority : 0,
            startDate : '',
            deadline : '',
        }
        todolistsAPI.updateTask(todolistID, taskID, changedTask)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)} </div>

}