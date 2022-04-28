import React, { useEffect } from "react";
import s from './groupinfo.module.css'
import {Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { Button, Typography } from "@mui/material";
import User_Group from "./User_Group/User_Group";
import { getUsersInGroup } from "../../../../actions/boards";

const Group_Info = (props) => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.boards.groupUsers)

    useEffect(() => {
        dispatch(getUsersInGroup(props.boardId))
    }, [])

    // if(!props.isAuth) return <Navigate to={'/login'}/>
    let isAdmin;
    if(users.length > 0){
        isAdmin = users.find(user => user.userId == props.myId).roleId
    }


    return(
        <div className={s.group_bg}>
            <div className={s.group_info}>
                <Typography>Пользователи этой доски:</Typography>
                <div className={s.users}>
                    {
                        users.map(user => <User_Group
                            key={user.userId}
                            boardId={props.boardId}
                            userName={user.login}
                            userType={user.roleId}
                            userId={user.userId}
                            myId={props.myId} 
                            myType={isAdmin}/>)
                    }
                </div>
                <Button sx={{marginTop:'15px'}} variant='contained' onClick={() => props.setCloseGroup()}>Выход</Button>
            </div>
        </div>
    )
}

export default Group_Info;