import React, { useEffect, useState } from "react";
import s from './boardspace.module.css'
import { useSelector, useDispatch } from "react-redux";
import Card from "./Cards/Card";
import { useSearchParams } from 'react-router-dom'
import { createCard, getAllTasks, getBoardFromId, getCardsFromBoardId } from '../../../actions/boards'
import { Button, TextField, Typography } from "@mui/material";
import Preloader from '../../common/Preloader'
import CreateCard from "./Cards/CreateCard";

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
        // dispatch(getAllTasks(cardsId));
    }


    useEffect(() => {
        if(typeof thisBoard[0] !== 'undefined'){
            if(isAuth){
                if (thisBoard[0].boardsId != postQuery) {
                    dispatch(getBoardFromId(postQuery, userId));
                    dispatch(getCardsFromBoardId(-1));
                    dispatch(getCardsFromBoardId(postQuery));
                    console.log(cards)
                    if(cards > 0){
                        dispatch(getAllTasks(-1));
                        dispatch(getAllTasks(cardsId));
                    }
                }
            
                if(cards.length == 0 || cards[0].boardId != postQuery){
                    dispatch(getCardsFromBoardId(thisBoard[0].boardsId));
                    // setUpdater(1)
                    // setUpdater(1)
                }
                
                if(tasks.length == 0 || tasks[0].boardId != postQuery){
                    console.log('get task')
                    cards.map(e => {
                        cardsId.push(e.id);
                    })
                    dispatch(getAllTasks(cardsId));
                }
                if(updater == 0){
                    
                }
                console.log('updates: ' + updater)
            }

        }
        else{
            if(isAuth){
                dispatch(getBoardFromId(postQuery, userId));
            }
        }
        
        
    })

    // if (typeof thisBoard[0] !== 'undefined') {

    //     if (thisBoard[0].boardsId != postQuery) {
    //         dispatch(getBoardFromId(postQuery, userId));
    //         setUpdater(Date.now());
    //     }
    //     else {
    //         if (typeof cards[0] !== 'undefined' && cards[0].boardId != postQuery) {
    //             dispatch(getCardsFromBoardId(postQuery));
    //             dispatch(getAllTasks(cardsId));
    //             setUpdater(Date.now());
    //         }
    //         if (typeof tasks[0] !== 'undefined') {

    //         }
    //     }
    // }



    

 
    
    

    

    

    // if(cardsId.length != 0){
    //     console.log("")
    //     let mysql = "";
    //     cardsId.forEach((el, i) => {
    //         if(i == 0){
    //             mysql = mysql+el;
    //         }
    //         else{
    //             mysql = mysql+(" and "+el);
    //         }
    //     })
    //     console.log("where cardId = "+mysql)
    // }

    

    

    

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
        <div className={s.boardspace} updater={updater}>
            <Typography>{thisBoard[0].tittle}</Typography>
            <div style={{ backgroundColor: thisBoard[0].background }} className={s.bg}></div>
            <div className={s.cards} updater={updater}>
                {cards.map((c, ind) => {
                    // console.log(c)
                    if (typeof cards[0].none === 'undefined') {
                        if(cards[0].boardId == postQuery){
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
            
            <Button onClick={createColumn} variant="contained" className={s.btn_new_column}>
                + Добавить колонку
            </Button>


        </div>
    )
}

export default BoardSpace;