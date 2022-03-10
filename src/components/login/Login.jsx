import React, { useState } from 'react'
import s from './login.module.css'
import { Typography, Button, Card, Link } from '@mui/material'
import MyInput from '../utils/MyInput'
import { useDispatch } from "react-redux"
import { login } from '../../actions/user'
import { Navigate } from 'react-router-dom'


const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    
    if(props.isAuth) return <Navigate to={'/users'}/>

    return (
        <div className={s.Login}>
            <Card variant="outlined" className={s.Log} sx={{ maxWidth: 400, p: 5 }}>
                <Typography variant="h6"> Авторизация </Typography>
                <form className={s.form}>
                    <MyInput value={email} setValue={setEmail} type="text" placeholder="" label="Email" />
                    <MyInput value={password} setValue={setPassword} type="password" placeholder="" label="Пароль" />
                    <Button onClick={() => dispatch(login(email, password))} variant="contained" sx={{ mt: 3 }}>Вход</Button>
                    <Link>Забыл пароль?</Link>
                </form>

            </Card>
        </div>

    )
}

export default Login;