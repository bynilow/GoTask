
import React, { useEffect } from 'react';
import s from './editUser.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Alert, AlertTitle, Avatar, Box, Button, CircularProgress, Divider, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField, Typography } from '@mui/material'
import { changeEmail, changePassword, changeUserName, getUserByEmail, setUserPhoto } from '../../../actions/user'
import SaveIcon from '@mui/icons-material/Save';
import { setFoundUserAC } from '../../../reducers/userReducer';


const EditUserPopup = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.foundUser)

    const [userName, setUserName] = React.useState(null)
    const [lastUserName, setLastUserName] = React.useState(null)
    const [isNameCorrect, setIsNameCorrect] = React.useState(true)
    const [isNameChanged, setIsNameChanged] = React.useState(false)

    const [userEmail, setUserEmail] = React.useState(null)
    const [lastUserEmail, setLastUserEmail] = React.useState(null)
    const [isEmailCorrect, setIsEmailCorrect] = React.useState(true)
    const [isEmailChanged, setIsEmailChanged] = React.useState(false)

    const [userPassword, setUserPassword] = React.useState('')
    const [lastUserPassword, setLastUserPassword] = React.useState('')
    const [isPassword, setIsPassword] = React.useState(true)
    const [isPassCorrect, setIsPassCorrect] = React.useState(true)
    const [isPassChanged, setIsPassChanged] = React.useState(false)

    useEffect(() => {
        if(!userName) dispatch(getUserByEmail(props.email));
        if(user && !userName){
            setUserEmail(user.email)
            setLastUserEmail(user.email)
            setUserName(user.login)
            setLastUserName(user.login)  
        }
        
    }, [user])

   console.log(user)

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
                dispatch(changeEmail(user.id, userEmail));
                if(user.found == false) {
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
        if(user.found) dispatch(setFoundUserAC(null))
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


    if (!user) {
        return <CircularProgress />
    }
    return (
        <div className={s.edit_bg}>
            <div className={s.edit_user}>
                <IconButton
                    onClick={() => props.toggleIsEditUser(0)}
                    sx={{ position: 'absolute', top: '10px', right: '10px', }}>
                    <CloseIcon />
                </IconButton>
                <div className={s.user_info}>
                    <div className={s.info}>
                        <Avatar src={'http://localhost:4850/img/' + user.photo} sx={{ width: '70px', height: '70px' }} />
                        <div className={s.info_inner}>
                            <Typography>ID: {user.id}</Typography>


                            <div className={s.textFields}>
                                <div autoComplete="off" className={s.input_with_btn}>
                                    <TextField
                                        value={userName}
                                        size="standart"
                                        inputProps={{ style: { fontSize: 20 } }}
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
                                        inputProps={{ style: { fontSize: 20 } }}
                                        autoComplete='off'
                                        variant="standard"
                                        fullWidth
                                        sx={{ margin: '10px' }}
                                        error={user.found || !isEmailCorrect}
                                        helperText={!isEmailCorrect ? 'Некорректный Email'
                                            : (user.found ? 'Пользователь с таким Email уже существует' : '')} />
                                    {
                                        lastUserEmail != userEmail
                                        && <IconButton onClick={emailSave}>
                                            <SaveIcon />
                                        </IconButton>

                                    }
                                </div>
                                <Snackbar open={user.found == false} autoHideDuration={3000} onClose={handleCloseAlertEmail}>
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
                                            inputProps={{ style: { fontSize: 20 } }}
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
                        <div className={s.logs}>
                            <Typography>Последние действия пользователя:</Typography>
                            <div className={s.logs_list}>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditUserPopup;