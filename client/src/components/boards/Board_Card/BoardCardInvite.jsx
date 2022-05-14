import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { acceptInvite, declineInvite } from "../../../actions/boards";
import s from './boardcardInvite.module.css';

const BoardCardInvite = (props) => {

    const dispatch = useDispatch()

    const inviteAccept = () => {
        console.log(props.id)
        dispatch(acceptInvite(props.userId, props.id, props.boardId))
    }
    const inviteDecline = () => {
        dispatch(declineInvite(props.userId, props.id))
    }

    return (
        <div className={s.card}>
            <div style={{ backgroundImage: props.color }} className={s.bg}></div>
            <Typography fontWeight={'bold'} color="black" className={s.name} >{props.name}</Typography>
            <Divider></Divider>
            <Typography>Приглашение от: {props.username}</Typography>
            <div className={s.btns}>
                <IconButton className={s.btn} onClick={inviteAccept}>
                    <ThumbUpIcon sx={{ color: '#000' }}/>
                </IconButton>
                <IconButton className={s.btn} onClick={inviteDecline} >
                    <ThumbDownAltIcon sx={{ color: '#000' }}/>
                </IconButton>
            </div>
            
            
        </div>
    )
}

export default BoardCardInvite;