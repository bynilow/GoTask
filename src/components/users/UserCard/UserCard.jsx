import React from "react";
import s from './usercard.module.css'

const UserCard = (props) =>{
    return(
        <div className={s.userCard}>
            <div className={s.login}>
                {props.login}
            </div>
            <div className={s.email}>
                {props.email}
            </div>
            <div className={s.id}>
                {props.id}
            </div>
        </div>
    )
}

export default UserCard;