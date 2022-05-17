const SET_CARDS_AND_TASKS = "SET_CARDS_AND_TASKS"

const CREATE_CARD = "CREATE_CARD"
const SET_CARDID_DND = "SET_CARDID_DND"
const SET_DRAG_CARDID = "SET_DRAG_CARDID"

const ADD_TASK = "ADD_TASK"
const DELETE_TASKS = "DELETE_TASKS"
const SET_DRAGGABLE_TASK = "SET_DRAGGABLE_TASK"

const defaultState = {
    cardsAndTasks: [],

    createdCard: {},
    cardIdDND: {},
    dragCardId: {},

    tasks: [],
    draggableTask: {},
    deletedTask: {},
}

export default function boardsReducer(state = defaultState, action) {
    switch (action.type) {
        //get all cards in board with tasks
        case SET_CARDS_AND_TASKS: {
            return {
                ...state,
                cardsAndTasks: action.cards
            }
        }
        //cards
        case CREATE_CARD:
            return {
                ...state,
                createdCard: action.card
            }
        case SET_CARDID_DND:
            return {
                ...state,
                cardIdDND: action.cardId + action.cardName
            }
        case SET_DRAG_CARDID:
            return {
                ...state,
                dragCardId: action.card
            }
        //tasks
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
        default:
            return state
    }
}

export const setCardsAndTasksAC = (cards) => ({
    type: SET_CARDS_AND_TASKS,
    cards
})

export const createCardAC = (card) => ({
    type: CREATE_CARD,
    card
})

export const setCardIdDndAC = (cardId) =>({
    type: SET_CARDID_DND,
    cardId
})

export const setDragCardIdAC = (card) => ({
    type: SET_DRAG_CARDID,
    card
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


