import React, { useState } from 'react'
import s from './Registration.module.css'
import { Typography, TextField, Button, Card, Input, InputAdornment, IconButton, OutlinedInput, FormControl, InputLabel, FormHelperText } from '@mui/material'
import { getUserByEmail, registration } from '../../actions/user'
import MyInput from '../utils/MyInput'
import { Navigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux'
import { setFoundUserAC } from '../../reducers/userReducer'



const Registration = (props) => {

    const dispatch = useDispatch()
    let fu = useSelector(state => state.user.foundUser)

    const [values, setValues] = useState({
        email: '',
        login: '',
        password: '',
        confirm: '',
        showPassword: false,
        erEmail: false,
        erLogin: false,
        erPassword: false,
        erConfirm: false,
        mailFound: false
    });

    if(values.mailFound == false && fu == true) {
        dispatch(setFoundUserAC(false))
        setValues({...values, mailFound: true})
        
        
    }

    console.log("ERROR MAIL: " + values.erEmail)
   


    if (props.isAuth) return <Navigate to={'/users'} />

    let CheckValidEmail = () => {
        const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/
        const mas = values.email.match(reg);
        let emailValid = mas != null && values.email.split(".").length - 1 == 1
        if(emailValid){
            setValues({...values, erEmail: false})
            dispatch(getUserByEmail(values.email))
        }
        return emailValid
    }
    let CheckValidLogin = () => {
        const reg = /^[A-z0-9_-]{3,32}$/
        const mas = values.login.match(reg);
        let loginValid = mas != null
        return loginValid
    }
    let CheckValidPassword = () => {
        const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        const mas = values.password.match(reg);
        const passwordValid = mas != null
        return passwordValid
    }
    let CheckValidPasswordConfirm = () => {
        const confirmValid = values.password == values.confirm
        return confirmValid
    }

    let CheckValid = async() => {
        let emailCV = CheckValidEmail();
        emailCV = CheckValidEmail();
        let loginCV = CheckValidLogin();
        let passwordCV = CheckValidPassword();
        let confirmCV = CheckValidPasswordConfirm();
        if (emailCV && loginCV && passwordCV && confirmCV) {
            registration(values.email, values.login, values.password)
        }
        else {
            setValues({...values, 
                erEmail: !emailCV, 
                erLogin: !loginCV, 
                erPassword: !passwordCV, 
                erConfirm: !confirmCV})
            
            // !emailCV ? setValues({ ...values, erEmail: true }) : setValues({ ...values })
            // !loginCV ? setValues({ ...values, erLogin: true }) : setValues({ ...values })
            // !passwordCV ? setValues({ ...values, erPassword: true }) : setValues({ ...values })
            // !confirmCV ? setValues({ ...values, erConfirm: true }) : setValues({ ...values })
        }

    }

    const handleChange = (prop) => (event) => {
        const myprop = "er" + prop[0].toUpperCase() + prop.slice(1);
        fu = false;
        setValues({ ...values, [myprop]: false, [prop]: event.target.value, mailFound: false });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
        
    };

    return (
        <div className={s.Regis}>
            <Card variant="outlined" className={s.Reg} sx={{ maxWidth: 400, p: 5 }}>
                <Typography variant="h5"> Впервые используете <Typography sx={{fontWeight: 'bold'}} variant="inherit" component="span" color="secondary">APPNAME</Typography>? </Typography>
                <Typography variant="h6"> Регистрация </Typography>
                <form className={s.form}>

                    <TextField sx={{ mt: 2 }}
                        error={values.erEmail || fu}
                        helperText={fu ? "Пользователь с таким Email уже существует" : (values.erEmail ? "Неверный EMEMEMEMEM" : "")}
                        value={values.email}
                        onChange={handleChange('email')}
                        type="email"
                        placeholder=""
                        label="Email" />
                        
                    <TextField sx={{ mt: 2 }}
                        error={values.erLogin}
                        helperText={values.erLogin ? "Неверный логин" : ""}
                        value={values.login}
                        onChange={handleChange('login')}
                        type="text"
                        placeholder=""
                        label="Логин" />

                    <FormControl sx={{ mt: 2 }} 
                    variant="outlined"
                    error={values.erPassword}>
                        <InputLabel htmlFor="password" 
                        color={values.erPassword ? "error" : "primary"}>Пароль</InputLabel>
                        <OutlinedInput
                            id="password"
                            
                            error={values.erPassword}
                            helperText={values.erPassword ? "Неверный Email" : ""}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            aria-describedby="component-error-text"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        <FormHelperText id="component-error-text"> {values.erPassword ? "Неверный пароль" : ""} </FormHelperText>
                    </FormControl>

                    <TextField sx={{ mt: 2 }} 
                    value={values.confirm} 
                    onChange={handleChange('confirm')} 
                    type={values.showPassword ? 'text' : 'password'} 
                    placeholder="" 
                    label="Повторите пароль" 
                    error={values.erConfirm}
                    helperText={values.erConfirm ? "Пароли не совпадают" : ""}/>
                    <Button onClick={() => CheckValidEmail()}>чекни</Button>
                    <Button onClick={() => CheckValid()} variant="contained" sx={{ mt: 3 }}>Регистрация</Button>


                </form>

            </Card>
        </div>

    )
}

export default Registration;