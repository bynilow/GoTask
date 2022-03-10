import React, { useEffect } from "react";
import s from './users.module.css'
import {Navigate} from 'react-router-dom'
import UserCard from "./UserCard/UserCard"
import { getUsers } from '../../actions/user'
import { useDispatch, useSelector } from "react-redux"

const Users = (props) => {

    const users = useSelector(state => state.user.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    if(!props.isAuth) return <Navigate to={'/login'}/>

    return(
        <div className={s.users}>
            {users.map((u,ind) => 
                <UserCard key={ind} login={u.login} email={u.email} id={u.id} />
            )}
        </div>
    )
}

export default Users;