import React, { useEffect, useState } from "react";
import s from './boardspace.module.css'
import { useSelector, useDispatch } from "react-redux";
import Card from "./Cards/Card";
import { Navigate, useSearchParams } from 'react-router-dom'
import { createCard, getAllTasks, getBoardFromId, getCardsFromBoardId, getOutputDoc, inviteUser, removeBoard, removeCard, renameBoard, setFalseInvite } from '../../../actions/boards'
import { Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, TextField, Typography, Snackbar, Alert } from "@mui/material";
import Preloader from '../../common/Preloader'
import CreateCard from "./Cards/CreateCard";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import { saveAs } from "file-saver";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { deleteTasksAC } from "../../../reducers/boardsReducer";
import GroupAddIcon from '@mui/icons-material/GroupAdd';




let BoardSpace = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [clickedCreate, setClickedCreate] = useState(false);
    const [updater, setUpdater] = useState(0)

    const [nameInvite, setNameInvite] = React.useState("");

    const [nameBoard, setNameBoard] = React.useState("");
    const [editingNameBoard, setEditingNameBoard] = React.useState(false);

    const [openSuccessInvite, setOpenSuccessInvite] = React.useState(false);

    const postQuery = searchParams.get('id');

    const dispatch = useDispatch()
    const thisBoard = useSelector(state => state.boards.foundBoard)
    const cards = useSelector(state => state.boards.cards)
    const isAuth = useSelector(state => state.user.isAuth)
    const userId = useSelector(state => state.user.currentUser.id)
    const tasks = useSelector(state => state.boards.tasks);

    const cardIdDND = useSelector(state => state.boards.cardIdDND);

    const successInviteUser = useSelector(state => state.boards.invitedUserStatus);

    const cardsId = [];
    if (cards.length !== 0) {
        cards.map(e => {
            cardsId.push(e.id);
        })
    }


    useEffect(() => {
        if (typeof thisBoard[0] !== 'undefined') {
            if (isAuth) {
                if (thisBoard[0].boardsId != postQuery) {
                    dispatch(getBoardFromId(postQuery, userId));
                    dispatch(getCardsFromBoardId(-1));
                    dispatch(getCardsFromBoardId(postQuery));
                    
                }

                if (cards.length == 0 || (cards.length > 1 && cards[0].boardId != postQuery)) {
                    dispatch(getCardsFromBoardId(thisBoard[0].boardsId));
                }
                console.log('tasks:')
                console.log(tasks)
                if (tasks.length == 0 || (tasks.length > 0 && tasks[0].boardId != postQuery)) {
                    cards.map(e => {
                        cardsId.push(e.id);
                    })
                    dispatch(getAllTasks(cardsId, postQuery));
                }
            }

        }
        else {
            if (isAuth) {
                dispatch(getBoardFromId(postQuery, userId));
            }
        }
        if(typeof thisBoard[0] !== 'undefined' && nameBoard == '' && !editingNameBoard){
            console.log('set name')
            setNameBoard(thisBoard[0].tittle)
        }
    })

    let createColumn = () => {
        dispatch(createCard(thisBoard[0].boardsId, userId))
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [anchorElInvite, setAnchorElInvite] = React.useState(null);
    const openInvite = Boolean(anchorElInvite);
    const handleClickInvite = (event) => {
      setAnchorElInvite(event.currentTarget);
    };
    const handleCloseInvite = () => {
      setAnchorElInvite(null);
    };

    const handleClickSuccesInvite = (event) => {
        setOpenSuccessInvite(true)
      };
    const handleCloseSuccessInvite = () => {
        setOpenSuccessInvite(false)
    };
    const outputDoc = async () => {
        const docx = require("docx");
        const response = await axios.post("http://localhost:4850/api/board/output_doc", {
            boardId: postQuery
        })
        const res = response.data.values
        console.log(res)
        let docs = {
            sections: [{
                properties: {},
                children: []
            }]
        }
        for (let i = 0; i < res.length; i++) {
            docs.sections[0].children.push(
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({ text: 'Название карточки:\t' + res[i].name, size: 24})
                    ]
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({ text: 'Номер карточки:\t ' + res[i].id, size: 24})
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({ text: 'Описание карточки:\t', size: 24})
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({text: 'Номер создателя карточки:\t' + res[i].creatorId, size: 24})
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({ text: 'Дата создания карточки:\t' + res[i].createdDate, size: 24})
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({ text: 'Задачи:', size: 24})
                    ]
                }),
            );
            for (let k = 0; k < res[i].tasks.length; k++) {
                docs.sections[0].children.push(
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun(' ')
                        ]
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun('\t Название задачи:\t' + res[i].tasks[k].name)
                        ]
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun('\t Номер задачи:\t' + res[i].tasks[k].id)
                        ]
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun('\t Описание задачи:\t')
                        ]
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun('\t Номер создателя задачи:\t' + res[i].tasks[k].creatorId)
                        ]
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun('\t Дата создания задачи:\t' + res[i].tasks[k].createdDate)
                        ]
                    }),
                )
            }
            docs.sections[0].children.push(
                new docx.Paragraph({
                    children: [
                        new docx.TextRun(' ')
                    ]
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun(' ')
                    ]
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun(' ')
                    ]
                }),
            )
        }
        
        console.log(docs)

        let doc = new docx.Document(docs)

        docx.Packer.toBlob(doc).then(blob => {
            saveAs(blob, `board_${postQuery}.docx`)
            
        });

    }

    const boardRemove = () => {
        removeBoard(postQuery, userId);
    }

    // const cardRemove = (card) => {
    //     dispatch(removeCard(card, thisBoard[0].boardsId))
    // }

    if (thisBoard.length == null) {
        return (
            <div>
                <Typography variant="h2" sx={{ pt: 25 }}>Нет доступа к доске / Доски не существует</Typography>
            </div>
        )
    }
    const mybg = thisBoard[0].background;
    const myboardsForLink = `/boards?user=${userId}`;

    let draggableCardId = -1;

    const dragStartCard = (e) => {
        draggableCardId = e.currentTarget.getAttribute('cardId')
        console.log("current card:" + draggableCardId)
    }

    const dragOverHandler = (e) => {
        console.log(e.target.getAttribute('cardId'))
        if (e.target.className == s.dragCard_left && draggableCardId != -1) {
            e.target.parentNode.style.borderLeft = '.5rem solid #ff9100';
        }
        if (e.target.className == s.dragCard_right && draggableCardId != -1) {
            e.target.parentNode.style.borderRight = '.5rem solid #ff9100';
        }
    }

    const onChangeNameInvite = e => {
        setNameInvite(e.target.value)
    }

    const sendInvite = () => {
        dispatch(inviteUser(nameInvite, postQuery, userId))
    }
    if(successInviteUser === true){
        handleCloseInvite()
        handleClickSuccesInvite()
        setNameInvite('')
        dispatch(setFalseInvite())
    }

    const blurNameBoard = () => {
        console.log(nameBoard.length)
        if(nameBoard.length == 0 || !nameBoard.trim()){
            renameBoard(postQuery, 'Доска')
            setNameBoard('Доска');
        }
        else{
            renameBoard(postQuery, nameBoard)
        }
        setEditingNameBoard(false)
        
    }


    return (
        <div className={s.boardspace} updater={updater}>
            <div className={s.board_header}>
                <div className={s.container_bg}></div>
                <div className={s.container} >
                    
                    <div className={s.board_header_left} color="white">
                        <TextField
                            value={nameBoard}
                            label="Название доски"
                            variant="outlined"
                            onChange={e => setNameBoard(e.target.value)}
                            size="small"
                            color={"white"}
                            focused
                            autoComplete="off"
                            onClick={() => setEditingNameBoard(true)}
                            onBlur={blurNameBoard}
                            sx={{input: {color: '#fff'}}} />
                        <Button startIcon={<FavoriteBorderIcon />} color="white" size="small" disabled>
                            Избранное
                        </Button>
                        <Divider orientation="vertical" flexItem />
                        <Button
                            onClick={createColumn}
                            // variant="outlined" 
                            className={s.btn_new_column}
                            startIcon={<AddIcon />}
                            color="white"
                            size="small" >
                            Карточка
                        </Button>
                        <Divider orientation="vertical" flexItem />
                        <Button startIcon={<GroupIcon />} color="white" size="small" disabled >
                            Группа
                        </Button>
                        <Button 
                        startIcon={<PersonAddAltIcon />} 
                        color="white" 
                        size="small"
                        aria-controls={openInvite ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openInvite ? 'true' : undefined}
                        onClick={handleClickInvite} >
                            Пригласить
                        </Button>
                        <Menu
                            id="menu_invite"
                            anchorEl={anchorElInvite}
                            open={openInvite}
                            onClose={handleCloseInvite}
                            MenuListProps={{ 'aria-labelledby': 'basic-button', }}
                            sx={{ padding: '10px' }}>
                            <TextField 
                                autoComplete="off" 
                                placeholder="Имя пользователя" 
                                size="small" 
                                value={nameInvite}
                                onChange={e => onChangeNameInvite(e)}
                                sx={{ m: '5px 10px' }}
                                error={successInviteUser===false || successInviteUser=='exist'}
                                helperText={
                                    successInviteUser==false
                                    ? "Пользователя не существует"
                                    : successInviteUser=='exist'
                                        ? "Пользователь уже приглашен / участвует"
                                        : ""
                                } />

                            <IconButton onClick={sendInvite} sx={{ m: '5px 10px' }}>
                                <GroupAddIcon />
                            </IconButton>
                            <Divider mt={'5px'} />
                            <Typography width={300} flex m={'auto'} mt={'5px'} fontSize={14} sx={{ textAlign: 'center' }}>
                                Приглашенному пользователю будет выдана роль "Участник"
                            </Typography>
                        </Menu>
                        
                        <Snackbar open={openSuccessInvite} autoHideDuration={6000} onClose={handleCloseSuccessInvite}>
                            <Alert onClose={handleCloseSuccessInvite} severity="success" sx={{ width: '100%' }}>
                                Приглашение успешно отправленно!
                            </Alert>
                        </Snackbar>
                    </div>

                    <Button
                        startIcon={<MenuIcon />}
                        color="white"
                        className={s.board_header_right}
                        size="small"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick} >
                        Меню
                    </Button>
                    <Menu
                        id="menu_task"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{'aria-labelledby': 'basic-button',}}>
                        <MenuItem onClick={outputDoc}>
                            <ListItemIcon>
                                <ArticleIcon />
                            </ListItemIcon>
                            Выходной документ
                        </MenuItem>
                        <MenuItem onClick={boardRemove} component={NavLink} to={myboardsForLink}>
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            Удалить доску
                        </MenuItem>
                    </Menu>

                </div>
                {/* <Divider orientation="horizontal" sx={{width: '1200px'}} /> */}
            </div>

            <div style={{ backgroundImage: mybg}} className={s.bg}></div>

            <div className={s.cards} updater={cards}>
                {cards.map((c, ind) => {
                    console.log(c)
                    if (typeof cards[0].none === 'undefined') {
                        if (cards[0].boardId == postQuery) {
                            return (
                                <Card
                                    key={c.id}
                                    cardId={c.id}
                                    boardId={thisBoard[0].boardsId}
                                    name={c.name}
                                    tasks={tasks}
                                    getCards={null}
                                    order={c.order}
                                    cardsId={cardsId} />
                            )
                        }
                    }
                }
                )}
            </div>
        </div>
    )
}

export default BoardSpace;