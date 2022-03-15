import { Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import s from './card.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import { addTask, changeCardName, moveTask } from "../../../../actions/boards";
import Task from "./task_card/Task";
import { getAllTasks } from '../../../../actions/boards'
import { useDispatch, useSelector } from "react-redux";
import { setDraggableTask } from "../../../../reducers/boardsReducer";


let Card = (props) => {

    const dispatch = useDispatch();

    const [nameCard, setNameCard] = React.useState(props.name);
    const [createTaskText, setCreateTaskText] = React.useState("");
    const [inputText, setInputText] = React.useState(true);
    const [toggleCreateTask, setToggleCreateTask] = React.useState(true);

    let [currentTask, setCurrentTask] = React.useState(-1);

    const tasks = useSelector(state => state.boards.tasks);
    const userId = useSelector(state => state.user.currentUser.id);
    const draggableTaskId = useSelector(state => state.boards.draggableTask);

    const divRef = useRef(null);

    let mytasks = [];
    let idtasks = [];

    let goDown = () => {
        divRef.current.scrollTop = divRef.current.scrollHeight * 2;
    }

    useEffect(() => {
        dispatch(getAllTasks(props.cardId));
        goDown();
    }, [])


    if (tasks != null) {
        tasks.map(c => {
            c.map((cc, ind) => {
                // if(mytasks.length != 0){
                //     console.log(mytasks[mytasks.length].id)
                // }
                if (idtasks.length == 0) {
                    idtasks.push(cc.id);
                }
                if (cc.cardId == props.cardId && idtasks.indexOf(cc.id) === -1) {
                    mytasks.push(cc);
                    idtasks.push(cc.id);
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
        if (nameCard.length > 0) {
            setInputText(true);
            changeCardName(props.cardId, nameCard, props.boardsId, goDown);
        }
        else {
            setInputText(true);
            changeCardName(props.cardId, "e", props.boardsId);
            setNameCard("e");
        }
    }

    let keyDownName = (e) => {
        if (e.key == "Enter" || e.key == 13) {
            blurInput();
        }
    }

    let createTask = (e) => {
        if (e.key == "Enter" || e.key == 13) {
            if (createTaskText.length > 0) {
                dispatch(addTask(createTaskText, props.cardId, userId));
                setCreateTaskText("");
            }
        }
    }

    const dragOverHandler = (e, card, task) =>{
        e.preventDefault();
        if(e.target.className == s.task){
            e.target.style.boxShadow = '0 2px 0px red';
        }
        
    }
    const dragLeaveHandler = (e) =>{
        e.target.style.boxShadow = '0 0 2px rgba(0, 0, 0, 0.5)';
    }
    let draggedTaskId;
    const dragStartHandler = (e) =>{
        setCurrentTask(e.target.getAttribute('taskId'))
        dispatch(setDraggableTask(e.target.getAttribute('taskId')))
    }
    const dragEndHandler = (e) =>{
        e.target.style.boxShadow = '0 0 2px rgba(0, 0, 0, 0.5)';
    }

    const dropHandler = (e) =>{
        e.preventDefault();
        e.target.style.boxShadow = '0 0 2px rgba(0, 0, 0, 0.5)';
        console.log("Dragged taskID: "+draggableTaskId+" ;"+"Drag drop cardID: "+e.target.getAttribute("cardId"));
        dispatch(moveTask(draggableTaskId, e.target.getAttribute("cardId")));
    }

    console.log(currentTask)

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
            <div className={s.tasks} ref={divRef}>
                {
                    
                    mytasks.map((c, ind) => 
                    <div
                        key={ind}
                        className={s.task}
                        taskId={c.id}
                        cardId={props.cardId}
                        name={c.name}
                        draggable={true}
                        onDragOver={e => dragOverHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragStart={e => dragStartHandler(e)}
                        onDragEnd={e => dragEndHandler(e)}
                        onDrop={e => dropHandler(e)}>
                        {c.name}
                    </div>)
                }
            </div>

            <div className={s.create_task}>
                {
                    toggleCreateTask
                        ? <Button onClick={() => setToggleCreateTask(false)} className={s.btn_add}>+ Добавить задачу</Button>
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