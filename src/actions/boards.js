import React, { Component } from "react"; 
import axios from "axios"
import { Navigate } from "react-router-dom";
import { setBoardsAC, setCreatedBoardAC, toggleIsFetchingAC, setFoundBoardAC, setCardsAC, createCardAC, setTasksAC, deleteTasksAC, setInviteUserStatusAC } from "../reducers/boardsReducer";


export const getBoards = (userId) => {
    return async dispatch => {
        try{
            const response = await axios.post("http://localhost:4850/api/boards/boards", {
                userId
            });
            dispatch(setBoardsAC(response.data.values))
            dispatch(toggleIsFetchingAC(false))
        }
        catch(e){
            console.log(e.response.data.values.none)
            dispatch(setBoardsAC([{none: e.response.data.values.none}]))
            dispatch(toggleIsFetchingAC(false))
        }
    }
}

export const getBoardFromId = (boardId, userId) => {
    return async dispatch => {
        try {
            const response = await axios.post("http://localhost:4850/api/boards/board", {
                boardId, userId
            });
            dispatch(setFoundBoardAC(response.data.values))
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const getCardsFromBoardId = (boardId) => {
    try{
        return async dispatch => {
            const response = await axios.post("http://localhost:4850/api/boards/cards", {
                boardId
            });
            if(response.data.values.length == 0){
                dispatch(setCardsAC([{none: 1}]))
            }
            else{
                dispatch(setCardsAC(response.data.values))
            }
            
        }
    }
    catch(e){
        console.log(e)
    }
    
}

export const createBoard = (userId, name, color, visibility) => {
    return async dispatch => {
        try {

            const response = await axios.post("http://localhost:4850/api/boards/create", {
                userId,
                name,
                color,
                visibility
            });
            const board = response.data.values;
            const response2 = await axios.post("http://localhost:4850/api/boards/boards", {
                userId
            });
            dispatch(setBoardsAC(response2.data.values))            
        }
        catch (e) {
            console.log("hehe " + e)
        }
    }
}

export const createCard = (boardId, userId) => {
    return async dispatch => {
        try {
            const response = await axios.post("http://localhost:4850/api/card/create", {
                boardId,
                userId
            });
            const response2 = await axios.post("http://localhost:4850/api/boards/cards", {
                boardId
            });
            dispatch(setCardsAC(response2.data.values))
            dispatch(createCardAC(response.data.values))
            
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
    getCardsFromBoardId(boardId);

}

export const getAllTasks = (cardsId, boardId) => {
    return async dispatch => {
        try {
            console.log('here')
            const response = await axios.post("http://localhost:4850/api/card/cards", {
                cardsId
            });
            console.log(response.data.values)
            if(response.data.values == null){
                dispatch(setTasksAC([{none: -1, boardId}]))
            }
            else{
                dispatch(setTasksAC(response.data.values))
            }
            
        }
        catch (e) {
            console.log()
            console.log(e)
        }
    }
}

export const addTask = (nameTask, cardId, creatorId, cardsId, boardId) => {
    return async dispatch => {
        try{
            const response = await axios.post("http://localhost:4850/api/task/create", {
                nameTask, cardId, creatorId, boardId
            });
            const response2 = await axios.post("http://localhost:4850/api/card/cards", {
                    cardsId
            });
            console.log(response2.data.values)
            dispatch(setTasksAC(response2.data.values));
        }
        catch(e){
            console.log(e)
        }
        
    }
}

export const moveTask = (taskId, cardId, cardsId, beforeOrder, isThisCard, firstOrder) => {
    return async dispatch => {
        const response = await axios.post("http://localhost:4850/api/task/move", {
            taskId, cardId, beforeOrder, isThisCard, firstOrder
        });
        const response2 = await axios.post("http://localhost:4850/api/card/cards", {
                cardsId
        });
        dispatch(setTasksAC(response2.data.values));
        
    }
}

export const renameTask = (taskId, taskText, cardsId) => {
    return async dispatch => {
        const response = await axios.post("http://localhost:4850/api/task/rename", {
            taskId, taskText
        })
        const response2 = await axios.post("http://localhost:4850/api/card/cards", {
                cardsId
        });
        dispatch(setTasksAC(response2.data.values));
    }
}

export const getOutputDoc = async(boardId) => {
    try{
        const response = await axios.post("http://localhost:4850/api/board/output_doc", {
            boardId
        })
        // console.log(response)
        return response
    }
    catch(e){
        console.log(e)
    }
}

export const removeBoard = async(boardId, userId) => {
    try{
        const response = await axios.post("http://localhost:4850/api/board/remove", {
            boardId
        })
        return <Navigate to={`/boards?user=${userId}`} />
        return response
    }
    catch(e){
        console.log(e)
    }
}

export const removeTask = (taskId, order, cardsId) => {
    return async dispatch => {
        try {
            const response = await axios.post("http://localhost:4850/api/task/remove", {
                taskId, order, cardsId
            })
            
            const response2 = await axios.post("http://localhost:4850/api/card/cards", {
                cardsId
            });
            console.log(response2.data.values)
            if(response2.data.values == null){
                dispatch(setTasksAC([{none: -1}]))
            }
            else{
                dispatch(setTasksAC(response2.data.values))
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const removeCard = (cardId, boardId) => {
    return async dispatch => {
        try {
            const resRemove = await axios.post("http://localhost:4850/api/card/remove", {
                cardId
            })
            const resCards = await axios.post("http://localhost:4850/api/boards/cards", {
                boardId
            });
            if(resCards.data.values.length == 0){
                dispatch(setCardsAC([{none: 1}]))
            }
            else{
                dispatch(setCardsAC(resCards.data.values))
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const moveCard = (cardId, selectedOrder, dir, boardId) => {
    return async dispatch => {
        const moveCardRes = await axios.post("http://localhost:4850/api/card/move", {
            cardId, selectedOrder, dir, boardId
        });
        const getCardsRes = await axios.post("http://localhost:4850/api/boards/cards", {
            boardId
        });
        if (getCardsRes.data.values.length == 0) {
            dispatch(setCardsAC([{ none: 1 }]))
        }
        else {
            dispatch(setCardsAC(getCardsRes.data.values))
        }
    }
}

export const inviteUser = (userName, boardId, senderId) => {
    return async dispatch => {
        const findUser = await axios.post("http://localhost:4850/api/getUserByLogin", {
            userName
        })
        const userId = findUser.data.values.id;
        const foundUser = findUser.data.values.found;
        if(foundUser){
            const findInvite = await axios.post("http://localhost:4850/api/board/findInvite", {
                userId, boardId
            })
            const foundInvite = findInvite.data.values.found
            console.log(foundInvite)
            if(foundInvite === 'exist'){
                dispatch(setInviteUserStatusAC('exist'))
            }
            else{
                const sendInvite = await axios.post("http://localhost:4850/api/board/invite", {
                    boardId, userId, senderId
                })
                
                dispatch(setInviteUserStatusAC(foundUser))
            }
        }
        else{
            dispatch(setInviteUserStatusAC(foundUser))
        }        
        
        
    }
}

export const setFalseInvite = () => {
    return dispatch => {
        dispatch(setInviteUserStatusAC(null))
    }
}

export const getBoardsInvite = (userId) => {
    return async dispatch => {
        try{
            const response = await axios.post("http://localhost:4850/api/board/getInvite", {
                userId
            });
            dispatch(setBoardsAC(response.data.values))
            dispatch(toggleIsFetchingAC(false))
        }
        catch(e){
            console.log(e.response.data.values.none)
            dispatch(setBoardsAC([{none: e.response.data.values.none}]))
            dispatch(toggleIsFetchingAC(false))
        }
    }
}

export const acceptInvite = (userId,inviteId,boardId) => {
    return async dispatch => {
        try{
            const accept = await axios.post("http://localhost:4850/api/board/acceptInvite", {
                inviteId, userId, boardId
            });
            const getInvites = await axios.post("http://localhost:4850/api/board/getInvite", {
                userId
            });
            dispatch(setBoardsAC(getInvites.data.values))
        }
        catch(e){
            console.log(e)
        }
    }
}

export const declineInvite = (userId,inviteId) => {
    return async dispatch => {
        try{
            const decline = await axios.post("http://localhost:4850/api/board/declineInvite", {
                inviteId
            });
            const getInvites = await axios.post("http://localhost:4850/api/board/getInvite", {
                userId
            });
            dispatch(setBoardsAC(getInvites.data.values))
        }
        catch(e){
            console.log(e)
        }
    }
}