import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Checkbox, IconButton, LinearProgress, Menu, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTask, moveTask, removeTask, renameTask, toggleTaskDone } from "../../../../actions/tasks";
import { changeCardName, deleteDeadlineCard, moveCard, removeCard, setDeadlineCard } from "../../../../actions/cards";

import { actionLog } from "../../../../actions/user";
import { setCardIdDndAC, setDragCardIdAC, setDraggableTask } from "../../../../reducers/cardsReducer";
import s from './card.module.css';
import CardDeadlinePicker from './CardDeadlinePicker';


let Card = (props) => {
    const dispatch = useDispatch();

    const [nameCard, setNameCard] = React.useState(props.name);
    const [createTaskText, setCreateTaskText] = React.useState("");
    const [isInputNameCard, setIsInputNameCard] = React.useState(true);
    const [toggleCreateTask, setToggleCreateTask] = React.useState(true);
    const [isHoveredWithTask, setIsHoveredWithTask] = React.useState(true);
    const [isTitleEdit, setIsTitleEdit] = React.useState(true);
    const [titleEditText, setTitleEditText] = React.useState("");
    const [idTaskEditText, setIdTaskEditText] = React.useState(-1);
    const [currentTask, setCurrentTask] = React.useState(-1);
    const [tasksDoned, setTasksDoned] = React.useState(0);
    const [isDeadPickerOpened, setIsDeadPickerOpened] = React.useState(false);

    
    const draggableTask = useSelector(state => state.cards.draggableTask);
    const cardIdDND = useSelector(state => state.cards.cardIdDND);
    const draggableCard = useSelector(state => state.cards.dragCardId);
    const myTasks = useSelector(state => state.cards.cardsAndTasks[props.cardIdRed].task);
    const divRef = useRef(null);
    const cardRef = useRef(null);

    const userId = props.userId;

    useEffect(() => {
        setNameCard(props.name)
        let countDonedTasks = 0;
        if(props.tasks.length){
            props.tasks.forEach(t => t.doneId-1 ? countDonedTasks++ : null);
        }
        setTasksDoned(countDonedTasks);
    }, [myTasks])

    let clickedNameCard = (inputText) => {
        setIsInputNameCard(false);
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

    let blurInputNameCard = () => {
        if (nameCard.length > 0 && nameCard.trim()) {
            setIsInputNameCard(true);
            cardRef.current.draggable = true;
            changeCardName(props.cardId, nameCard, props.boardsId);
            actionLog(userId, props.boardId, `?????????????? ???????????????? ???????????????? "${props.name}" ???? "${nameCard}"`)

        }
        else {
            setIsInputNameCard(true);
            cardRef.current.draggable = true;
            changeCardName(props.cardId, "????????????????", props.boardsId);
            setNameCard("????????????????");
            actionLog(userId, props.boardId, `?????????????? ???????????????? ???????????????? "${props.name}" ???? "????????????????"`)
        }
    }

    let keyDownNameCard = (e) => {
        if (e.key == "Enter" || e.key == 13) {
            blurInputNameCard();
        }
    }

    let createTask = (e) => {
        if (e.key == "Enter" || e.key == 13) {
            if (createTaskText.length > 0) {
                console.log(props.boardId)
                dispatch(addTask(createTaskText, props.cardId, userId, props.cardsId, props.boardId));
                actionLog(userId, props.boardId, `???????????? ???????????? "${createTaskText}" ?? ???????????????? "${nameCard}"`)
                setCreateTaskText("");
                setToggleCreateTask(true)
            }
        }
    }

    /// drag events
    const dragOverHandler = (e, card, task) => {
        e.preventDefault();
        
        const isTask = e.target.parentNode.className == s.task;
        if (isTask) {
            console.log(draggableCard)
            if(currentTask){
                e.target.parentNode.style.borderBottom = '.5rem solid #ff9100';
            }
        }
        const dragLeft = e.target.className == s.dragCard_left && draggableCard.id != -1 &&
            e.target.parentNode.getAttribute('cardId') != draggableCard.id;
        const dragRight = e.target.className == s.dragCard_right && draggableCard.id != -1 && 
            e.target.parentNode.getAttribute('cardId') != draggableCard.id;
        if (dragLeft) {
            e.target.parentNode.style.borderLeft = '.5rem solid #ff9100';
        }
        if (dragRight) {
            e.target.parentNode.style.borderRight = '.5rem solid #ff9100';
        }
        if(e.target.parentNode.className == s.name){
            if(draggableCard.id != -1){
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
    const dragStartHandler = (e) => {
        if(e.target.className == s.card){
            dispatch(setDragCardIdAC({id: e.target.getAttribute('cardId'), name: props.name}))
        }
        setCurrentTask(e.target.getAttribute('taskId'))
        const eId = e.target.getAttribute('taskId');
        const eOrder = e.target.getAttribute('order');
        const eName = e.target.getAttribute('name');
        dispatch(setDraggableTask({id: eId, order: eOrder, name: eName}));
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
            const taskName = e.target.parentNode.getAttribute('name');
            console.log(taskName)
        }
        dispatch(moveTask(draggableTask.id, cardId, props.cardsId, beforeOrder, isThisCard, firstOrder, props.boardId));
        if(!isThisCard) {
            actionLog(userId, props.boardId, `???????????????????? ???????????? "${draggableTask.name}" ?? ???????????????? "${nameCard}"`)
        }

    }
    const dropTaskToCardHandler = (e) => {
        e.preventDefault();
        if(e.target.className == s.card || e.target.className == s.tasks || e.target.className == "MuiButton-root"){
            dispatch(moveTask(draggableTask.id, props.cardId, props.cardsId, 0, false, 0, props.boardId));
        }
        const selectedOrderCard = e.target.parentNode.getAttribute('order');
        const dirCard = e.target.className == s.dragCard_left ? 'left' : 'right';
        console.log(props.name)
        if(e.target.parentNode.className == s.card){
            e.target.parentNode.style.border = '0rem solid #ff9100';
            dispatch(moveCard(draggableCard.id, selectedOrderCard, dirCard, props.boardId))
            actionLog(userId, props.boardId, `???????????????????? ???????????????? "${draggableCard.name}"`)
        }
        dispatch(setDragCardIdAC({id: -1, name: null}))
    }
    const dropTaskToCardElementsHandler = (e) => {
        e.preventDefault();
        if(e.target.parentNode.className == s.card || e.target.parentNode.parentNode.className == s.card){
            dispatch(moveTask(draggableTask.id, props.cardId, props.cardsId, 0, false, 0, props.boardId));
        }
    }
    const onMouseOnCard = (card) => {
        dispatch(setCardIdDndAC(card));
    }
    const dropCard = (e) => {
        dispatch(setDragCardIdAC(-1))
    }
    const cardLeaveDrag = (e) => {
        if(e.target.parentNode.className == s.card){
            e.target.parentNode.style.border = '0rem solid #ff9100';
        }
    }
    //////

    const setEditTitleTask = (e,edit) => {
        setIdTaskEditText(e.target.getAttribute('taskId'))
        setTitleEditText(e.target.innerText)
    }

    let onChangeTitleTask = (event) => {
        setTitleEditText(event.target.value);
    }

    const keyDownTitleTask = (e) => {
        if (e.key == "Enter" || e.key == 13) {
            blurTitleTask(e);
        }
    }

    const blurTitleTask = (e) => {
        const targetTask = e.target.parentNode.parentNode.parentNode;
        const taskIdRed = targetTask.getAttribute('taskIdRed')
        const oldNameTask = targetTask.getAttribute('name')
        const cardIdRed = targetTask.getAttribute('cardIdRed')
        const newNameTask = titleEditText.trim().length ? titleEditText : '????????????';
        // props.onTaskChanged(idTaskEditText, newNameTask, props.cardId, cardIdRed, taskIdRed);
        dispatch(renameTask(idTaskEditText, newNameTask, props.cardsId, cardIdRed, taskIdRed, props.boardId))
        actionLog(userId, props.boardId, `?????????????? ???????????????? ???????????? "${oldNameTask}" ?? ???????????????? "${nameCard}" ???? "${newNameTask}"`)
        setIdTaskEditText(-1);
    }

    const [anchorElTask, setAnchorElTask] = React.useState(null);
    const openTaskMenu = Boolean(anchorElTask);
    const handleClickTaskMenu = (event) => {
      setAnchorElTask(event.currentTarget);
    };
    const handleCloseTaskMenu = () => {
      setAnchorElTask(null);
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
        const taskIdRemove = e.parentNode.getAttribute('taskId')
        const taskName = e.parentNode.getAttribute('name')
        const taskOrderRemove = e.parentNode.getAttribute('order')
        handleCloseTaskMenu();
        actionLog(userId, props.boardId, `???????????? ???????????? "${taskName}" ?? ???????????????? "${props.name}"`)
        dispatch(removeTask(taskIdRemove, taskOrderRemove, props.boardId))
    }

    const cardDelete = (e) => {
        handleCloseCard();
        actionLog(userId, props.boardId, `???????????? ???????????????? "${props.name}"`)
        dispatch(removeCard(-1, props.boardId))
        dispatch(removeCard(e.parentNode.parentNode.getAttribute('cardId'), props.boardId))
    }

    const handleCheckChanged = (event) => {
        const checkTaskId = event.currentTarget.parentNode.getAttribute('taskId');
        const taskName = event.currentTarget.parentNode.parentNode.getAttribute('name');
        console.log(taskName)
        const taskChecked = event.currentTarget.checked;
        taskChecked
            ? actionLog(userId, props.boardId, `?????????????? ???????????? "${taskName}" ?? ???????????????? "${nameCard}" ?????? "??????????????????"`)
            : actionLog(userId, props.boardId, `?????????????? ???????????? "${taskName}" ?? ???????????????? "${nameCard}" ?????? "???? ??????????????????"`);
        dispatch(toggleTaskDone(checkTaskId, taskChecked, props.boardId ))
    }

    const openDeadPicker = () => {
        setIsDeadPickerOpened(true);
        handleCloseCard();
        
    }

    const savePicker = (date) => {
        closeDeadPicker();
        dispatch(setDeadlineCard(props.boardId, props.cardId, date))
    }

    const closeDeadPicker = () => {
        setIsDeadPickerOpened(false);
    }

    const deleteDeadline = () => {
        handleCloseCard();
        dispatch(deleteDeadlineCard(props.boardId, props.cardId));
    }

    let daysLost = 0;
    let textDaysLost = '';
    let isDateExpired = false;
    if(props.deadline){
        const startDate = new Date().toISOString().split('T')[0];
        const endDate = props.deadline;
    
        const diffInMs = new Date(endDate) - new Date(startDate)
        let daysLost = diffInMs / (1000 * 60 * 60 * 24);
        if(daysLost >= 0){
            
            switch(daysLost){
                case 0:
                    textDaysLost = '??????????????';
                    break;
                case 1: 
                    textDaysLost = '????????????';
                    break;
                default:
                    textDaysLost = '?????????? '+daysLost+' ????????';
            }
        }
        else{
            isDateExpired = true;
            switch(daysLost){
                case -1:
                    textDaysLost = '??????????'
                    break;
                case -2: 
                    textDaysLost = '??????????????????'
                    break;
                default:
                    textDaysLost = (daysLost*-1)+' ???????? ??????????'
            }
        }
    }
    console.log(isDateExpired)
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
                <div className={props.roleId == 3 ? s.card_observer_bg : ''} />
                <div className={s.dragCard_left}
                style={
                    (draggableCard.id > -1)
                    ?{zIndex: '9999'}
                    :{zIndex: '-1'}
                } />
                
                <div className={s.dragCard_right} 
                style={
                    (draggableCard.id > -1)
                    ?{zIndex: '9999'}
                    :{zIndex: '-1'}
                } />
                <div className={s.topcard}
                onDrop={e => dropTaskToCardElementsHandler(e)} >
                    {
                        isInputNameCard
                            ? <Typography 
                                className={s.nameText} 
                                onClick={() => clickedNameCard(nameCard)}
                                sx={{zIndex: '999'}}
                                onDrop={e => dropTaskToCardElementsHandler(e)} >{nameCard}</Typography>
                            : <TextField
                                focused
                                size="small"
                                autoFocus
                                autoComplete="off"
                                onBlur={blurInputNameCard}
                                value={nameCard}
                                onChange={e => onChangeName(e)}
                                onKeyDown={keyDownNameCard}
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
                    <MenuItem onClick={() => cardDelete(anchorElCard)}>?????????????? ????????????????</MenuItem>
                    {
                        props.deadline
                        ? <MenuItem onClick={deleteDeadline}>?????????????? ???????? ????????????????????</MenuItem>
                        : <MenuItem onClick={openDeadPicker}>???????????????????? ???????? ????????????????????</MenuItem>
                    }
                    
                    
                </Menu>
                </div>
            {
                props.deadline
                    ? (!isDateExpired)
                        ? <Typography>???????? ???????????????????? {textDaysLost}</Typography>
                        : <Typography>???????? ?????????? {textDaysLost}</Typography>
                    : <></>
            }
            <div className={s.progress}>
                <LinearProgress
                    variant="determinate"
                    color="secondary"
                    sx={
                        props.tasks.length
                        ? {height: '10px', borderRadius: '5px', width: '100%', marginRight: '10px' }
                        : {display: 'none'}
                    }
                    value={Math.round((tasksDoned / props.tasks.length)*100)} />
                <Typography
                    sx={
                        props.tasks.length
                            ? null
                            : { display: 'none' }
                    }>
                    {Math.round((tasksDoned / props.tasks.length)*100)}%
                </Typography>
            </div>
            {
                    isDeadPickerOpened
                    ? <CardDeadlinePicker closeDeadPicker={() => closeDeadPicker()} savePicker={(date) => savePicker(date)} />
                    : <></>
                }
                <div className={s.tasks} ref={divRef} updater={myTasks}>
                    {
                        props.tasks.map((c, ind) =>
                            <div
                                key={c.id}
                                taskIdRed={ind}
                                cardIdRed={props.cardIdRed}
                                className={s.task}
                                taskId={c.id}
                                order={c.order}
                                cardId={props.cardId}
                                name={props.tasks[ind].name}
                                draggable={true}
                                onDragOver={e => dragOverHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragStart={e => dragStartHandler(e)}
                                onDragEnd={e => dragEndHandler(e)}
                                onDrop={e => dropHandler(e)}>

                                    <Checkbox 
                                    sx={{position:'absolute', right: '0', top: '0'}}
                                    onChange={handleCheckChanged}
                                    color='secondary'
                                    checked={c.doneId-1}
                                    taskId={c.id}
                                    icon={<CheckCircleOutlineIcon />}
                                    checkedIcon={<CheckCircleIcon />} />

                                    {
                                        isTitleEdit  && idTaskEditText != c.id
                                        ? <Typography
                                        className={s.name_title}
                                        draggable="false"
                                        taskId={c.id}
                                        order={c.order}
                                        cardId={props.cardId}
                                        onClick={(e) => setEditTitleTask(e, false)} >
                                        {
                                            c.name
                                        }
                                    </Typography>
                                        : <TextField 
                                        size="small" 
                                        autoComplete="off"
                                        value={titleEditText}
                                        onChange={onChangeTitleTask}
                                        onKeyDown={keyDownTitleTask}
                                        onBlur={blurTitleTask}
                                        autoFocus
                                        margin="none"
                                        fullWidth
                                        placeholder="?????????????????? ??????????????????" > </TextField>
                                    }
                                <IconButton
                                    sx={
                                        props.roleId != 3
                                            ? {
                                                position: 'absolute',
                                                top: 0,
                                                right: '10%',
                                                transform: 'scale(0)',
                                                padding: '10px',
                                                transition: '.2s ease',
                                            }
                                            : { 
                                                position: 'absolute',
                                                display:'none' }
                                        }
                                    className={s.edit_btn}
                                    id="basic-button"
                                    color='primary'
                                    aria-controls={openTaskMenu ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openTaskMenu ? 'true' : undefined}
                                    onClick={handleClickTaskMenu}>
                                    <EditIcon />
                                </IconButton>
                                <Menu
                                    id="basic-menu"
                                    disabled={props.roleId == 3}
                                    anchorEl={anchorElTask}
                                    open={openTaskMenu}
                                    onClose={handleCloseTaskMenu}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    className={s.menu_edit}>
                                    <MenuItem onClick={() => taskDelete(anchorElTask)}>??????????????</MenuItem>
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
                                + ???????????????? ????????????
                              </Button>
                            : <div className={s.create_task_form}>
                                <TextField
                                    label="?????????????? ?????????????????? ????????????"
                                    onBlur={() => setToggleCreateTask(true)}
                                    autoFocus
                                    multiline
                                    maxRows={3}
                                    size="small"
                                    value={createTaskText}
                                    onChange={onChangeCreateText}
                                    onKeyDown={createTask}
                                    placeholder="?????????????? Enter ?????? ????????????????????"
                                    className={s.create_textfield} />

                            </div>
                    }
                </div>
            </div>

    )
}


export default Card