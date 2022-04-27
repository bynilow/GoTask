import { Typography } from "@mui/material";
import React from "react";
import s from './boardcard.module.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { NavLink } from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';


const BoardCard = (props) => {
    return (
        <div className={s.card}>
            <NavLink to={`/b?id=${props.id}`} className={s.nav_bg} />
            <div style={{ backgroundImage: props.color }} className={s.bg}></div>
            <Typography component={NavLink} to={`/b?id=${props.id}`} color="black" className={s.name} >{props.name}</Typography>
            <FavoriteBorderIcon className={s.favorite_btn} />
            {
                props.invited==2
                ? <PeopleIcon className={s.invited} />
                : null
            }
            
        </div>
    )
}

export default BoardCard;