import React, {KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';


type addItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: addItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.charCode === 13) {
            addTaskOnClickHandler()
        }
    }

    const onChangeInputHandler = (newTitle: string) => {
        setTitle(newTitle)
        setError(null)
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
            onKeyPress={(e) => onKeyPressHandler(e)}
            onChange={(e) => onChangeInputHandler(e.currentTarget.value)}
            error={!!error}
            helperText={error}
        />

        <IconButton onClick={addTaskOnClickHandler}>
            <AddBoxIcon />
        </IconButton>
        {/*{error && <div className={'error-message'}>Field is required</div>}*/}
    </div>
}