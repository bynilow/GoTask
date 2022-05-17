import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";
import {setCardsAndTasksAC} from "../reducers/cardsReducer";

export const createCard = (boardId, userId) => {
    return async dispatch => {
        try {
            const createCardRes = await axios.post("http://localhost:4850/api/card/create", {
                boardId,
                userId
            });
            const cardsRes = await axios.post("http://localhost:4850/api/board", {
                boardId
            });
            dispatch(setCardsAndTasksAC(cardsRes.data.values))
        }
        catch (e) {
            console.log("hehe " + e)
        }
    }
}

export const changeCardName = async (cardId, nameCard, boardId) => {
    const response = await axios.post("http://localhost:4850/api/card/name", {
        cardId,
        nameCard
    })
    // getCardsFromBoardId(boardId);
}

export const removeCard = (cardId, boardId) => {
    return async dispatch => {
        try {
            const resRemove = await axios.post("http://localhost:4850/api/card/remove", {
                cardId
            })
            const cardsRes = await axios.post("http://localhost:4850/api/board", {
                boardId
            });
            dispatch(setCardsAndTasksAC(cardsRes.data.values))
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const getCards = (boardId) => {
    return async dispatch => {
        console.log('get cards')
        try{
            const cardsRes = await axios.post("http://localhost:4850/api/board", {
                boardId
            });
            dispatch(setCardsAndTasksAC(cardsRes.data.values))
        }
        catch(e){
            console.log(e)
        }
    }
}

export const moveCard = (cardId, selectedOrder, dir, boardId) => {
    return async dispatch => {
        const moveCardRes = await axios.post("http://localhost:4850/api/card/move", {
            cardId, selectedOrder, dir, boardId
        });
        const cardsRes = await axios.post("http://localhost:4850/api/board", {
            boardId
        });
        dispatch(setCardsAndTasksAC(cardsRes.data.values))
        
    }
}