import { Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import s from './card.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import { addTask, changeCardName } from "../../../../actions/boards";
import Task from "./task_card/Task";
import {getAllTasks} from '../../../../actions/boards'
import { useDispatch, useSelector } from "react-redux";


let Card = (props) => {

    const dispatch = useDispatch();

    

    const [nameCard, setNameCard] = React.useState(props.name);
    const [createTaskText, setCreateTaskText] = React.useState("");
    const [inputText, setInputText] = React.useState(true);
    const [toggleCreateTask, setToggleCreateTask] = React.useState(true);

    const tasks = useSelector(state => state.boards.tasks);
    const userId = useSelector(state => state.user.currentUser.id)
    
    let mytasks = [];    
    // dsagas

    useEffect(() => {
        dispatch(getAllTasks(props.cardId));      
    }, [])


    if (tasks != null) {
        tasks.map(c => {
            c.map((cc,ind) => {
                if (cc.cardId == props.cardId) {
                    mytasks.push(cc);
                }
            })
        })
    }





    let clickedName = (inputText) => {
        setInputText(false);
    }

    let onChangeName = (event) => {
        setNameCard(event.target.value);
    }

    let onChangeCreateText = (event) => {
        setCreateTaskText(event.target.value);
    }

    let blurInput = () => {
        setInputText(true);
        changeCardName(props.cardId, nameCard, props.boardsId);
    }

    let keyDownName = (e) => {
        if (e.key == "Enter" || e.key == 13) {
            setInputText(true);
            changeCardName(props.cardId, nameCard, props.boardsId);
        }
    }

    let createTask = (e) => {
        if (e.key == "Enter" || e.key == 13) {
            dispatch(addTask(createTaskText, props.cardId, userId))
        }
    }

    return (
        <div className={s.card}>
            <div className={s.topcard}>
                {
                    inputText
                        ? <Typography className={s.nameText} onClick={() => clickedName(nameCard)}>{nameCard}</Typography>
                        : <TextField
                            focused
                            size="small"
                            autoFocus
                            onBlur={blurInput}
                            value={nameCard}
                            onChange={onChangeName}
                            onKeyDown={keyDownName}
                            type="text"
                            placeholder="" />
                }

                <Button className={s.menucard}><MenuIcon /></Button>
            </div>
            <div className={s.tasks}>
                {
                    
                    mytasks.map((c, ind) => <Task key={ind} taskId={c.id} cardId={props.cardId} name={c.name} /> )
                }
            </div>

            <div className={s.create_task}>
                {
                    toggleCreateTask
                        ? <Button onClick={() => setToggleCreateTask(false) } className={s.btn_add}>+ Добавить задачу</Button>
                        : <div className={s.create_task_form}>
                            <TextField
                                label="Введите заголовок задачи"
                                onBlur={() => setToggleCreateTask(true)}
                                autoFocus
                                size="small"
                                value={createTaskText}
                                onChange={onChangeCreateText}
                                onKeyDown={createTask}
                                placeholder="Нажмите Enter для сохранения"
                                className={s.create_textfield} />
                            
                        </div>
                }
            </div>
        </div>
    )
}


export default Card