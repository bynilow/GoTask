import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import s from './boards.module.css'
import Boards_Inner from "./Boards_Inner/Boards_Inner";

let Boards = (props) =>{

    console.log("auth? - "+props.isAuth)

    // if(!props.isAuth) {
    //     return <Navigate to={'/users'}/>
    // }

    return(
        <div className={s.boards}>
            <div className={s.container}>
                <nav className={s.nav}>
                    <ButtonGroup orientation="vertical">
                        <Button variant="outlined">Все доски</Button>
                        <Button variant="outlined">Мои доски</Button>
                        <Button variant="outlined">Приглашения</Button>
                    </ButtonGroup>
                </nav>
                <Boards_Inner />
            </div>
            
        </div>
    )
}

export default Boards;