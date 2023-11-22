import {useEffect, useState} from "react";
import axios from "axios";


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

        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
             setState(res.data)
         })

    }, [])

    return <div>
        {/*{JSON.stringify(state)}*/}
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

        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'new todolist'}, settings)
         .then((res) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)} </div>

}

export const DeleteTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists/5d980651-6d23-48f6-abc0-55839b8d6717', settings)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)} </div>

}

export const UpdateTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        axios.put('https://social-network.samuraijs.com/api/1.1/todo-lists/9f1157cf-4358-4116-8397-e55bba6aecd2',{title: 'color-min'}, settings)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)} </div>

}