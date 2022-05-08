import { IconButton, Typography } from "@mui/material";
import React from "react";
import s from './boardcard.module.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { NavLink } from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
import { useDispatch } from "react-redux";
import { getBoardsFavorite, setFavorite } from "../../../actions/boards";


const BoardCard = (props) => {

    const dispatch = useDispatch();

    const onClickFavorite = () => {
        dispatch(setFavorite(props.id, props.userId, props.favorite, props.isFavoritePage))
    }

    return (
        <div className={s.card}>
            <NavLink to={`/b?id=${props.id}`} className={s.nav_bg} />
            <div style={{ backgroundImage: props.color }} className={s.bg}></div>
            <Typography component={NavLink} to={`/b?id=${props.id}`} color="black" className={s.name} >{props.name}</Typography>
            <IconButton 
            onClick={onClickFavorite}
            sx={{transition: '0.3s ease', color:'#fff'}} 
            className={props.favorite == 2 ? s.favoriteBtn : s.unFavoriteBtn} >
                {
                    props.favorite == 2
                        ? <FavoriteIcon />
                        : <FavoriteBorderIcon />
                }
            </IconButton>
            
            {
                props.invited==2
                ? <PeopleIcon className={s.invited} />
                : null
            }
            
        </div>
    )
}

export default BoardCard;