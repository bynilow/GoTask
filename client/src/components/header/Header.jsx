import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Avatar, Button, Divider, IconButton, ListItemAvatar, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import { logoutAC } from '../../reducers/userReducer';
import s from './header.module.css';

const Header = (props) => {
    const isAuth = useSelector(state => state.user.isAuth)
    const isAdmin = props.isAdmin;
    const userName = useSelector(state => state.user.currentUser.login)
    const userId = useSelector(state => state.user.currentUser.id)
    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(logoutAC());
        return <Navigate to='/login' />
    }

    const [anchorProfile, setAnchorProfile] = React.useState(null);
    const openMenuProfile = Boolean(anchorProfile);
    const handleClickProfile = (event) => {
        setAnchorProfile(event.currentTarget);
    };
    const handleCloseProfile = () => {
        setAnchorProfile(null);
    };

    const boardLink = `/brs/boards?user=${userId}`
    const inviteLink = `/brs/invites?user=${userId}`
    const favoriteLink = `/brs/favorites?user=${userId}`

    return (
        <div className={s.header_active}>
            <div className={s.container} >
                <div className={s.logo_div}>
                    <div className={s.d1}></div>
                    <div className={s.d2}></div>
                    <Typography
                        component={NavLink}
                        to={props.isAuth ? boardLink : '/login'}
                        color={"#fff"}
                        className={s.logo}
                        sx={{ fontWeight: 'bold', fontSize: '25px', textShadow: '0 0 3px rgba(0,0,0,.5)' }}>
                        <Typography color="secondary" component={'span'} sx={{ fontWeight: 'bold', fontSize: '20px', textShadow: '0 0 1px rgba(0,0,0,.5)' }} >GO</Typography>TASK
                    </Typography>
                </div>

                <div className={s.header_btns}>
                    {!isAuth &&
                        <div className={s.btns_auth}>
                            <Button 
                            color='inherit' 
                            variant="outlined" 
                            component={NavLink} to="/login">
                                Вход
                            </Button>
                            <Button 
                            color='secondary'
                            variant="contained" 
                            component={NavLink} to="/reg">
                                Регистрация
                            </Button>
                        </div>
                    }

                    {isAuth &&
                        <IconButton
                            onClick={handleClickProfile}
                            sx={{position:'absolute', right: '0', top: '0', bottom: '0', display: 'flex'}}
                            aria-controls={openMenuProfile ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openMenuProfile ? 'true' : undefined}>
                            <Avatar
                                src={localStorage.getItem('avatar')}
                                alt={userName}
                                sx={{ backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)' }} />
                        </IconButton>

                    }
                    <Menu anchorEl={anchorProfile}
                    id='account-menu'
                    open={openMenuProfile}
                    onClose={handleCloseProfile}
                    onClick={handleCloseProfile}
                    sx={{zIndex: '99999'}}>
                        <MenuItem component={NavLink} to="/profile">
                            <ListItemAvatar>
                                <Avatar src={localStorage.getItem('avatar')} sx={{ width: 32, height: 32 }} />
                            </ListItemAvatar>
                            Профиль
                        </MenuItem>
                        <Divider />
                        {
                            !isAdmin
                                ? <div>
                                    <MenuItem component={NavLink} to={boardLink}>
                                        <ListItemIcon>
                                            <DashboardIcon />
                                        </ListItemIcon>
                                        Все доски
                                    </MenuItem>
                                    <MenuItem component={NavLink} to={favoriteLink}>
                                        <ListItemIcon>
                                            <FavoriteIcon />
                                        </ListItemIcon>
                                        Избранное
                                    </MenuItem>
                                    <MenuItem component={NavLink} to={inviteLink}>
                                        <ListItemIcon>
                                            <EmailIcon />
                                        </ListItemIcon>
                                        Приглашения
                                    </MenuItem>
                                    <Divider />
                                </div>

                                : <></>
                        }
                        
                        <MenuItem onClick={logOut}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            Выход
                        </MenuItem>
                    </Menu>
                </div>

            </div>
        </div >
    )
}

export default Header