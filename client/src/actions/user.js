import React, { useEffect, useState } from "react";
import axios from "axios"
import { Navigate } from "react-router-dom"
import { setFoundUserAC, setSigninTextAC, setUserAC, setUsersAC } from "../reducers/userReducer"
import { setLogsAC } from "../reducers/boardsReducer";


export const getUsers = (pageNum, likeText = '') => {
    return async dispatch => {
        console.log(pageNum)
        const response = await axios.post("http://localhost:4850/api/users", {
            pageNum, likeText
        });
        dispatch(setUsersAC(response.data.values));
        
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
            const loginInfo = await axios.post("http://localhost:4850/api/auth/signin", {
                email,
                password
            })
            console.log(loginInfo)
            if(typeof loginInfo.data.values.message === 'undefined'){
                
                dispatch(setUserAC(loginInfo.data.values.user))
                localStorage.setItem('token', loginInfo.data.values.token)
                localStorage.setItem('avatar', 'http://localhost:4850/img/'+loginInfo.data.user.photo)
            }
            else{
                dispatch(setSigninTextAC(loginInfo.data.values.message))
            }
            
        }
        catch (e) {
        }
    }
}


export let auth = () => {
    return async dispatch => {
        try {
            
            if(localStorage.getItem('token')){
                const response = await axios.get("http://localhost:4850/api/auth/auth",{ 
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}` } 
                })
            localStorage.setItem('token', response.data.token.split(' '))
            localStorage.setItem('avatar', 'http://localhost:4850/img/'+response.data.user.photo)
            dispatch(setUserAC(response.data.user))
            
            }
            else{
                
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

export const setUserPhoto = async (data, userId) => {
    try {
        const setAvatar = await axios.post("http://localhost:4850/api/user/setUserPhoto", data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        return setAvatar.data.values
    }
    catch (e) {
        console.log(e)
    }
}

export const actionLog = async (userId, boardId, message) => {
    try {
        const log = await axios.post("http://localhost:4850/api/log", {
            userId, boardId, message
        })
        
    }
    catch (e) {
        console.log(e)
    }
}

export const getLogs = (boardId) => {
    return async dispatch => {
        try {
            const getLogs = await axios.post("http://localhost:4850/api/logsGet", {
                boardId
            })
            dispatch(setLogsAC(getLogs.data.values))
        }
        catch (e) {
            console.log(e)
        }
    }
}