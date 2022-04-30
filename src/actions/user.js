import React, { useEffect, useState } from "react";
import axios from "axios"
import { Navigate } from "react-router-dom"
import { setFoundUserAC, setSigninTextAC, setUserAC, setUsersAC } from "../reducers/userReducer"


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

export const registration = (email, login, password) => {
    return async dispatch => {
        try {
            const response = await axios.post("http://localhost:4850/api/auth/signup", {
                email,
                login,
                password
            })
            console.log(response.data.status === 200)
            if(response.data.status === 200){
                const response = await axios.post("http://localhost:4850/api/auth/signin", {
                    email,
                    password
                })
                dispatch(setUserAC(response.data.values.user))
                
                localStorage.setItem('token', response.data.values.token)
                console.log(localStorage.getItem('token'))
                return <Navigate to={'/boards'} />
            }
            
        }
        catch (e) {
            alert(e.response.data.values.message)
        } 
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
            return <Navigate to={'/boards'} />
        }
        catch (e) {
            dispatch(setSigninTextAC(e.response.data.values.message))
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

export const changePassword = async (userId, password) => {
    try {
        const changePassRes = await axios.post("http://localhost:4850/api/user/changePassword", {
            userId,
            password
        })
        return changePassRes.data.values
    }
    catch (e) {
        console.log(e)
    }
}

export const changeEmail = (userId, email) => {
    return async dispatch => {
        try {
            const foundUserEmail = await axios.post("http://localhost:4850/api/getuser", { 
                email 
            })
            const founded = foundUserEmail.data.values.found;
            console.log('founded: '+founded)
            if(founded){
                dispatch(setFoundUserAC(founded)) 
                return false
            }
            else{
                const changeEmailRes = await axios.post("http://localhost:4850/api/user/changeEmail", {
                    userId,
                    email
                })
                dispatch(setFoundUserAC(false))
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const changeUserName = async (userId, userName) => {
    try {
        const changeNameRes = await axios.post("http://localhost:4850/api/user/changeUserName", {
            userId,
            userName
        })
        return changeNameRes.data.values
    }
    catch (e) {
        console.log(e)
    }
}