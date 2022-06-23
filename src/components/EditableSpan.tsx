import React, {ChangeEvent, useState} from 'react';

type EditableSpan = {
    title: string
    callback: (title:string)=> void
}

const EditableSpan = (props: EditableSpan) => {
    const [title, setTitle] = useState(props.title)
    const [change, setChange] = useState(false)

    const onDoubleClickHandler = () => {
        setChange(true)
    }

    const onBlurHandler = () => {
        setChange(false)
        props.callback(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        change
            ? <input  onChange={onChangeHandler} autoFocus={true} onBlur={onBlurHandler} value={title}/>
            : <span onDoubleClick={onDoubleClickHandler}>{title}</span>


    );
};

export default EditableSpan;