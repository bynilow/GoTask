import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";
import { setBoardsAC, setFavoriteInBoardAC, 
    setFoundBoardAC, setGroupUsersAC, setInviteUserStatusAC, toggleIsFetchingAC } from "../reducers/boardsReducer";
import { setCardsAndTasksAC } from "../reducers/cardsReducer";


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

// get board info & cards and tasks info
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

export const getOutputDoc = async(boardId) => {
    try{
        const response = await axios.post("http://localhost:4850/api/board/output_doc", {
            boardId
        })
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
    }
    catch(e){
        console.log(e)
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

export const renameBoard = async (boardId, nameBoard) => {
    const renameBoardRes = await axios.post("http://localhost:4850/api/board/rename", {
        boardId, nameBoard
    })
}

export const setFavorite = (boardId, userId, favoriteId, isFavoritePage = 0) => {
    return async dispatch => {
        try{
            console.log(isFavoritePage)
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
                    userId, tittle: ''
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

