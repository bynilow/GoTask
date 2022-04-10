import React, { useEffect, useState } from "react";
import s from './boardspace.module.css'
import { useSelector, useDispatch } from "react-redux";
import Card from "./Cards/Card";
import { useSearchParams } from 'react-router-dom'
import { createCard, getAllTasks, getBoardFromId, getCardsFromBoardId } from '../../../actions/boards'
import { Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, TextField, Typography } from "@mui/material";
import Preloader from '../../common/Preloader'
import CreateCard from "./Cards/CreateCard";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';

let BoardSpace = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [clickedCreate, setClickedCreate] = useState(false);
    const [updater, setUpdater] = useState(0)

    const postQuery = searchParams.get('id');

    const dispatch = useDispatch()
    const thisBoard = useSelector(state => state.boards.foundBoard)
    const cards = useSelector(state => state.boards.cards)
    const isAuth = useSelector(state => state.user.isAuth)
    const userId = useSelector(state => state.user.currentUser.id)
    const tasks = useSelector(state => state.boards.tasks);

    

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
                    console.log(cards)
                    if (cards > 0) {
                        
                        dispatch(getAllTasks(-1));
                        dispatch(getAllTasks(cardsId));
                    }
                }

                if (cards.length == 0 || (cards.length > 1 && cards[0].boardId != postQuery)) {
                    dispatch(getCardsFromBoardId(thisBoard[0].boardsId));
                    // setUpdater(1)
                    // setUpdater(1)
                }

                if (tasks.length == 0 || (tasks.length > 1 && tasks[1].boardId != postQuery)) {
                    cards.map(e => {
                        cardsId.push(e.id);
                    })
                    console.log('here111') // here loop
                    dispatch(getAllTasks(cardsId));
                    console.log(tasks)
                }

                if (updater == 0) {

                }
            }

        }
        else {
            if (isAuth) {
                dispatch(getBoardFromId(postQuery, userId));
            }
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

    if (thisBoard.length == null) {
        return (
            <div>
                <Typography variant="h2" sx={{ pt: 25 }}>Нет доступа к доске / Доски не существует</Typography>
            </div>
        )
    }
    console.log("backgroundImage: " + thisBoard[0].background)
    const mybg = thisBoard[0].background;
    return (
        <div className={s.boardspace} updater={updater}>
            <div className={s.board_header}>
                <div className={s.container_bg}></div>
                <div className={s.container} >
                    
                    <div className={s.board_header_left} color="white">
                        <TextField
                            value={thisBoard[0].tittle}
                            label="Название доски"
                            variant="outlined"
                            size="small"
                            color="white" />
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
                        <Button startIcon={<PersonAddAltIcon />} color="white" size="small" disabled>
                            Пригласить
                        </Button>
                        
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
                        id="menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <ArticleIcon />
                            </ListItemIcon>
                            Выходной документ
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
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
            <div className={s.cards} updater={updater}>
                {cards.map((c, ind) => {
                    // console.log(c)
                    if (typeof cards[0].none === 'undefined') {
                        if (cards[0].boardId == postQuery) {
                            return (
                                <Card
                                    key={ind}
                                    cardId={c.id}
                                    boardId={thisBoard[0].boardsId}
                                    name={c.name}
                                    tasks={tasks}
                                    getCards={null}
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