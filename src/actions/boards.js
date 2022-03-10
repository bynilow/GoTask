import axios from "axios"
import { setBoardsAC, setCreatedBoardAC, toggleIsFetchingAC, setFoundBoardAC, setCardsAC, createCardAC, setTasksAC } from "../reducers/boardsReducer";


export const getBoards = (userId) => {
    return async dispatch => {
        const response = await axios.post("http://localhost:4850/api/boards/boards", {
            userId
        });

        dispatch(setBoardsAC(response.data.values))
        dispatch(toggleIsFetchingAC(false))

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
    return async dispatch => {
        const response = await axios.post("http://localhost:4850/api/boards/cards", {
            boardId
        });
        dispatch(setCardsAC(response.data.values))
    }
}

export const createBoard = (userId, name, color, visibility) => {
    return async dispatch => {
        try {

            const response = await axios.post("http://localhost:4850/api/boards/create", {
                userId: userId,
                name: name,
                color: color,
                visibility: visibility
            });
            const board = response.data.values;
            dispatch(setCreatedBoardAC(board))
            dispatch(setBoardsAC(response.data.values))
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
            console.log(response.data.values)
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

export const getAllTasks = (cardId) => {
    return async dispatch => {
        try {
            const response = await axios.post("http://localhost:4850/api/card/cards", {
                cardId
            });
            dispatch(setTasksAC(response.data.values))
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const addTask = (nameTask, cardId, creatorId) => {
    return async dispatch => {
        const response = await axios.post("http://localhost:4850/api/task/create", {
            nameTask, cardId, creatorId
        });
        const response2 = await axios.post("http://localhost:4850/api/card/cards", {
                cardId
        });
        dispatch(setTasksAC(response2.data.values))
    }
}

