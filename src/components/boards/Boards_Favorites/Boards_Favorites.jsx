import { Button, Divider, TextField, ToggleButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoard, getBoards, getBoardsFavorite, getBoardsInvite } from "../../../actions/boards";
import BoardCard from "../board_cards/BoardCard";
import s from './boards_favorites.module.css'
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import CheckCircleIcon from '@mui/icons-material/Done';
import Preloader from "../../common/Preloader";
import { toggleIsFetchingAC } from "../../../reducers/boardsReducer";
import { useSearchParams } from "react-router-dom";
import BoardCardInvite from "../board_cards/BoardCardInvite";

let Boards_Favorites = () => {

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
        dispatch(getBoardsFavorite(postQuery))       
    },[])

    

    const isFetching = useSelector(state => state.boards.isFetching)


    if (!thisUser) {
        return (
            <div>
                <Typography variant="h2" sx={{ pt: 25 }}>Нет доступа к доскам</Typography>
            </div>
        )
    }
    return (
        <div className={s.boards_inner} >
            {isFetching 
            ? <Preloader /> 
            : <div className={s.boards}>
                {
                    boards.map((br, ind) => {
                        if (typeof boards[0].none === 'undefined') {
                            return (
                                <BoardCard
                                    id={br.boardsId}
                                    key={br.boardsId}
                                    name={br.tittle}
                                    color={br.background}
                                    isFavoritePage='true'
                                    userId={userId}
                                    invited={br.invitedId}
                                    favorite={br.favoriteId} />
                            )
                        }
                    })
                }
            </div>}
            
            
        </div>
    )
}

export default Boards_Favorites;