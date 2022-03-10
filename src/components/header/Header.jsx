import React, { useState } from 'react'
import s from './header.module.css'
import { NavLink } from 'react-router-dom'
import { AppBar, Typography, Container, Box, Button, Toolbar, Link, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { logoutAC } from '../../reducers/userReducer';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Header = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const [header, setHeader] = useState(false)

    if(window.location.pathname !== '/main' && !header){
        setHeader(true)
    }

    const changeBackground = () =>{
        
        if(window.scrollY > 30){
            setHeader(true)
        }
        else{
            if(window.location.pathname === '/main'){
                setHeader(false)
            }
        }
    }

    const logoClick = () =>{
        if (isAuth){

        }
        else{

        }
    }
    
    
    window.addEventListener('scroll', changeBackground)    
    
    return (
        <div className={header ? s.header_active : s.header}>
            <Container >
                <Toolbar className={s.toolbar}>
                    {isAuth
                        ? <Typography
                            variant="h6"
                            
                            component={NavLink}
                            to="/boards"
                            onClick={() => setHeader(false)}
                            color={header ? 'inherit' : 'white'}
                            className={s.logo}
                            sx={{ display: { xs: 'none', md: 'flex' } }} >
                            LOGO
                        </Typography>
                        : <Typography
                            variant="h6"
                            noWrap
                            component={NavLink}
                            to="/main"
                            onClick={() => setHeader(false)}
                            color={header ? 'inherit' : 'white'}
                            className={s.logo}
                            sx={{ display: { xs: 'none', md: 'flex' } }} >
                            LOGO
                        </Typography>

                    }

                    
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
                            
                            <Button variant="text" endIcon={<KeyboardArrowDownIcon />}>Доски</Button>
                            <Button variant="text" endIcon={<KeyboardArrowDownIcon />}>Избранное</Button>
                            <Divider orientation='vertical' variant='middle' flexItem />
                            <Button className={s.btn_exit} color="inherit" variant="outlined" onClick={() => dispatch(logoutAC())}>
                                Выход
                            </Button>
                        </div>
                    }
                </Toolbar>
            </Container>
        </div >
    )
}

export default Header