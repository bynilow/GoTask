import React, { useState } from 'react'
import s from './header.module.css'
import { NavLink } from 'react-router-dom'
import { AppBar, Typography, Container, Box, Button, Toolbar, Link, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { logoutAC } from '../../reducers/userReducer';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Header = () => {
    const isAuth = useSelector(state => state.user.isAuth)
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

    const logoClick = () => {
        if (isAuth) {

        }
        else {

        }
    }

    const boardLink = `/brs/boards?user=${userId}`
    window.addEventListener('scroll', changeBackground)
    // header ? s.header_active : s.header
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

                <div className={s.header_btns}>
                    {!isAuth &&
                        <Box mr={3} color={header ? 'inherit' : 'white'}>
                            <Button color='inherit' variant="outlined" onClick={() => setHeader(true)} component={NavLink} to="/login">
                                Вход
                            </Button>
                        </Box>
                    }
                    {!isAuth &&
                        <Button color={header ? 'primary' : 'secondary'} variant="contained" onClick={() => setHeader(true)} component={NavLink} to="/reg">
                            Регистрация
                        </Button>
                    }
                    {isAuth &&
                        <div className={s.auth_btns}>

                            <Button className={s.btn_board} variant="text" disabled endIcon={<KeyboardArrowDownIcon />}>Доски</Button>
                            <Button className={s.btn_board} variant="text" disabled endIcon={<KeyboardArrowDownIcon />}>Избранное</Button>
                            <Divider orientation='vertical' variant='middle' flexItem />
                            <Button 
                            className={s.btn_exit} 
                            color="inherit" 
                            variant="outlined" 
                            component={NavLink}
                            to="/login"
                            onClick={() => dispatch(logoutAC())}>
                                Выход
                            </Button>
                        </div>
                    }
                </div>

            </div>
        </div >
    )
}

export default Header