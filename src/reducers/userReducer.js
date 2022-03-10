const SET_USER = "SET-USER"
const LOGOUT = "LOGOUT"
const SET_USERS = "SET_USERS"
const SET_FOUND_USER = "SET_FOUND_USER"
const GET_FOUND_USER = "GET_FOUND_USER"


const defaultState = {
    currentUser: {},
    isAuth: false,
    users: [],
    foundUser: false
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.currentUser,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_FOUND_USER:
            return {
                ...state,
                foundUser: action.foundUser
            }
        default:
            return state
    }
}


export const setUserAC = currentUser => ({
    type: SET_USER,
    currentUser
})

export const logoutAC = () => ({
    type: LOGOUT
})

export const setUsersAC = (users) => ({
    type: SET_USERS, 
    users
})

export const setFoundUserAC = (foundUser) => ({
    type: SET_FOUND_USER,
    foundUser
})

