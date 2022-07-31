import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

type addItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: addItemFormPropsType) => {

    console.log('AddItemForm call')

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addTaskOnClickHandler()
        }
    }

    const onChangeInputHandler = (newTitle: ChangeEvent<HTMLInputElement>) => {
        setTitle(newTitle.currentTarget.value)
    }

    const addTaskOnClickHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('error')
        }
    }

    return <div>
        <TextField
            label={'text'}
            value={title}
            variant="outlined"
            onKeyPress={onKeyPressHandler}
            onChange={onChangeInputHandler}
            error={!!error}
            helperText={error}
        />

        <IconButton onClick={addTaskOnClickHandler}>
            <AddBoxIcon />
        </IconButton>
    </div>
})