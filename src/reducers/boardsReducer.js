
const SET_BOARDS = "SET_BOARDS"
const SET_CREATED_BOARD = "SET_CREATED_BOARD"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const SET_FOUND_BOARD = "SET_FOUND_BOARD"
const SET_CARDS = "SET_CARDS"
const CREATE_CARD = "CREATE_CARD"
const SET_TASKS = "SET_TASKS"
const ADD_TASK = "ADD_TASK"
const DELETE_TASKS = "DELETE_TASKS"

const SET_DRAGGABLE_TASK = "SET_DRAGGABLE_TASK"
const SET_CARDID_DND = "SET_CARDID_DND"


const defaultState = {
    boards: [],
    createdBoard: {},
    isFetching: false,
    foundBoard: {},
    cards: [],
    createdCard: {},
    tasks: [],
    draggableTask: null,
    cardIdDND: null
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
        case SET_CARDS:
            return{
                ...state,
                cards: action.cards
            }
        case CREATE_CARD:
            return {
                ...state,
                createdCard: action.card,
                cards: [...state.cards, ...action.card]
            }
        case SET_TASKS:
            return {
                ...state,
                tasks: action.tasks
            }
        case SET_DRAGGABLE_TASK:
            return{
                ...state,
                draggableTask: action.taskId
            }
        case DELETE_TASKS:
            return{
                ...state,
                tasks: state.tasks.map(el => {
                    el.map(el2 => {
                        if (el2.id == action.task) {
                            
                        }
                    })
                })
            }
        case SET_CARDID_DND:
            return{
                ...state,
                cardIdDND: action.cardId
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

export const setCardsAC = (cards) => ({
    type: SET_CARDS,
    cards
})

export const createCardAC = (card) => ({
    type: CREATE_CARD,
    card
})

export const setTasksAC = (tasks) => ({
    type: SET_TASKS,
    tasks
})

export const addTask = (task) => ({
    type: ADD_TASK,
    task
})

export const setDraggableTask = (taskId) => ({
    type: SET_DRAGGABLE_TASK,
    taskId
})

export const deleteTasks = (task) => ({
    type: DELETE_TASKS,
    task
})

export const setCardIdDndAC = (cardId) =>({
    type: SET_CARDID_DND,
    cardId
})