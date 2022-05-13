import React, { Component } from "react"; 
import axios from "axios"
import { Navigate } from "react-router-dom";
import { setBoardsAC, setCreatedBoardAC, toggleIsFetchingAC, setFoundBoardAC, setCardsAC, createCardAC, setTasksAC, deleteTasksAC, setInviteUserStatusAC, setCardsAndTasksAC, setRenameTaskAC, setGroupUsersAC, setFavoriteInBoardAC } from "../reducers/boardsReducer";


export const getBoards = (userId, tittle = '', selectedType = 1) => {
    return async dispatch => {
        try{
            if (selectedType == 1) {
                const allBoards = await axios.post("http://localhost:4850/api/boards/boards", {
                    userId, tittle
                });
                dispatch(setBoardsAC(allBoards.data.values));
                dispatch(toggleIsFetchingAC(false));
            }
            else {
                const selectedBoards = await axios.post("http://localhost:4850/api/boards/withSelect", {
                    userId, tittle, selectedType: selectedType-1
                });
                dispatch(setBoardsAC(selectedBoards.data.values));
                dispatch(toggleIsFetchingAC(false));
            }
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
            const boardRes = await axios.post("http://localhost:4850/api/boards/board", {
                boardId, userId
            });
            const cardsRes = await axios.post("http://localhost:4850/api/board", {
                boardId
            });
            dispatch(setFoundBoardAC(boardRes.data.values))
            dispatch(setCardsAndTasksAC(cardsRes.data.values))

            
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
                userId, tittle: ''
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
            const addTaskRes = await axios.post("http://localhost:4850/api/task/create", {
                nameTask, cardId, creatorId, boardId
            });
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

export const uploadBoard = (jsonData, boardId, userId) => {
    return async dispatch => {
        try {
            console.log("jsonData")
            console.log(jsonData)
            const uploadRes = await axios.post("http://localhost:4850/api/board/upload", {
                jsonData, boardId, userId
            })
            const boardRes = await axios.post("http://localhost:4850/api/boards/board", {
                boardId, userId
            });
            const cardsRes = await axios.post("http://localhost:4850/api/board", {
                boardId
            });
            dispatch(setFoundBoardAC(boardRes.data.values))
            dispatch(setCardsAndTasksAC(cardsRes.data.values))
        }
        catch (e) {
            console.log(e)
        }
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
            dispatch(toggleIsFetchingAC(false))
            dispatch(setBoardsAC(response.data.values))
            
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

export const renameBoard = async(boardId, nameBoard) => {
        const renameBoardRes = await axios.post("http://localhost:4850/api/board/rename", {
            boardId, nameBoard
        })
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

export const setFavorite = (boardId, userId, favoriteId, isFavoritePage) => {
    return async dispatch => {
        try{
            const favorite = favoriteId == 2 ? 1 : 2
            const setFavorite = await axios.post("http://localhost:4850/api/board/setFavorite", {
                userId, boardId, favorite
            });
            if (isFavoritePage) {
                const getFavoritesRes = await axios.post("http://localhost:4850/api/board/getFavorite", {
                    userId
                });
                dispatch(toggleIsFetchingAC(false))
                dispatch(setBoardsAC(getFavoritesRes.data.values))
            }
            else{
                const getBoardsRes = await axios.post("http://localhost:4850/api/boards/boards", {
                    userId
                });
                dispatch(setBoardsAC(getBoardsRes.data.values))
            }
            
        }
        catch(e){
            dispatch(setBoardsAC([{none: e.response.data.values.none}]))
            dispatch(toggleIsFetchingAC(false))
        }
    }
}

export const setFavoriteInBoard = (boardId, userId, favoriteId) => {
    return async dispatch => {
        try {
            if (userId) {
                const favorite = favoriteId == 2 ? 1 : 2;
                const setFavorite = await axios.post("http://localhost:4850/api/board/setFavorite", {
                    userId, boardId, favorite
                });
                console.log('favorited')
                dispatch(setFavoriteInBoardAC(favorite))
            }
        }
        catch(e){
            console.log(e)
        }
    }
}

export const getUsersInGroup = (boardId) => {
    return async dispatch => {
        try{
            const getUsersRes = await axios.post("http://localhost:4850/api/board/getUsersGroup", {
                boardId
            });
            dispatch(setGroupUsersAC(getUsersRes.data.values))
        }
        catch(e){
            console.log(e)
        }
    }
}

export const setTypeUserInGroup = async (boardId, userId, type) => {
    try {
        const setTypeRes = await axios.post("http://localhost:4850/api/board/setTypeUserBoard", {
            boardId, userId, type
        });
    }
    catch (e) {
        console.log(e)
    }
}

export const removeUserFromGroup = (boardId, userId) => {
    return async dispatch => {
        try {
            const removeUserRes = await axios.post("http://localhost:4850/api/board/removeUserFromGroup", {
                boardId, userId
            });
            const getUsersRes = await axios.post("http://localhost:4850/api/board/getUsersGroup", {
                boardId
            });
            dispatch(setGroupUsersAC(getUsersRes.data.values))
        }
        catch (e) {
            console.log(e)
        }
    }
    
}

export const getBoardsFavorite = (userId) => {
    return async dispatch => {
        try{
            const response = await axios.post("http://localhost:4850/api/board/getFavorite", {
                userId
            });
            dispatch(toggleIsFetchingAC(false))
            dispatch(setBoardsAC(response.data.values))
            
        }
        catch(e){
            console.log(e.response.data.values.none)
            dispatch(setBoardsAC([{none: e.response.data.values.none}]))
            dispatch(toggleIsFetchingAC(false))
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