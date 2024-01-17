import React, {ChangeEvent, KeyboardEvent,  useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanePropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpane = React.memo( (props: EditableSpanePropsType) => {

    // console.log('EditableSpane')

    const [edit, setEdit] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')

    const onDoubleClickHandler = () => {
        setTitle(props.title)
        setEdit(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            props.changeTitle(title.trim())
            setEdit(false)
        }
    }

    const onblurHandler = () => {
        props.changeTitle(title.trim())
        setEdit(false)
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
                    />
                    : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
            }
        </>
    )
}
)

export default EditableSpane