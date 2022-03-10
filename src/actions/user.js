import axios from "axios"
import { Navigate } from "react-router-dom"
import { setFoundUserAC, setUserAC, setUsersAC } from "../reducers/userReducer"


export const getUsers = () => {
    return async dispatch => {
        const response = await axios.get("http://localhost:4850/api/users");
        dispatch(setUsersAC(response.data.values))
        
    }
}

export const getUserByEmail = (email) =>{
    return async dispatch => {
        const response = await axios.post("http://localhost:4850/api/getuser", { email })
        
        dispatch(setFoundUserAC(response.data.values.found))  
    }
          
    
}

export const registration = async (email, login, password) => {
    try {
        const response = await axios.post("http://localhost:4850/api/auth/signup", {
            email,
            login,
            password
        })
        alert(response.data.values.message)
    }
    catch (e) {
        alert(e.response.data.values.message)
    }
}

export const login = (email, password) => {

    return async dispatch => {
        try {

            const response = await axios.post("http://localhost:4850/api/auth/signin", {
                email,
                password
            })
            dispatch(setUserAC(response.data.values.user))
            
            localStorage.setItem('token', response.data.values.token)
            console.log(localStorage.getItem('token'))
            return <Navigate to={"/users"} />

        }
        catch (e) {
            alert(e)
        }

    }

}


export let auth = () => {

    return async dispatch => {
        try {
            
            if(localStorage.getItem('token')){
                const response = await axios.get("http://localhost:4850/api/auth/auth",
                { headers: {Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            dispatch(setUserAC(response.data.user))
            localStorage.setItem('token', response.data.token.split(' '))
            }
            else{
                console.log('НЕТ ТОКЕНА')
            }
            

        }
        catch (e) {
            alert(e)
            localStorage.removeItem('token')
        }

    }

}
