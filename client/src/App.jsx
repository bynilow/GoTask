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
import AdminPanel from './components/admin/AdminPanel';
import Boards_Select from './components/boards/Boards_Select/Boards_Select';
import Profile from './components/profile/Profile';
import Boards_Favorites from './components/boards/Boards_Favorites/Boards_Favorites';
import Boards_Public from './components/boards/Boards_Public/Boards_Public';


function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const isAdmin = useSelector(state => state.user.currentUser.isAdmin)
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
        <Header />
        <Routes>
          <Route path="/reg" element={<Registration isAuth={isAuth} userId={userId} />} />
          <Route path="/" element={<Login isAuth={isAuth} userId={userId} />} />
          <Route path="/login" element={<Login isAdmin={isAdmin} isAuth={isAuth} userId={userId} />} />
          <Route path="/profile" element={<Profile isAuth={isAuth} userId={userId} />} />
          <Route path="/brs" element={<Boards_Select isAuth={isAuth} userId={userId}/>}>
            <Route path="boards" element={<Boards_My isAuth={isAuth} userId={userId}/>} />
            <Route path="invites" element={<Boards_Invite isAuth={isAuth} userId={userId}/>} />
            <Route path="favorites" element={<Boards_Favorites isAuth={isAuth} userId={userId}/>} />
            <Route path="public" element={<Boards_Public isAuth={isAuth} userId={userId}/>} />
          </Route>
          <Route path="/b" element={<BoardSpace isAuth={isAuth} userId={userId}/>} />
          <Route path="/adminpanel" element={<AdminPanel isAdmin={isAdmin} userId={userId} isAuth={isAuth} />} />
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
