import { Button, IconButton, ListItemIcon, Menu, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import s from './card.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import { addTask, changeCardName, getCardsFromBoardId, moveCard, moveTask, removeCard, removeTask, renameTask } from "../../../../actions/boards";
import Task from "./task_card/Task";
import { getAllTasks } from '../../../../actions/boards'
import { useDispatch, useSelector } from "react-redux";
import { deleteTasks, setCardIdDndAC, setDragCardIdAC, setDraggableTask } from "../../../../reducers/boardsReducer";
import Draggable from 'react-draggable';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import SpeedDialAction from '@mui/material/SpeedDialAction';

let Card = (props) => {

    const dispatch = useDispatch();
    const [preNameCard, setPreNameCard] = React.useState(props.name)
    const [nameCard, setNameCard] = React.useState(props.name);
    
    

    const [createTaskText, setCreateTaskText] = React.useState("");
    const [inputText, setInputText] = React.useState(true);
    const [toggleCreateTask, setToggleCreateTask] = React.useState(true);
    const [isHoveredWithTask, setIsHoveredWithTask] = React.useState(true);

    const [renamingCard, setRenamingCard] = React.useState(true);

    const [isTitleEdit, setIsTitleEdit] = React.useState(true);
    const [titleEditText, setTitleEditText] = React.useState("");
    const [idTaskEditText, setIdTaskEditText] = React.useState(-1);

    let [currentTask, setCurrentTask] = React.useState(-1);

    let [currentCard, setCurrentCard] = React.useState(-1);

    const userId = useSelector(state => state.user.currentUser.id);
    const draggableTask = useSelector(state => state.boards.draggableTask);
    const cardIdDND = useSelector(state => state.boards.cardIdDND);

    const draggableCardId = useSelector(state => state.boards.dragCardId);

    const divRef = useRef(null);

    const cardRef = useRef(null)

    let mytasks = [];
    let idtasks = [];

    let goDown = () => {
        divRef.current.scrollTop = divRef.current.scrollHeight * 2;
    }

    useEffect(() => {
        console.log('new useeffect')
        setNameCard(props.name)
        
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
        cardRef.current.draggable = false;

    }

    let onChangeName = (e) => {
        console.log(e.target.value)
        setNameCard(e.target.value);
    }

    let onChangeCreateText = (event) => {
        if(createTaskText.length < 99){
            setCreateTaskText(event.target.value);
        }
        
    }

    let blurInput = () => {
        if (nameCard.length > 0 && nameCard.trim()) {
            setInputText(true);
            cardRef.current.draggable = true;
            changeCardName(props.cardId, nameCard, props.boardsId, goDown);
        }
        else {
            setInputText(true);
            cardRef.current.draggable = true;
            changeCardName(props.cardId, "Карточка", props.boardsId);
            setNameCard("Карточка");
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
                console.log(props.boardId)
                dispatch(addTask(createTaskText, props.cardId, userId, props.cardsId, props.boardId));
                setCreateTaskText("");
                setToggleCreateTask(true)
            }
        }
    }

    const dragOverHandler = (e, card, task) => {
        e.preventDefault();
        if (e.target.className == s.task || e.target.parentNode.className == s.task) {
            if(draggableCardId == -1){
                if(e.target.className == s.task){
                    e.target.style.borderBottom = '.5rem solid #ff9100';
                }
                if(e.target.className.indexOf(s.name_title) > -1){
                    e.target.parentNode.style.borderBottom = '.5rem solid #ff9100';
                }
            }
        }
        const dragLeft = e.target.className == s.dragCard_left && draggableCardId != -1 &&
            e.target.parentNode.getAttribute('cardId') != draggableCardId;
        const dragRight = e.target.className == s.dragCard_right && draggableCardId != -1 && 
            e.target.parentNode.getAttribute('cardId') != draggableCardId;
        if (dragLeft) {
            e.target.parentNode.style.borderLeft = '.5rem solid #ff9100';
        }
        if (dragRight) {
            e.target.parentNode.style.borderRight = '.5rem solid #ff9100';
        }
        if(e.target.parentNode.className == s.name){
            if(draggableCardId != -1){
                setIsHoveredWithTask(true);
            }
        }
    }
    const dragLeaveHandler = (e) => {
        if (e.target.className == s.task || e.target.parentNode.className == s.task) {
            e.target.style.borderBottom = '0rem solid #ff9100';
            console.log("leaved")
        }
    }
    let draggedTaskId;
    const dragStartHandler = (e) => {
        if(e.target.className == s.card){
            dispatch(setDragCardIdAC(e.target.getAttribute('cardId')))
        }

        setCurrentTask(e.target.getAttribute('taskId'))
        dispatch(setDraggableTask({id: e.target.getAttribute('taskId'), order: e.target.getAttribute('order')}))
    }
    const dragEndHandler = (e) => {
        dispatch(setDragCardIdAC(-1))
        if(e.target.className == s.task){
            e.target.style.borderBottom = '0rem solid #ff9100';
        }
        if(e.target.parentNode.className == s.card){
            e.target.style.border = '0rem solid #ff9100';
        }
        
    }

    const dropHandler = (e) => {
        e.preventDefault();
        dispatch(setDragCardIdAC(-1))
        if(e.target.className == s.task ){
            e.target.style.borderBottom = '0rem solid #ff9100';
        }
        if(e.target.parentNode.className == s.task && e.target.parentNode != null){
            console.log(e.target.style.parentNode)
            e.target.parentNode.style.borderBottom = '0rem solid #ff9100';
        }
        let isThisCard = e.target.getAttribute('cardId') == cardIdDND;
        let beforeOrder = e.target.getAttribute('order');
        let firstOrder = draggableTask.order;
        let cardId = e.target.getAttribute('cardId');
        if(e.target.parentNode.className == s.task){
            isThisCard = e.target.parentNode.getAttribute('cardId') == cardIdDND;
            beforeOrder = e.target.parentNode.getAttribute('order');
            firstOrder = draggableTask.order;
            cardId = e.target.parentNode.getAttribute('cardId');
        }
        dispatch(moveTask(draggableTask.id, cardId, props.cardsId, beforeOrder, isThisCard, firstOrder));
        // props.getCards();
    }

    const dropTaskToCardHandler = (e) => {
        e.preventDefault();
        if(e.target.className == s.card || e.target.className == s.tasks || e.target.className == "MuiButton-root"){
            dispatch(moveTask(draggableTask.id, props.cardId, props.cardsId, 0, false, 0));
        }
        const selectedOrderCard = e.target.parentNode.getAttribute('order');
        const dirCard = e.target.className == s.dragCard_left ? 'left' : 'right';
        console.log(dirCard)
        if(e.target.parentNode.className == s.card){
            e.target.parentNode.style.border = '0rem solid #ff9100';
            dispatch(moveCard(draggableCardId, selectedOrderCard, dirCard, props.boardId))
        }
        dispatch(setDragCardIdAC(-1))
    }

    const dropTaskToCardElementsHandler = (e) => {
        e.preventDefault();
        if(e.target.parentNode.className == s.card || e.target.parentNode.parentNode.className == s.card){
            dispatch(moveTask(draggableTask.id, props.cardId, props.cardsId, 0, false, 0));
        }
    }

    const onMouseOnCard = (card) => {
        dispatch(setCardIdDndAC(card));
    }

    const setEditTitle = (e,edit) => {
        setIdTaskEditText(e.target.getAttribute('taskId'))
        setTitleEditText(e.target.innerText)
    }

    let onChangeTitle = (event) => {
        setTitleEditText(event.target.value);
    }

    const keyDownTitle = (e) => {
        if (e.key == "Enter" || e.key == 13) {
            blurTitle(e);
        }
    }

    let blurTitle = (e) => {
        if(titleEditText.length > 0 && titleEditText.trim()){
            dispatch(renameTask(idTaskEditText, titleEditText, props.cardsId))
            
        }
        else{
            dispatch(renameTask(idTaskEditText, "Задача", props.cardsId))
        }
        setIdTaskEditText(-1);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [anchorElCard, setAnchorElCard] = React.useState(null);
    const openCard = Boolean(anchorElCard);
    const handleClickCard = (event) => {
      setAnchorElCard(event.currentTarget);
    };
    const handleCloseCard = () => {
      setAnchorElCard(null);
    };

    const taskDelete = (e) => {
        console.log(e.parentNode.getAttribute('taskId'))
        console.log(e.parentNode.getAttribute('order'))
        handleClose();
        dispatch(removeTask(e.parentNode.getAttribute('taskId'), e.parentNode.getAttribute('order'), props.cardsId))
    }

    let imgCard = new Image(10,50)
    imgCard.src = "./img/card.png";

    const dragCardStart = (e) => {
        dispatch(setDragCardIdAC(e.target.getAttribute('cardId')))
    }
    const dropCard = (e) => {
        dispatch(setDragCardIdAC(-1))
    }
    const cardLeaveDrag = (e) => {
        if(e.target.parentNode.className == s.card){
            e.target.parentNode.style.border = '0rem solid #ff9100';
        }
    }

    const cardDelete = (e) => {
        // props.removeCard(e.parentNode.parentNode.getAttribute('cardId'));
        handleClose();
        dispatch(removeCard(-1, props.boardId))
        dispatch(removeCard(e.parentNode.parentNode.getAttribute('cardId'), props.boardId))
    }
    return (
            <div
                id={props.cardId}
                ref={cardRef}
                draggable
                className={s.card}
                onMouseEnter={() => onMouseOnCard(props.cardId)}
                onDragOver={e => dragOverHandler(e)}
                onDrop={e => dropTaskToCardHandler(e)}
                onDragStart={e => dragStartHandler(e)}
                onDragEnd={e => dropCard(e)}
                onDragLeave={e => cardLeaveDrag(e)}
                cardId={props.cardId}
                order={props.order} >
                <div className={s.dragCard_left}
                style={
                    (draggableCardId > -1)
                    ?{zIndex: '9999'}
                    :{zIndex: '-1'}
                } />
                <div className={s.dragCard_right} 
                style={
                    (draggableCardId > -1)
                    ?{zIndex: '9999'}
                    :{zIndex: '-1'}
                } />
                <div className={s.topcard}
                onDrop={e => dropTaskToCardElementsHandler(e)} >
                    {
                        inputText
                            ? <Typography 
                                className={s.nameText} 
                                onClick={() => clickedName(nameCard)}
                                sx={{zIndex: '999'}}
                                onDrop={e => dropTaskToCardElementsHandler(e)} >{nameCard}</Typography>
                            : <TextField
                                focused
                                size="small"
                                autoFocus
                                autoComplete="off"
                                onBlur={blurInput}
                                value={nameCard}
                                onChange={e => onChangeName(e)}
                                onKeyDown={keyDownName}
                                type="text"
                                sx={{zIndex: '999'}}
                                placeholder="" />
                    }

                <Button className={s.menucard}
                    onDrop={e => dropTaskToCardElementsHandler(e)}
                    id="card-button"
                    aria-controls={openCard ? 'card-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openCard ? 'true' : undefined}
                    onClick={handleClickCard}>
                    <MenuIcon />
                </Button>
                <Menu
                    id="card-menu"
                    anchorEl={anchorElCard}
                    open={openCard}
                    onClose={handleCloseCard}
                    MenuListProps={{
                        'aria-labelledby': 'card-button',
                    }}
                    className={s.menu_edit}>
                    <MenuItem onClick={handleCloseCard}>Изменить название</MenuItem>
                    <MenuItem onClick={() => cardDelete(anchorElCard)}>Удалить карточку</MenuItem>
                </Menu>
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
                                    {
                                        isTitleEdit  && idTaskEditText != c.id
                                        ? <Typography
                                        className={s.name_title}
                                        draggable="false"
                                        taskId={c.id}
                                        order={c.order}
                                        cardId={props.cardId}
                                        onClick={(e) => setEditTitle(e, false)} >
                                        {
                                            c.name
                                        }
                                    </Typography>
                                        : <TextField 
                                        size="small" 
                                        value={titleEditText}
                                        onChange={onChangeTitle}
                                        onKeyDown={keyDownTitle}
                                        onBlur={blurTitle}
                                        autoFocus
                                        margin="none"
                                        fullWidth
                                        placeholder="Поменяйте заголовок" > </TextField>
                                    }
                                

                                <IconButton
                                    sx={
                                        
                                            {
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                transform: 'scale(0)',
                                                padding: '10px',
                                                transition: '.2s ease',
                                            }
                                            // : {
                                            //     position: 'absolute',
                                            //     top: 0,
                                            //     right: 0,
                                            //     transform: 'scale(1)',
                                            //     padding: '10px',
                                            //     transition: '.2s ease',
                                            // }
                                        }
                                    className={s.edit_btn}
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}>

                                    <EditIcon />
                                    

                                </IconButton>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    className={s.menu_edit}>
                                    <MenuItem onClick={handleClose}>Изменить заголовок</MenuItem>
                                    <MenuItem onClick={() => taskDelete(anchorEl)}>Удалить</MenuItem>
                                </Menu>

                                
                                
                            </div>)
                    }
                </div>

                <div className={s.create_task}>
                    {
                        toggleCreateTask
                            ? <Button 
                            sx={{color: 'black', zIndex: '999'}}
                            onClick={() => setToggleCreateTask(false)} 
                            className={s.btn_add}
                            onDrop={e => dropTaskToCardElementsHandler(e)} >
                                + Добавить задачу
                              </Button>
                            : <div className={s.create_task_form}>
                                <TextField
                                    label="Введите заголовок задачи"
                                    onBlur={() => setToggleCreateTask(true)}
                                    autoFocus
                                    multiline
                                    maxRows={3}
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