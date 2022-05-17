import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";
import { setCardsAndTasksAC, setTasksAC } from "../reducers/cardsReducer";

export const addTask = (nameTask, cardId, creatorId, cardsId, boardId) => {
    return async dispatch => {
        try{
            const addTaskRes = await axios.post("http://localhost:4850/api/task/create", {
                nameTask, cardId, creatorId, boardId
            });
            console.log(addTaskRes.data)
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

export const moveTask = (taskId, cardId, cardsId, beforeOrder, isThisCard, firstOrder, boardId) => {
    return async dispatch => {
        const moveCardRes = await axios.post("http://localhost:4850/api/task/move", {
            taskId, cardId, beforeOrder, isThisCard, firstOrder
        });
        const cardsRes = await axios.post("http://localhost:4850/api/board", {
            boardId
        });
        dispatch(setCardsAndTasksAC(cardsRes.data.values))
        
    }
}

export const renameTask = (taskId, taskText, cardsId, cardIdRed, taskIdRed, boardId) => {
    return async dispatch => {
        const renameTaskRes = await axios.post("http://localhost:4850/api/task/rename", {
            taskId, taskText
        })
        const cardsRes = await axios.post("http://localhost:4850/api/board", {
            boardId
        });
        dispatch(setCardsAndTasksAC(cardsRes.data.values))
    }
}

export const removeTask = (taskId, order, boardId) => {
    return async dispatch => {
        try {
            const removeTaskRes = await axios.post("http://localhost:4850/api/task/remove", {
                taskId, order
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

export const toggleTaskDone = (taskId, doneStatus, boardId) => {
    return async dispatch => {
        const status = doneStatus + 1;
        const renameTaskRes = await axios.post("http://localhost:4850/api/task/toggleChecked", {
            taskId, status
        })
        const cardsRes = await axios.post("http://localhost:4850/api/board", {
            boardId
        });
        dispatch(setCardsAndTasksAC(cardsRes.data.values))
    }
}