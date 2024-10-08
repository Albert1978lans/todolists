import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";


type AddItemFormPropsType = {
    addItem: (titleValue: string) => Promise<any>
    disabled?: boolean
}

const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {

    // console.log('AddItemForm')

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTitle = async (titleValue: string) => {
        if (titleValue.trim() !== '') {
            setError('')
            try {
                await addItem(titleValue.trim())
                setTitle('')

            } catch (error: any) {
                setError(error.message)
            }
        } else {
            setError('This requared')
        }
    }

    const newTitleOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

        if (e.code === 'Enter') {
            addTitle(title)
        }
    }

    return (
        <div>
            <TextField label="Type value"
                       value={title}
                       onChange={newTitleOnChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       disabled={disabled}
                       helperText={error}
            />
            <IconButton
                onClick={() => addTitle(title)}
                color={'secondary'}
                disabled={disabled}
                size={"small"}
            ><AddCircle/>
            </IconButton>
        </div>)
})

export default AddItemForm