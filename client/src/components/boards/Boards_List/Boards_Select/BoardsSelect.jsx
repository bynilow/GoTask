import { Button, Divider } from "@mui/material";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import s from './boardsSelect.module.css';


let BoardsSelect = (props) =>{

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

export default BoardsSelect;