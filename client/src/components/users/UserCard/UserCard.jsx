import React, { useState } from "react";
import s from './usercard.module.css'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
import { setFoundUserAC } from '../../../reducers/userReducer';
import { changeEmail, changePassword, changeUserName, getUserByEmail, setUserPhoto } from '../../../actions/user'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Alert, AlertTitle, Avatar, Box, Button, CircularProgress, Divider, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField, Typography } from '@mui/material'

const UserCard = (props) => {

    const userFound = useSelector(state => state.user.foundUser.found)
    const finderId = useSelector(state => state.user.foundUser.finder)
    const dispatch = useDispatch();

    const [userName, setUserName] = React.useState(props.login)
    const [lastUserName, setLastUserName] = React.useState(props.login)
    const [isNameCorrect, setIsNameCorrect] = React.useState(true)
    const [isNameChanged, setIsNameChanged] = React.useState(false)

    const [userEmail, setUserEmail] = React.useState(props.email)
    const [lastUserEmail, setLastUserEmail] = React.useState(props.email)
    const [isEmailCorrect, setIsEmailCorrect] = React.useState(true)
    const [isEmailChanged, setIsEmailChanged] = React.useState(false)

    const [userPassword, setUserPassword] = React.useState('')
    const [lastUserPassword, setLastUserPassword] = React.useState('')
    const [isPassword, setIsPassword] = React.useState(true)
    const [isPassCorrect, setIsPassCorrect] = React.useState(true)
    const [isPassChanged, setIsPassChanged] = React.useState(false)

    const nameSave = () => {
        if (lastUserName != userName) {
            const reg = /^[A-z0-9_-]{3,32}$/
            const mas = userName.match(reg);
            let nameValid = mas != null
            setIsNameCorrect(nameValid)
            ///
            if (nameValid) {
                const res = changeUserName(props.id, userName)
                setIsNameChanged(res)
                setLastUserName(userName)
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
                dispatch(changeEmail(props.id, userEmail, props.id));
                console.log(userFound, userFound)
                if(userFound == false) {
                    setLastUserEmail(userEmail)
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
        if(userFound) dispatch(setFoundUserAC({found: null}))
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
                const res = changePassword(props.id, userPassword);
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

    return (
        <div className={s.userCard}>
            <div className={s.userCard_inner} >
                <Avatar src={'http://localhost:4850/img/' + props.photo} sx={{width: '70px', height: '70px'}} />
                <div className={s.info}>
                    <Typography>ID: {props.id}</Typography>
                    <div className={s.textFields}>
                        <div autoComplete="off" className={s.input_with_btn}>
                            <TextField
                                value={userName}
                                size="standart"
                                inputProps={{ style: { fontSize: 15 } }}
                                variant="standard"
                                onChange={onNameChanged}
                                fullWidth
                                error={!isNameCorrect}
                                helperText={!isNameCorrect ? 'Некорректное имя пользователя' : ''}
                                sx={{ margin: '5px' }} />
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
                                inputProps={{ style: { fontSize: 15 } }}
                                autoComplete='off'
                                variant="standard"
                                fullWidth
                                sx={{ margin: '5px' }}
                                error={(userFound || !isEmailCorrect) && finderId==props.id}
                                helperText={!isEmailCorrect ? 'Некорректный Email'
                                    : (userFound && finderId==props.id ? 'Пользователь с таким Email уже существует' : '')} />
                            {
                                lastUserEmail != userEmail
                                && <IconButton onClick={emailSave}>
                                    <SaveIcon />
                                </IconButton>

                            }
                        </div>
                        <Snackbar open={isEmailChanged} autoHideDuration={3000} onClose={handleCloseAlertEmail}>
                            <Alert onClose={handleCloseAlertEmail} severity="success" sx={{ width: '100%' }} >
                                Email успешно изменен!
                            </Alert>
                        </Snackbar>

                        <div className={s.input_with_btn}>
                            <Box autoComplete="off" component="form">
                                <Input
                                    id='password'
                                    type={isPassword ? 'password' : 'text'}
                                    sx={{ margin: '5px', maxWidth: '75%'}}
                                    fullWidth
                                    inputProps={{ style: { fontSize: 15 } }}
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


            <Button onClick={() => props.toggleIsEditUser()} >
                Последние действия
            </Button>
        </div>
    )
}

export default UserCard;