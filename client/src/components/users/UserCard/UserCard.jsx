import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import s from './usercard.module.css'
import SaveIcon from '@mui/icons-material/Save';

const UserCard = (props) =>{

    const [login, setLogin] = useState({firstLogin: props.login, lastLogin: props.login})
    const [email, setEmail] = useState({firstEmail: props.email, lastEmail: props.email})

    return(
        <div className={s.userCard}>
            <div className={s.login}>
                <Typography>
                    ID: {props.id}
                </Typography>

            </div>
            <div className={s.email}>
                <Typography>
                    Логин: {login.lastLogin}
                </Typography>
            </div>
            <div className={s.id}>
                <Typography>
                    Почта: {email.lastEmail}
                </Typography>
            </div>
            <div className={s.type}>
                {
                    !props.type
                    ? 
                    <Typography>
                        Тип пользователя: Пользователь
                    </Typography>
                    : 
                    <Typography>
                        Тип пользователя: Администратор
                    </Typography>
                }
                
            </div>
            <Button startIcon={<SaveIcon />}>
                Сохранить
            </Button>
        </div>
    )
}

export default UserCard;