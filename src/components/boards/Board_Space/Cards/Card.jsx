import { Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import s from './card.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import { addTask, changeCardName, getCardsFromBoardId, moveTask } from "../../../../actions/boards";
import Task from "./task_card/Task";
import { getAllTasks } from '../../../../actions/boards'
import { useDispatch, useSelector } from "react-redux";
import { deleteTasks, setCardIdDndAC, setDraggableTask } from "../../../../reducers/boardsReducer";
import Draggable from 'react-draggable';
import EditIcon from '@mui/icons-material/Edit';

let Card = (props) => {

    const dispatch = useDispatch();

    const [nameCard, setNameCard] = React.useState(props.name);
    const [createTaskText, setCreateTaskText] = React.useState("");
    const [inputText, setInputText] = React.useState(true);
    const [toggleCreateTask, setToggleCreateTask] = React.useState(true);
    const [isHoveredWithTask, setIsHoveredWithTask] = React.useState(true);

    let [currentTask, setCurrentTask] = React.useState(-1);

    const userId = useSelector(state => state.user.currentUser.id);
    const draggableTask = useSelector(state => state.boards.draggableTask);
    const cardIdDND = useSelector(state => state.boards.cardIdDND);

    const divRef = useRef(null);

    let mytasks = [];
    let idtasks = [];

    let goDown = () => {
        divRef.current.scrollTop = divRef.current.scrollHeight * 2;
    }

    useEffect(() => {
        goDown();
    }, [])

    const tasksFromProps = props.tasks;

    if (tasksFromProps != null) {
        tasksFromProps.map(c => {
            if (c != null) {
                if (c.cardId == props.cardId) {
                    mytasks.push(c);
                    idtasks.push(c.id);
                }
                // c.map((cc, ind) => {
                //     // if(mytasks.length != 0){
                //     //     console.log(mytasks[mytasks.length].id)
                //     // }
                //     if (idtasks.length == 0) {
                //         idtasks.push(cc.id);
                //     }
                //     if (cc.cardId == props.cardId && idtasks.indexOf(cc.id) === -1) {
                //         mytasks.push(cc);
                //         idtasks.push(cc.id);
                //     }
                // })
            }

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
                dispatch(addTask(createTaskText, props.cardId, userId, props.cardsId));
                setCreateTaskText("");
            }
        }
    }


    const dragOverHandler = (e, card, task) => {
        e.preventDefault();
        if (e.target.className == s.task || e.target.className.indexOf(s.name_title) > -1) {
            if(e.target.className == s.task){
                e.target.style.boxShadow = '0 2px 0px red';
            }
            if(e.target.className.indexOf(s.name_title) > -1){
                e.target.parentNode.style.boxShadow = '0 2px 0px red';
            }
            
        }
        if (e.target.className == s.card) {
            // console.log(true)
            setIsHoveredWithTask(true);
        }
        console.log(e.target.className.indexOf(s.name_title))
    }
    const dragLeaveHandler = (e) => {
        if (e.target.className == s.task) {

            e.target.style.boxShadow = '0 0 2px rgba(0, 0, 0, 0.5)';

        }

    }
    let draggedTaskId;
    const dragStartHandler = (e) => {
        setCurrentTask(e.target.getAttribute('taskId'))
        dispatch(setDraggableTask({id: e.target.getAttribute('taskId'), order: e.target.getAttribute('order')}))
    }
    const dragEndHandler = (e) => {
        if(e.target.className == s.task){
            e.target.style.boxShadow = '0 0 2px rgba(0, 0, 0, 0.5)';
        }
    }

    const dropHandler = (e) => {
        e.preventDefault();
        if(e.target.className == s.task){
            e.target.style.boxShadow = '0 0 2px rgba(0, 0, 0, 0.5)';
        }
        let isThisCard = e.target.getAttribute('cardId') == cardIdDND;
        let beforeOrder = e.target.getAttribute('order');
        let firstOrder = draggableTask.order;
        let cardId = e.target.getAttribute('cardId');
        if(e.target.className.indexOf(s.name_title) > -1){
            isThisCard = e.target.parentNode.getAttribute('cardId') == cardIdDND;
            beforeOrder = e.target.parentNode.getAttribute('order');
            firstOrder = draggableTask.order;
            cardId = e.target.parentNode.getAttribute('cardId');
        }
        console.log("first order " + firstOrder)
        dispatch(moveTask(draggableTask.id, cardId, props.cardsId, beforeOrder, isThisCard, firstOrder));
        // props.getCards();
    }

    const dropTaskToCardHandler = (e) => {
        e.preventDefault();
        console.log("go " + e.target.getAttribute('class'))
        if(e.target.className == s.card || e.target.className == s.tasks || e.target.className == "MuiButton-root"){
            
            dispatch(moveTask(draggableTask.id, props.cardId, props.cardsId, 0, false, 0));
        }
        
    }

    const onMouseOnCard = (card) => {
        dispatch(setCardIdDndAC(card));
    }


    return (
        
            <div
                className={s.card}
                onMouseEnter={() => onMouseOnCard(props.cardId)}
                onDragOver={e => dragOverHandler(e)}
                onDrop={e => dropTaskToCardHandler(e)}>
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
                                order={c.order}
                                cardId={props.cardId}
                                name={c.name}
                                draggable={true}
                                onDragOver={e => dragOverHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragStart={e => dragStartHandler(e)}
                                onDragEnd={e => dragEndHandler(e)}
                                onDrop={e => dropHandler(e)}>

                                <Typography
                                    className={s.name_title}
                                    draggable="false"
                                    taskId={c.id}
                                    order={c.order}
                                    cardId={props.cardId}>
                                    {
                                        c.name
                                    }
                                </Typography>
                                <IconButton className={s.edit_btn} >
                                    <EditIcon  />
                                </IconButton>
                                
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