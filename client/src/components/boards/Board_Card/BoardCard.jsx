import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setFavorite } from "../../../actions/boards";
import s from './boardCard.module.css';

const BoardCard = (props) => {

    const dispatch = useDispatch();

    const onClickFavorite = () => {
        dispatch(setFavorite(props.id, props.userId, props.favorite, props.isFavoritePage))
    }

    return (
        <div className={s.card}>
            <Tooltip title={'Дата создания доски: ' + props.date}>
            <NavLink to={`/b?id=${props.id}`} className={s.nav_bg} />
            </Tooltip>
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
                props.invited == 2
                    ? <Box sx={{ display: 'flex', weight: '100%', position: 'absolute', bottom: '10%' }}>
                        <Tooltip title={'Вас пригласили в эту доску. Всего в доске ' + props.countGroup + ' участника.'}>
                            <PeopleIcon sx={{ zIndex: '99', marginRight: '5px' }} />
                        </Tooltip>
                        <Typography sx={{ zIndex: '99', fontWeight: 'bold' }}>{props.countGroup}</Typography>
                    </Box>

                    : <Box sx={{ display: 'flex', weight: '100%', position: 'absolute', bottom: '10%' }}>
                        <Tooltip title={'Вы создали эту доску. Всего в доске ' + props.countGroup + ' участника.'}>
                            <PersonIcon sx={{ zIndex: '99', marginRight: '5px' }} />
                        </Tooltip>
                        <Typography sx={{ zIndex: '99', fontWeight: 'bold' }}>{props.countGroup}</Typography>
                    </Box>
            }
            
        </div>
    )
}

export default BoardCard;