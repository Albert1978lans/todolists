import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormPropsType = {
    addItem: (titleValue: string) => void
    disabled?: boolean
}

const AddItemForm = React.memo(({addItem, disabled=false}: AddItemFormPropsType) => {

    console.log('AddItemForm')

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTitle = (titleValue: string) => {
        if (titleValue.trim() !== '') {
            addItem(titleValue.trim())
            setTitle('')
        }
        else {
            setError('error')
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
            <input
                value={title}
                onChange={newTitleOnChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
                disabled={disabled}
            />
            <button
                onClick={() => addTitle(title)}
                disabled={disabled}
            >+
            </button>
            {error && <div className='error-message'>This requared</div>}
        </div>)
})

export default AddItemForm