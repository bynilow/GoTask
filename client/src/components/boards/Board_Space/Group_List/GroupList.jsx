import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersInGroup } from "../../../../actions/boards";
import s from './groupList.module.css';
import User_Group from "./Group_Users_Card/UserGroupCard";

const GroupList = (props) => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.boards.groupUsers)

    useEffect(() => {
        dispatch(getUsersInGroup(props.boardId))
    }, [])

    let isAdmin;
    if(users.length > 0 && props.myId){
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
                            photo={'http://localhost:4850/img/'+user.photo}
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

export default GroupList;