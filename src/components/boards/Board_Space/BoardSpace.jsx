import React, { useEffect, useState } from "react";
import s from './boardspace.module.css'
import { useSelector, useDispatch } from "react-redux";
import Card from "./Cards/Card";
import { useSearchParams } from 'react-router-dom'
import { createCard, getBoardFromId, getCardsFromBoardId } from '../../../actions/boards'
import { Button, TextField, Typography } from "@mui/material";
import Preloader from '../../common/Preloader'
import CreateCard from "./Cards/CreateCard";

let BoardSpace = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [clickedCreate, setClickedCreate] = useState(false);

    const postQuery = searchParams.get('id');
    const dispatch = useDispatch()
    const thisBoard = useSelector(state => state.boards.foundBoard)
    const cards = useSelector(state => state.boards.cards)
    const isAuth = useSelector(state => state.user.isAuth)
    const userId = useSelector(state => state.user.currentUser.id)

    useEffect(() => {
        if (thisBoard.length != null) {
            if (isAuth && thisBoard[0].boardsId != postQuery) {
                dispatch(getBoardFromId(postQuery, userId))

            }
        }

    })

    if (thisBoard.length == null) {
        if (isAuth) {
            console.log("board null")
            dispatch(getBoardFromId(postQuery, userId))

        }
    }

    if (cards.length == 0) {
        if (isAuth) {
            if (thisBoard.length != null) {
                dispatch(getCardsFromBoardId(thisBoard[0].boardsId))
            }
        }

    }

    let createColumn = () => {
        dispatch(createCard(thisBoard[0].boardsId, userId))
    }


    if (thisBoard.length == null) {
        return (
            <div>
                <Typography variant="h2" sx={{ pt: 25 }}>Нет доступа к доске / Доски не существует</Typography>
            </div>
        )
    }
    return (
        <div className={s.boardspace}>
            <Typography>hhhhh {thisBoard[0].tittle}</Typography>
            <div style={{ backgroundColor: thisBoard[0].background }} className={s.bg}></div>
            <div className={s.cards}>
                {cards.map((c, ind) =>
                    <Card key={ind} cardId={c.id} boardId={thisBoard[0].boardsId} name={c.name} />
                )}
            </div>
            
            <Button onClick={createColumn} variant="contained" className={s.btn_new_column}>
                + Добавить колонку
            </Button>


        </div>
    )
}

export default BoardSpace;