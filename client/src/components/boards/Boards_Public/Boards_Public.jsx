import { Box, Button, Divider, Hidden, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoard, getBoards } from "../../../actions/boards";
import BoardCard from "../board_cards/BoardCard";
import s from './boards_public.module.css'

import Preloader from "../../common/Preloader";
import { toggleIsFetchingAC } from "../../../reducers/boardsReducer";
import { useSearchParams, Navigate } from "react-router-dom";

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

let Boards_Public = (props) => {


    if (!props.isAuth) return <Navigate to='/login' />

    const [selectBoards, setSelectBoards] = React.useState(1);
    const [nameBoardText, setNameBoardText] = React.useState('');

    const userId = useSelector(state => state.user.currentUser.id)
    const boards = useSelector(state => state.boards.boards)
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams();
    const postQuery = searchParams.get('user');
    const isAuth = useSelector(state => state.user.isAuth)

    let thisUser;

    thisUser = postQuery == userId;

    useEffect(() => {
        dispatch(toggleIsFetchingAC(true))
        dispatch(getBoards(postQuery))
    }, [])

    const isFetching = useSelector(state => state.boards.isFetching)


    
    return (
        <div className={s.boards_inner} >
            {isFetching
                ? <Preloader />
                : <div className={s.boards_upper}>
                    <div className={s.header_select}>
                        <div className={s.header_search}>
                            <TextField 
                            size='small' 
                            label='Название доски' 
                            sx={{ width: '250px', margin: '0 5px' }}
                            value={nameBoardText}
                            onChange={event => setNameBoardText(event.target.value)} />
                            <Select
                                size='small'
                                value={selectBoards}
                                sx={{ width: '250px', margin: '0 5px' }}
                                onChange={(event) => setSelectBoards(event.target.value)}>
                                <MenuItem value={1} >Сначала популярные</MenuItem>
                                <MenuItem value={2} >Сначала менее популярные</MenuItem>
                            </Select>
                            <Button 
                            sx={{margin: '0 5px'}} 
                            variant="contained" 
                            startIcon={<SearchIcon />}
                            onClick={() => dispatch(getBoards(postQuery, nameBoardText, selectBoards))} >
                                Найти
                            </Button>
                        </div>
                        
                    </div>
                    
                    <div className={s.boards}>
                        {
                            boards.map((br, ind) => {
                                if (typeof boards[0].none === 'undefined') {
                                    return (
                                        <BoardCard
                                            id={br.boardsId}
                                            key={br.boardsId}
                                            name={br.tittle}
                                            date={br.createdDate}
                                            countGroup={br.countGroup}
                                            color={br.background}
                                            userId={userId}
                                            invited={br.invitedId}
                                            favorite={br.favoriteId} />
                                    )
                                }
                            })
                            
                        }
                        <div className={s.hidden_boardCard} />
                        <div className={s.hidden_boardCard} />
                        <div className={s.hidden_boardCard} />
                        <div className={s.hidden_boardCard} />

                        
                    </div>
                </div>}

        </div>
    )
}

export default Boards_Public;