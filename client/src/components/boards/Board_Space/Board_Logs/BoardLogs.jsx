import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogs, getLogsAdminPanel } from "../../../../actions/user";
import s from './boardLogs.module.css';
import BoardLogCard from "./Log_Card/BoardLogCard.jsx";

const BoardLogs = (props) => {

    const dispatch = useDispatch()
    const logs = useSelector(state => state.boards.logs)

    useEffect(() => {
        props.isAdminPanel
            ? dispatch(getLogsAdminPanel(props.email))
            : dispatch(getLogs(props.boardId))

    }, [])

    const onClickCloseLogs = () => {
        props.isAdminPanel
            ? props.toggleIsEditUser()
            : props.closeLogs();
    }
    console.log(logs)
    if(!logs) return <></>
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
                        logs.map(log => <BoardLogCard 
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

export default BoardLogs;