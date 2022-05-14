import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PublishIcon from '@mui/icons-material/Publish';
import { Alert, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useSearchParams } from 'react-router-dom';
import { createCard, getBoardFromId, inviteUser, removeBoard, renameBoard, 
    renameTask, setFalseInvite, setFavoriteInBoard, uploadBoard } from '../../../actions/boards';
import { actionLog } from "../../../actions/user";
import Preloader from '../../common/Preloader.jsx';
import s from './boardSpace.module.css';
import BoardLogs from "./Board_Logs/BoardLogs.jsx";
import Card from "./Cards/Card.jsx";
import GroupList from "./Group_List/GroupList.jsx";

let BoardSpace = (props) => {

    if(!props.isAuth) return <Navigate to='/login' />

    const [searchParams, setSearchParams] = useSearchParams();
    const [clickedCreate, setClickedCreate] = useState(false);
    const [updater, setUpdater] = useState(0)

    const [nameInvite, setNameInvite] = React.useState("");

    const [openSuccessInvite, setOpenSuccessInvite] = React.useState(false);

    const postQuery = searchParams.get('id');
    const userId = useSelector(state => state.user.currentUser.id)
    const userName = useSelector(state => state.user.currentUser.login)

    const dispatch = useDispatch()
    
    const cards = useSelector(state => state.boards.cardsAndTasks)
    const cardIdDND = useSelector(state => state.boards.cardIdDND);

    const successInviteUser = useSelector(state => state.boards.invitedUserStatus);

    
    const [editingNameBoard, setEditingNameBoard] = React.useState(false);
    const [isGroupInfoOpened, setIsGroupInfoOpened] = React.useState(false);
    
    const isFetching = useSelector(state => state.boards.isFetching)
    
    const isAuth = useSelector(state => state.user.isAuth)
    const thisBoard = useSelector(state => state.boards.foundBoard)
    
    const [nameBoard, setNameBoard] = React.useState(thisBoard ? thisBoard.tittle : '');
    const [isFavorite, setIsFavorite] = React.useState(null);
    const [taskUpdater, setTaskUpdater] = React.useState(Date.now());
    const [isLogsOpen, setIsLogsOpen] = React.useState(false);

    useEffect(() => {
        const checkBoard = userId && (typeof cards.findTasks === 'undefined' || cards.findTasks != postQuery) && (!cards.length || cards[0].boardId != postQuery) && (!thisBoard || thisBoard.boardsId)
        if(checkBoard) dispatch(getBoardFromId(postQuery, userId))
        setNameBoard(thisBoard ? thisBoard.tittle : "")
    }, [isAuth, thisBoard, cards])
    


    let cardCreate = () => {
        dispatch(createCard(postQuery, userId))
        actionLog(userId, postQuery, `Создал новую карточку`)
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
    const convertDeckJson = async() => {
        const response = await axios.post("http://localhost:4850/api/board/output_doc", {
            boardId: postQuery
        })
        const res = response.data.values
        const jsonData = JSON.stringify(res)
        console.log(jsonData)
        var blob = new Blob([jsonData], {type: "text/plain"});
        const fs = require('file-saver')
        const nameFile = 'board_'+postQuery+'.json'
        fs.saveAs(blob, nameFile)
    }
    const uploadDeckJson = async() => {
        
    }
    const uploadJsonHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file)
        reader.onload = function () {
            console.log(reader.result)
            if (reader.result) {
                try {
                    const jsonData = JSON.parse(reader.result);
                    dispatch(uploadBoard(jsonData, postQuery, userId));
                }
                catch (e) {
                    console.log(e)
                }
            }
        };
        handleClose();
        console.log(reader)
        console.log(reader.result)
    }
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
        actionLog(userId, postQuery, `Удалил доску`)
        removeBoard(postQuery, userId);
        
    }

    // const cardRemove = (card) => {
    //     dispatch(removeCard(card, thisBoard[0].boardsId))
    // }

    if (thisBoard == null) {
        return (
            <div>
                <Typography variant="h2" sx={{ pt: 25 }}>Нет доступа к доске / Доски не существует</Typography>
            </div>
        )
    }
    const mybg = thisBoard ? thisBoard.background : '';
    const myboardsForLink = `/brs/boards?user=${userId}`;

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
        actionLog(userId, postQuery, `Пригласил пользователя "${nameInvite}"`)
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
            actionLog(userId, postQuery, `Поменял название доски на "Доска"`)
        }
        else{
            renameBoard(postQuery, nameBoard)
            actionLog(userId, postQuery, `Поменял название доски на "${nameBoard}"`)
        }
        setEditingNameBoard(false)
        
    }

    const onTaskNameChanged = (idTask, nameTask, cardId, cardIdRed, taskIdRed, oldNameTask) => {
        console.log(idTask, nameTask, cardId, cardIdRed, taskIdRed)
        setTaskUpdater(Date.now())
        dispatch(renameTask(idTask, nameTask, cardId, cardIdRed, taskIdRed))
        actionLog(userId, postQuery, `Поменял название карточки "${oldNameTask}" на "${nameTask}"`)
    }

    const onHandleFavoriteClick = () => {
        dispatch(setFavoriteInBoard(postQuery,userId, thisBoard.favoriteId))
    }

    const onClickCloseLogs = () => {
        setIsLogsOpen(false);
    }
    const onClickOpenLogs = () => {
        setIsLogsOpen(true);
        handleClose();
    }

    const iconFavorite = thisBoard && (thisBoard.favoriteId - 1);
    return (
        <div className={s.boardspace}>
            {
                isGroupInfoOpened
                ? <GroupList setCloseGroup={() => setIsGroupInfoOpened(false)} myId={userId} boardId={postQuery}/>
                : <></>
            }
            
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
                            disabled={thisBoard.roleId == 3}
                            autoComplete="off"
                            onClick={() => setEditingNameBoard(true)}
                            onBlur={blurNameBoard}
                            sx={{input: {color: '#fff'}}} />
                        <Button 
                            startIcon={iconFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            color="white"
                            size="small"
                            sx={{ display: { xs: 'none', md: 'inline-flex'} }}
                            onClick={onHandleFavoriteClick}>
                            Избранное 
                        </Button>
                        <Divider orientation="vertical" flexItem />
                        <Button
                            onClick={cardCreate}
                            // variant="outlined" 
                            className={s.btn_new_column}
                            startIcon={<AddIcon />}
                            color="white"
                            disabled={thisBoard.roleId == 3}
                            size="small" >
                            Карточка
                        </Button>
                        <Divider orientation="vertical" flexItem />
                        <Button
                            startIcon={<GroupIcon />}
                            color="white"
                            size="small"
                            onClick={() => setIsGroupInfoOpened(true)} >
                            Группа
                        </Button>
                        <Button
                            startIcon={<PersonAddAltIcon />}
                            color="white"
                            size="small"
                            disabled={thisBoard.roleId == 3}
                            aria-controls={openInvite ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            sx={{ display: { xs: 'none', md: 'inline-flex' } }}
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
                    <div className={s.board_header_right} >
                        <Button
                            startIcon={<MenuIcon />}
                            color="white"
                            size="small"
                            disabled={thisBoard.roleId == 3}
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick} >
                            Меню
                        </Button>
                    </div>
                    
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
                        <MenuItem onClick={convertDeckJson}>
                            <ListItemIcon>
                                <DownloadIcon />
                            </ListItemIcon>
                            Выгрузить доску в JSON
                        </MenuItem>
                        <label htmlFor="contained-button-file">
                            <input
                                accept="application/JSON, .json"
                                id="contained-button-file"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={e => uploadJsonHandler(e)} />
                            <MenuItem
                                component="span"
                                onClick={uploadDeckJson}>
                                <ListItemIcon>
                                    <PublishIcon />
                                </ListItemIcon>
                                Загрузить доску из JSON
                            </MenuItem>
                        </label>
                        
                        <MenuItem onClick={() => onClickOpenLogs()}>
                            <ListItemIcon>
                                <PlaylistAddCheckIcon />
                            </ListItemIcon>
                            Посмотреть журнал активности
                        </MenuItem>
                        
                        <Divider />
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
            {
                isLogsOpen
                ? <BoardLogs closeLogs={() => onClickCloseLogs()} boardId={postQuery} />
                : <></>
            }
            <div style={{ backgroundImage: mybg}} className={s.bg}></div>
            
            {
                isFetching
                ? <Preloader />
                : <div className={s.cards}>
                        {cards.length
                            ? cards.map((card, ind) => {
                                return (
                                    <Card
                                        key={card.id}
                                        cardIdRed={ind}
                                        cardId={card.id}
                                        roleId={thisBoard.roleId}
                                        boardId={postQuery}
                                        name={card.name}
                                        username={userName}
                                        updater={taskUpdater}
                                        tasks={card.task}
                                        order={card.order} />
                                )
                            })
                            : null}
                    </div>
            }
            
        </div>
    )
}

export default BoardSpace;