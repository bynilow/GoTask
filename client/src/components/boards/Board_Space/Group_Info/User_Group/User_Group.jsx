import React, { useEffect } from "react";
import s from './usergroup.module.css'
import {Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { Avatar, Button, MenuItem, Select, Typography } from "@mui/material";
import { getUsersInGroup, removeUserFromGroup, setTypeUserInGroup } from "../../../../../actions/boards";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CancelIcon from '@mui/icons-material/Cancel';
import { actionLog } from "../../../../../actions/user";

const User_Group = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])

    const [typeUser, setTypeUser] = React.useState(props.userType);
    const [isRemove, setIsRemove] = React.useState(false);

    const handleChangeTypeUser = (event) => {
        let typeUserText;
        // if(event.target.value)
        switch(event.target.value){
            case 1:
                typeUserText = 'Администратор'
                break;
            case 2:
                typeUserText = 'Участник'
                break;
            case 3:
                typeUserText = 'Наблюдатель'
        }
        actionLog(props.myId, props.boardId, `Поменял роль пользователя "${props.userName}" на "${typeUserText}"`)
        setTypeUser(event.target.value);
        setTypeUserInGroup( props.boardId, props.userId, event.target.value)
        
    };

    const removeUser = () =>{
        actionLog(props.myId, props.boardId, `Выгнал пользователя "${props.userName}"`)
        dispatch(removeUserFromGroup(props.boardId, props.userId))
    }

    const canEdit = props.myId != props.userId && props.myType === 1;
    return(
        <div className={s.user}>
            <div className={s.user_info}>
                <Avatar
                    sx={{ backgroundColor: 'orange', width: '60px', height: '60px', marginRight: '10px' }}
                    alt={props.userName}
                    src={props.photo} />
                <Typography variant="h6">{props.userName}</Typography>
            </div>
            <Select sx={{ mt: '10px' }}
                size='small'
                onChange={handleChangeTypeUser}
                value={typeUser}
                fullWidth
                disabled={!canEdit}>
                <MenuItem value={1}>Администратор</MenuItem>
                <MenuItem value={2}>Участник</MenuItem>
                <MenuItem value={3}>Наблюдатель</MenuItem>
            </Select>
            {
                !isRemove
                    ? <Button
                        variant='contained'
                        sx={{ mt: '10px' }}
                        disabled={!canEdit}
                        onClick={() => setIsRemove(true)}
                        color='error'
                        startIcon={<PersonRemoveIcon />}>
                        Удалить из группы
                    </Button>
                    : <div className={s.sure_btn}>
                        <Button
                            variant='contained'
                            onClick={() => setIsRemove(false)}
                            startIcon={<CancelIcon />}>
                            Отмена
                        </Button>
                        <Button
                            variant='contained'
                            color='error'
                            startIcon={<PersonRemoveIcon />}
                            onClick={removeUser}>
                            Удалить
                        </Button>
                    </div>
            }
            
            
        </div>
    )
}

export default User_Group;