import { Button, Divider, TextField, ToggleButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoard, getBoards } from "../../../actions/boards";
import BoardCard from "../board_cards/BoardCard";
import s from './boards_My.module.css'

import Preloader from "../../common/Preloader";
import { toggleIsFetchingAC } from "../../../reducers/boardsReducer";
import { useSearchParams, Navigate } from "react-router-dom";
import Create_Board_Popup from "./Create_Board_Popup/Create_Board_Popup";

let Boards_My = (props) => {


    if (!props.isAuth) return <Navigate to='/login' />



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

    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const onClosePopup = () => {
        setIsPopupOpen(false)
    }
    const onClickCreate = () => {
        setIsPopupOpen(true)

    }

    console.log(boards)
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
                    <Button 
                    onClick={onClickCreate} 
                    variant="contained" 
                    color="secondary" 
                    className={s.btn_create}
                    sx={{marginBottom: '10px'}}>
                        Создать
                    </Button>

                    {
                        boards.map((br, ind) => {
                            if (typeof boards[0].none === 'undefined') {
                                return (
                                    <BoardCard
                                        id={br.boardsId}
                                        key={br.boardsId}
                                        name={br.tittle}
                                        color={br.background}
                                        userId={userId}
                                        invited={br.invitedId}
                                        favorite={br.favoriteId} />
                                )
                            }
                        })
                    }
                </div>}
            {
                isPopupOpen
                    ? <div className={s.popup}>
                        <div className={s.popup_bg} />
                        <Create_Board_Popup closePopup={() => onClosePopup()} userId={postQuery} />
                    </div>
                    : <></>

            }

        </div>
    )
}

export default Boards_My;