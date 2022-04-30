import React, { useState } from 'react'
import s from './header.module.css'
import { Navigate, NavLink } from 'react-router-dom'
import { AppBar, Typography, Container, Box, Button, Toolbar, Link, Divider, Avatar, IconButton, Menu, MenuItem, ListItemAvatar, ListItemIcon } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { logoutAC } from '../../reducers/userReducer';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmailIcon from '@mui/icons-material/Email';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const userName = useSelector(state => state.user.currentUser.login)
    const userId = useSelector(state => state.user.currentUser.id)
    const dispatch = useDispatch()
    const [header, setHeader] = useState(false)

    // if (window.location.pathname !== '/main' && !header) {
    //     setHeader(true)
    // }

    const changeBackground = () => {

        if (window.scrollY > 30) {
            setHeader(true)
        }
        else {
            if (window.location.pathname === '/main') {
                setHeader(false)
            }
        }
    }

    const logOut = () => {
        dispatch(logoutAC())
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
    console.log('avatar: '+localStorage.getItem('avatar'))
    window.addEventListener('scroll', changeBackground)

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
                        to={boardLink}
                        onClick={() => setHeader(false)}
                        color={"#fff"}
                        className={s.logo}
                        sx={{ fontWeight: 'bold', fontSize: '25px', textShadow: '0 0 3px rgba(0,0,0,.5)' }}>
                        <Typography color="secondary" component={'span'} sx={{ fontWeight: 'bold', fontSize: '20px', textShadow: '0 0 1px rgba(0,0,0,.5)' }} >GO</Typography>TASK
                    </Typography>
                    
                </div>

                <div style={!isAuth ? {width: '20%'} : {}} className={s.header_btns}>
                    {!isAuth &&
                        <div className={s.btns_auth}>
                            <Button color='inherit' variant="outlined" onClick={() => setHeader(true)} component={NavLink} to="/login">
                                Вход
                            </Button>
                            <Button color={header ? 'primary' : 'secondary'} variant="contained" onClick={() => setHeader(true)} component={NavLink} to="/reg">
                                Регистрация
                            </Button>
                        </div>
                            
                    }

                    {isAuth &&
                        <IconButton onClick={handleClickProfile}
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