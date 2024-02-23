import {useEffect, useState} from "react";
import {TaskType, todolistsAPI} from "../api/todolists-api";
import {UpdateDomainTaskModelType} from "../features/TodolistsList/tasks-reducer";


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
    const [title, setTitle] = useState<string>('')

    const createTodolist =() => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>
            <input placeholder='title' value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTodolist}>CreateTodolist</button>
        </div>
        {JSON.stringify(state)}
    </div>

}

export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('')

    const deleteTodolist =() => {
        todolistsAPI.deleteTodolist(todolistID)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>
            <input placeholder='todolistID' value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>DeleteTodolist</button>
        </div>
        {JSON.stringify(state)}
    </div>

}

export const UpdateTodolist = () => {

    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodolist = () => {
        todolistsAPI.updateTodolist(todolistID, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>
            <input placeholder='todolistID' value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}/>
            <input placeholder='title' value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTodolist}>UpdateTodolist</button>
        </div>
        {JSON.stringify(state)}
    </div>

}

export const GetTasks = () => {

    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('')

    const getTasks = () => {
        todolistsAPI.getTasks(todolistID)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        {/*{JSON.stringify(state)}*/}
        <div>
            <input placeholder='todolistID' value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}/>
            <button onClick={getTasks}>GetTasks</button>
        </div>
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
                                <b style={{color: 'red'}}> priority: </b>{t.priority}
                                <b style={{color: 'red'}}> startDate: </b>{t.startDate}
                                <b style={{color: 'red'}}> description: </b>{t.description}
                                <b style={{color: 'red'}}> deadline: </b>{t.deadline}
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
    const [todolistID, setTodolistID] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistID, taskID)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>
            <input placeholder='todolistID' value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}/>
            <input placeholder='taskID' value={taskID} onChange={(e) => setTaskID(e.currentTarget.value)}/>
            <button onClick={deleteTask}>DeleteTask</button>
        </div>
        {JSON.stringify(state)}
    </div>

}

export const CreateTask = () => {

    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        todolistsAPI.createTask(todolistID, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>
            <input placeholder='todolistID' value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}/>
            <input placeholder='title' value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>CreateTask</button>
        </div>
        {JSON.stringify(state)}
    </div>

}

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)

    const [todolistID, setTodolistID] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const updateTask = () => {
        const model: UpdateDomainTaskModelType = {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: startDate,
            deadline: deadline,
        }
        todolistsAPI.updateTask(todolistID, taskID, model)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <div>
            <input placeholder='todolistID' value={todolistID} onChange={(e) => setTodolistID(e.currentTarget.value)}/>
            <input placeholder='taskID' value={taskID} onChange={(e) => setTaskID(e.currentTarget.value)}/>
            <input placeholder='title' value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <input placeholder='description' value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
            <input placeholder='status' value={status} onChange={(e) => setStatus(+e.currentTarget.value)}/>
            <input placeholder='priority' value={priority} onChange={(e) => setPriority(+e.currentTarget.value)}/>
            <input placeholder='startDate' value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)}/>
            <input placeholder='deadline' value={deadline} onChange={(e) => setDeadline(e.currentTarget.value)}/>
            <button onClick={updateTask}>CreateTask</button>
        </div>
        {JSON.stringify(state)}
    </div>

}

