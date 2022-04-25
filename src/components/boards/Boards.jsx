import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import s from './boards.module.css'
import Boards_Inner from "./Boards_My/Boards_My";

let Boards = (props) =>{

    console.log("auth? - "+props.isAuth)

    // if(!props.isAuth) {
    //     return <Navigate to={'/users'}/>
    // }

    return(
        <div className={s.boards}>
            <div className={s.container}>
                <Boards_Inner />
            </div>
            
        </div>
    )
}

export default Boards;