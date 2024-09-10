import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type EditableSpanePropsType = {
    title: string
    changeTitle: (title: string) => Promise<any>
}

const EditableSpane = React.memo((props: EditableSpanePropsType) => {

        // console.log('EditableSpane')

        const [edit, setEdit] = useState<boolean>(false)
        const [title, setTitle] = useState<string>('')
        const [error, setError] = useState<string>('')

        const onDoubleClickHandler = () => {
            setTitle(props.title)
            setEdit(true)
        }

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        const asyncChangeTitle = async (title: string) => {
            try {
                await props.changeTitle(title)
                setEdit(false)
                setError('')
            } catch (error) {
                const err = error as Error
                setError(err.message)
            }

        }

        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.code === 'Enter') {
                // props.changeTitle(title.trim())
                // setEdit(false)
                asyncChangeTitle(title.trim())
            }
        }

        const onblurHandler = () => {
            // props.changeTitle(title.trim())
            // setEdit(false)
            asyncChangeTitle(title.trim())
        }

        return (
            <>
                {
                    edit
                        ? <TextField
                            variant="filled"
                            value={title}
                            onChange={onChangeHandler}
                            onKeyPress={onKeyPressHandler}
                            onBlur={onblurHandler}
                            autoFocus
                            error={!!error}
                        />

                        : <span
                            onDoubleClick={onDoubleClickHandler}
                        >
                        {props.title}
                        </span>

                }
                {error && <div style={{color: 'red', fontSize: '12px'}}>{error}</div>}
            </>
        )
    }
)

export default EditableSpane