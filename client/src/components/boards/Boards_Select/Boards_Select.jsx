import { Button, ButtonGroup, Divider } from "@mui/material";
import React from "react";
import { BrowserRouter, Outlet, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Boards_Invite from "../Boards_Invite/Boards_Invite";
import Boards_My from "../Boards_My/Boards_My";
import s from './boardsSelect.module.css'

let Boards_Select = (props) =>{

    // if(!props.isAuth) {
    //     return <Navigate to={'/users'}/>
    // }

    const boardLink = `/brs/boards?user=${props.userId}`
    const inviteLink = `/brs/invites?user=${props.userId}`
    const favoriteLink = `/brs/favorites?user=${props.userId}`
    const publicLink = `/brs/public`

    return(
        
        <div className={s.boards}>
            <div className={s.container}>
                <div className={s.nav}>
                    <Button component={NavLink} to={boardLink}>
                        Доски
                    </Button>
                    <Button component={NavLink} to={favoriteLink}>
                        Избранное
                    </Button>
                    <Button component={NavLink} to={inviteLink}>
                        Приглашения
                    </Button>
                    <Button component={NavLink} to={publicLink}>
                        Публичные
                    </Button>
                </div>
                <Divider className={s.divid} />
                <div className={s.boards_out}>
                    <Outlet />
                </div>
                
            </div>
            
        </div>
    )
}

export default Boards_Select;