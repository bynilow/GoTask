import { Button, Card, Link, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from 'react-router-dom'
import { login } from '../../actions/user'
import MyInput from '../utils/MyInput'
import s from './login.module.css'


const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const signinText = useSelector(state => state.user.signinText)

    
    if(props.isAdmin) return <Navigate to={`/adminpanel`}/>
    if(props.isAuth) return <Navigate to={`/brs/boards?user=${props.userId}`}/>

    return (
        <div className={s.Login}>
            <Card variant="outlined" className={s.Log} sx={{ maxWidth: 400, p: 5 }}>
                <Typography variant="h6"> Авторизация </Typography>
                <Typography color="error">
                    {
                        signinText
                    }
                </Typography>
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