const SET_BOARDS = "SET_BOARDS"
const SET_CREATED_BOARD = "SET_CREATED_BOARD"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const SET_FOUND_BOARD = "SET_FOUND_BOARD"
const SET_INVITED_USER_STATUS = "SET_INVITED_USER_STATUS"
const SET_GROUP_USERS = "SET_GROUP_USERS"
const SET_FAVORITE_IN_BOARD = "SET_FAVORITE_IN_BOARD"
const SET_LOGS = "SET_LOGS"


const defaultState = {
    boards: [],
    createdBoard: {},
    isFetching: false,
    foundBoard: null,
    invitedUserStatus: null,
    groupUsers: [],
    logs: [],
}

export default function boardsReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_BOARDS:
            return {
                ...state,
                boards: [],
                boards: action.boards
            }
        case SET_CREATED_BOARD:
            return {
                ...state,
                createdBoard: action.board
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_FOUND_BOARD:
            return{
                ...state,
                foundBoard: action.board
            }
        case SET_INVITED_USER_STATUS:
            return{
                ...state,
                invitedUserStatus: action.status
            }
        case SET_GROUP_USERS:
            return{
                ...state,
                groupUsers: action.users
            }
        case SET_FAVORITE_IN_BOARD:
            let foundBoard = {...state.foundBoard};
            foundBoard.favoriteId = action.favorite
            return{
                ...state,
                foundBoard
            }
        case SET_LOGS: 
            return{
                ...state,
                logs: action.logs
            }
        default:
            return state
    }
}

export const setBoardsAC = (boards) => ({
    type: SET_BOARDS,
    boards
})

export const setCreatedBoardAC = (board) => ({
    type: SET_CREATED_BOARD,
    board
})

export const toggleIsFetchingAC = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

export const setFoundBoardAC = (board) => ({
    type: SET_FOUND_BOARD,
    board
})

export const setInviteUserStatusAC = (status) => ({
    type: SET_INVITED_USER_STATUS,
    status
})

export const setGroupUsersAC = (users) => ({
    type: SET_GROUP_USERS,
    users
})

export const setFavoriteInBoardAC = (favorite) => ({
    type: SET_FAVORITE_IN_BOARD,
    favorite
})

export const setLogsAC = (logs) => ({
    type: SET_LOGS,
    logs
})