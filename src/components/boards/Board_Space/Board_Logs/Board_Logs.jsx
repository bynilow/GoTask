import React, { useEffect } from "react";
import s from './board_logs.module.css'
import {Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { Button, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { getLogs } from "../../../../actions/user";
import Action_Log from "./Action_Log/Action_Log";

const Board_Logs = (props) => {

    const dispatch = useDispatch()
    const logs = useSelector(state => state.boards.logs)

    useEffect(() => {
        dispatch(getLogs(props.boardId))
    }, [])

    const onClickCloseLogs = () => {
        props.closeLogs();
    }

    return(
        <div className={s.logs_bg}>
            <div className={s.logs}>
                <IconButton 
                sx={{position: 'absolute', right: '10px', top: '10px'}}
                onClick={onClickCloseLogs} >
                    <CloseIcon />
                </IconButton>
                <div className={s.logs_list}>
                    {
                        logs.map(log => <Action_Log 
                            key={log.id} 
                            photo={'http://localhost:4850/img/'+log.photo}
                            login={log.login}
                            message={log.message}
                            date={log.date} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Board_Logs;