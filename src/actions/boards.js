import axios from "axios"
import { setBoardsAC, setCreatedBoardAC, toggleIsFetchingAC, setFoundBoardAC, setCardsAC, createCardAC, setTasksAC } from "../reducers/boardsReducer";


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

export const getAllTasks = (cardsId) => {
    return async dispatch => {
        try {
            console.log('here')
            const response = await axios.post("http://localhost:4850/api/card/cards", {
                cardsId
            });
            console.log(response.data.values)
            if(response.data.values == null){
                dispatch(setTasksAC([{none: -1}]))
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