import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Alert, AlertTitle, Avatar, Box, Button, Divider, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeEmail, changePassword, changeUserName, getUserByEmail, setUserPhoto } from '../../actions/user'
import s from './profile.module.css'
import SaveIcon from '@mui/icons-material/Save';
import { setFoundUserAC } from '../../reducers/userReducer'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const Profile = (props) => {

    if(!props.isAuth) return <Navigate to='/login' />

    const user = useSelector(state => state.user.currentUser)

    const foundedUserEmail = useSelector(state => state.user.foundUser)

    const dispatch = useDispatch()

    const [userName, setUserName] = React.useState(user.login)
    const [lastUserName, setLastUserName] = React.useState(user.login)
    const [isNameCorrect, setIsNameCorrect] = React.useState(true)
    const [isNameChanged, setIsNameChanged] = React.useState(false)

    const [userEmail, setUserEmail] = React.useState(user.email)
    const [lastUserEmail, setLastUserEmail] = React.useState(user.email)
    const [isEmailCorrect, setIsEmailCorrect] = React.useState(true)
    const [isEmailChanged, setIsEmailChanged] = React.useState(false)

    const [userPassword, setUserPassword] = React.useState('')
    const [lastUserPassword, setLastUserPassword] = React.useState('')
    const [isPassword, setIsPassword] = React.useState(true)
    const [isPassCorrect, setIsPassCorrect] = React.useState(true)
    const [isPassChanged, setIsPassChanged] = React.useState(false)

    const [avatar, setAvatar] = React.useState(null)
    const [img, setImg] = React.useState(null)

    const [isAvatarChanged, setIsAvatarChanged] = React.useState(null)


    useEffect(() => {
        setUserEmail(user.email)
        setLastUserEmail(user.email)
        setUserName(user.login)
        setLastUserName(user.login)      
    }, [user])

    const nameSave = () => {
        if (lastUserName != userName) {
            const reg = /^[A-z0-9_-]{3,32}$/
            const mas = userName.match(reg);
            let nameValid = mas != null
            setIsNameCorrect(nameValid)
            ///
            if (nameValid) {
                const res = changeUserName(user.id, userName)
                setIsNameChanged(res)
            }
            else{
                setIsNameCorrect(false)
            }
        }
    }
    const onNameChanged = (event) => {
        setUserName(event.target.value)
        if (!isNameCorrect) setIsNameCorrect(true)
    }
    const handleCloseAlertName = () => {
        setIsNameChanged(false)
    }

    const emailSave = () => {
        if (lastUserEmail != userEmail) {
            const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/
            const mas = userEmail.match(reg);
            const emailValid = mas != null && userEmail.split(".").length - 1 == 1
            setIsEmailCorrect(emailValid)
            if (emailValid) {
                dispatch(changeEmail(user.id, userEmail));
                setLastUserEmail(userEmail)
                if(!foundedUserEmail) {
                    setIsEmailChanged(true)
                }
            }
            else{
                setIsEmailCorrect(false)
            }
        }
        else {
            
        }
    }
    const onEmailChange = (event) => {
        setUserEmail(event.target.value)
        if(foundedUserEmail) dispatch(setFoundUserAC(null))
        if (!isEmailCorrect) setIsEmailCorrect(true)
    }
    const handleCloseAlertEmail = () => {
        setIsEmailChanged(false)
    }


    const passwordSave = () => {
        if (lastUserPassword != userPassword) {
            const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
            const mas = userPassword.match(reg);
            setIsPassCorrect(mas);
            if (mas) {
                const res = changePassword(user.id, userPassword);
                console.log(res)
                setIsPassChanged(res);
                setLastUserPassword(userPassword)
            }
        }
        else {
            setLastUserPassword(userPassword)
        }
    }
    const onPasswordChange = (event) => {
        setUserPassword(event.target.value)
        if (!isPassCorrect) setIsPassCorrect(true)
    }
    const handleCloseAlertPassword = () => {
        setIsPassChanged(false)
    };

    const sendAvatar = async(e) => {
        try {
            if(e.size < 6291456){
                setImg(e)
                const data = new FormData()
                data.append('avatar', e)            
                data.append('userId', user.id)
                let photoRes = await setUserPhoto(data)  ;
                localStorage.setItem('avatar', photoRes)
                console.log(localStorage.getItem('avatar'))       
                setAvatar(photoRes)
                setIsAvatarChanged(true)
            }
            else{
                setIsAvatarChanged(false)
            }
        } 
        catch (e) {}
    }
    const handleCloseAlertAvatar = () => {
        setIsAvatarChanged(null)
    }

    return (
        <div className={s.profile}>
            <div className={s.profile_bg}></div>
            <div className={s.container}>
                <div className={s.profile_inner}>
                    <Typography variant='h4' sx={{ textTransform: 'uppercase', marginBottom: '30px' }}> твой профиль </Typography>
                    <Divider orientation='horizontal' />
                    
                    <div className={s.photo_login}>
                        <label htmlFor='avatar-button'>
                            <Input 
                            accept="image/*" 
                            id='avatar-button' 
                            type="file" 
                            sx={{display: 'none'}}
                            onChange={e => sendAvatar(e.target.files[0])} />
                            <IconButton component='span'>
                                <Avatar src={localStorage.getItem('avatar')} sx={{ width: '200px', height: '200px' }} />
                            </IconButton>
                        </label>
                        <Snackbar open={isAvatarChanged == false} autoHideDuration={3000} onClose={handleCloseAlertAvatar}>
                            <Alert onClose={handleCloseAlertAvatar} severity="error" sx={{ width: '100%' }} >
                                Большой вес картинки
                            </Alert>
                        </Snackbar>

                        {/* <input type='file' onChange={} /> */}
                        <div className={s.textFields}>
                            <div autoComplete="off" className={s.input_with_btn}>
                                <TextField
                                value={userName}
                                size="standart"
                                inputProps={{style: {fontSize: 30}}}
                                variant="standard"
                                onChange={onNameChanged}
                                fullWidth
                                error={!isNameCorrect}
                                helperText={!isNameCorrect ? 'Некорректное имя пользователя' : ''}
                                sx={{ margin: '10px' }} />
                                {
                                    lastUserName != userName
                                    && <IconButton onClick={nameSave}>
                                        <SaveIcon />
                                    </IconButton>
                                }
                            </div>
                            <Snackbar open={isNameChanged} autoHideDuration={3000} onClose={handleCloseAlertName}>
                                <Alert onClose={handleCloseAlertName} severity="success" sx={{ width: '100%' }} >
                                    Имя пользователя успешно изменено!
                                </Alert>
                            </Snackbar>

                            <div className={s.input_with_btn}>
                                <TextField
                                    value={userEmail}
                                    onChange={onEmailChange}
                                    inputProps={{style: {fontSize: 30}}}
                                    autoComplete='off'
                                    variant="standard"
                                    fullWidth
                                    sx={{ margin: '10px' }}
                                    error={foundedUserEmail || !isEmailCorrect}
                                    helperText={!isEmailCorrect ? 'Некорректный Email' 
                                        : (foundedUserEmail ? 'Пользователь с таким Email уже существует' : '')} />
                                {
                                    lastUserEmail != userEmail
                                    && <IconButton onClick={emailSave}>
                                        <SaveIcon />
                                    </IconButton>
                                    
                                }
                            </div>
                            <Snackbar open={foundedUserEmail == false} autoHideDuration={3000} onClose={handleCloseAlertEmail}>
                                <Alert onClose={handleCloseAlertEmail} severity="success" sx={{ width: '100%' }} >
                                    Email успешно изменен!
                                </Alert>
                            </Snackbar>

                            <div className={s.input_with_btn}>
                                <Box autoComplete="off" component="form">
                                    <Input
                                        id='password'
                                        type={isPassword ? 'password' : 'text'}
                                        sx={{ margin: '10px' }}
                                        inputProps={{style: {fontSize: 30}}}
                                        variant="standard"
                                        error={!isPassCorrect}
                                        helperText={!isPassCorrect ? "Неверный Email" : ""}
                                        value={userPassword}
                                        onChange={onPasswordChange}
                                        aria-describedby="helper-password"
                                        placeholder='Введите новый пароль'
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label="password"
                                                    onClick={() => setIsPassword(!isPassword)}
                                                    edge="end">
                                                    {isPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        } />
                                    {
                                        lastUserPassword != userPassword
                                        && <IconButton onClick={passwordSave}>
                                            <SaveIcon />
                                        </IconButton>
                                        
                                    }
                                </Box>
                            </div>
                            <FormHelperText error id="helper-password">
                                {isPassCorrect ? ' ' : 'Некорректный пароль'}
                            </FormHelperText>
                            <Snackbar open={isPassChanged} autoHideDuration={3000} onClose={handleCloseAlertPassword}>
                                <Alert onClose={handleCloseAlertPassword} severity="success" sx={{ width: '100%' }} >
                                    Пароль успешно изменен!
                                </Alert>
                            </Snackbar>



                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;