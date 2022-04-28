
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
const SET_DRAG_CARDID = "SET_DRAG_CARDID"

const SET_CARDS_AND_TASKS = "SET_CARDS_AND_TASKS"

const SET_RENAME_TASK = "SET_RENAME_TASK"

const SET_INVITED_USER_STATUS = "SET_INVITED_USER_STATUS"

const SET_GROUP_USERS = "SET_GROUP_USERS"


const defaultState = {
    boards: [],
    createdBoard: {},
    isFetching: false,
    foundBoard: null,
    cards: [],
    createdCard: {},
    tasks: [],
    draggableTask: {},
    cardIdDND: null,
    dragCardId: -1,
    deletedTask: {},
    invitedUserStatus: null,
    cardsAndTasks: [],
    groupUsers: []
}

export default function boardsReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_BOARDS:
            return {
                ...state,
                boards: [],
                boards: action.boards
            }
        case SET_CARDS_AND_TASKS: {
            return {
                ...state,
                cardsAndTasks: action.cards
            }
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
                createdCard: action.card
            }
        case SET_TASKS:
            return {
                ...state,
                tasks: action.tasks
            }
        case SET_DRAGGABLE_TASK:
            return{
                ...state,
                draggableTask: action.task
            }
        case DELETE_TASKS:
            return{
                ...state,
                tasks: action.tasks
            }
        case SET_CARDID_DND:
            return{
                ...state,
                cardIdDND: action.cardId
            }
        case SET_DRAG_CARDID:
            return {
                ...state,
                dragCardId: action.cardId
            }
        case SET_INVITED_USER_STATUS:
            return{
                ...state,
                invitedUserStatus: action.status
            }
        case SET_RENAME_TASK:
            let newCards = [...state.cardsAndTasks.map((card, indCard) => {
                if (indCard == action.cardId) {
                    console.log('ind card == action')
                    card.task.map((task, indTask) => {
                        if (indTask == action.taskId) {
                            task.name = action.newName
                            return card.task
                        }
                        return card.task
                    })
                }
                return card
            })];
            return {
                ...state,
                cardsAndTasks: newCards
            }
        case SET_GROUP_USERS:
            return{
                ...state,
                groupUsers: action.users
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

export const setDraggableTask = (task) => ({
    type: SET_DRAGGABLE_TASK,
    task
})

export const deleteTasksAC = (task) => ({
    type: DELETE_TASKS,
    task
})

export const setCardIdDndAC = (cardId) =>({
    type: SET_CARDID_DND,
    cardId
})

export const setDragCardIdAC = (cardId) => ({
    type: SET_DRAG_CARDID,
    cardId
})

export const setInviteUserStatusAC = (status) => ({
    type: SET_INVITED_USER_STATUS,
    status
})

export const setCardsAndTasksAC = (cards) => ({
    type: SET_CARDS_AND_TASKS,
    cards
})

export const setRenameTaskAC = (newName, cardId, taskId) => ({
    type: SET_RENAME_TASK,
    newName,
    cardId,
    taskId
})

export const setGroupUsersAC = (users) => ({
    type: SET_GROUP_USERS,
    users
})