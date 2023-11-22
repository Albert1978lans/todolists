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

        let todolistID = 'd6c3309f-3ba6-4d15-ac23-032f9fb566b7'
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

        let todolistID = '7814f752-78d4-4f23-9876-2875f1fda7d7'

        todolistsAPI.updateTodolist(todolistID, 'update Todolist')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)} </div>

}