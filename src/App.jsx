import React, { useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Registration from './components/registration/Registration'
import Login from './components/login/Login'
import Header from './components/header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './actions/user';
import Main from './components/main/Main';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import Users from './components/users/Users';
import Boards from './components/boards/Boards';
import BoardSpace from './components/boards/Board_Space/BoardSpace';


function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  const theme = createTheme({
    palette: {
      primary: {
        light: '#b085f5',
        main: '#7e57c2',
        dark: '#4d2c91',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffc246',
        main: '#ff9100',
        dark: '#c56200',
        contrastText: '#000',
      },
    },
  })

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className='empty_spacer_app'>...</div>
        <Header />
        <Routes>
          <Route path="/reg" element={<Registration isAuth={isAuth} />} />
          <Route path="/login" element={<Login isAuth={isAuth} />} />
          <Route path="/users" element={<Users key="Users" isAuth={isAuth} />} />
          <Route path="/boards" element={<Boards isAuth={isAuth} />} />
          <Route path="/b" element={<BoardSpace isAuth={isAuth} />} />
        </Routes>

        <Routes>
          <Route path="/main" element={<Main />} />
        </Routes>

      </ThemeProvider>


    </BrowserRouter>
  );
}

export default App;
