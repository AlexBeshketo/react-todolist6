import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Button from "./components/Button";
import EditableSpan from "./components/EditableSpan";
import Input from "./components/Input";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (todolistId: string, taskID: string, title: string) => void
    updateHeaderTitle: (tID:string, title:string) => void
}

export function Todolist(props: PropsType) {
    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)

    // const addTask = () => {
    //     let newTitle = title.trim();
    //     if (newTitle !== "") {
    //         props.addTask(newTitle, props.id);
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);


    const onClickHandler = (tID: string) => props.removeTask(tID, props.id)

    const onChangeHandlerForTasks = (tID: string, e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(tID, newIsDoneValue, props.id);
    }

    const callBackHandlerForEditableSpan = (tID: string, title: string) => {
        props.updateTask(props.id, tID, title)
    }

    const callBackHandlerForHeaderTitle = (title:string) => {
        props.updateHeaderTitle(props.id, title)
    }
    const callbackHandlerForInput = (titleNew:string)=> {
        props.addTask(titleNew , props.id )
    }


    return <div>
        <h3>
            <EditableSpan callback={(title) => {callBackHandlerForHeaderTitle(title) }} title={props.title}/>

            {/*// {props.title}*/}


            <button onClick={removeTodolist}>x</button>
        </h3>
        <div>


            <Input callback={(titleNew)=> {callbackHandlerForInput(titleNew)}}/>

        </div>
        <ul>
            {
                props.tasks.map(t => {


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={(event) => {
                            onChangeHandlerForTasks(t.id, event)
                        }} checked={t.isDone}/>
                        <EditableSpan callback={(title) => {
                            callBackHandlerForEditableSpan(t.id, title)
                        }} title={t.title}/>
                        {/*<span>{t.title}</span>*/}
                        <Button callback={() => {
                            onClickHandler(t.id)
                        }} name={'x'}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


