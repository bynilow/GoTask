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
import Boards_My from './components/boards/Boards_My/Boards_My';
import Boards_Invite from './components/boards/Boards_Invite/Boards_Invite';
import AdminPanel from './components/admin/admin_panel';
import Boards_Select from './components/boards/Boards_Select/Boards_Select';


function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const userId = useSelector(state => state.user.currentUser.id)
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
      white: {
        main: '#fff'
      }
    },
  })

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className='empty_spacer_app'>...</div>
        <Header />
        <Routes>
          <Route path="/reg" element={<Registration isAuth={isAuth} userId={userId} />} />
          <Route path="/login" element={<Login isAuth={isAuth} userId={userId} />} />
          <Route path="/users" element={<Users key="Users" isAuth={isAuth} />} />
          <Route path="/brs" element={<Boards_Select isAuth={isAuth} userId={userId}/>}>
            <Route path="boards" element={<Boards_My isAuth={isAuth} userId={userId}/>} />
            <Route path="invites" element={<Boards_Invite isAuth={isAuth} userId={userId}/>} />
          </Route>
          <Route path="/b" element={<BoardSpace isAuth={isAuth} userId={userId}/>} />
          <Route path="/adminpanel" element={<AdminPanel isAuth={isAuth} />} />
        </Routes>

        <Routes>
          
            
        </Routes>

        <Routes>
          <Route path="/main" element={<Main />} />
        </Routes>

      </ThemeProvider>


    </BrowserRouter>
  );
}

export default App;
