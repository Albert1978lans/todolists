import {useEffect, useState} from "react";
import {todolistsAPI} from "../api/todolists-api";


export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'fb06af8a-0542-41c9-aba3-9af2aab7afee'
    }
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        todolistsAPI.getTodolists()
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

export const CreateTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        todolistsAPI.createTodolist('new Todolist')
         .then((res) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)} </div>

}

export const DeleteTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        let todolistID = 'd06e2e4a-08ea-4b5d-b1f0-1fbdcf110a32'
        todolistsAPI.deleteTodolist(todolistID)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)} </div>

}

export const UpdateTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        let todolistID = '9f1157cf-4358-4116-8397-e55bba6aecd2'

        todolistsAPI.updateTodolist(todolistID, 'update Todolist')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)} </div>

}