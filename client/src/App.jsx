import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { auth } from './actions/user';
import AdminPanel from './components/admin_panel/AdminPanel.jsx';
import BoardsFavorites from './components/boards/Boards_List/Boards_Favorites/BoardsFavorites.jsx';
import BoardsInvite from './components/boards/Boards_List/Boards_Invite/BoardsInvite.jsx';
import BoardsMy from './components/boards/Boards_List/Boards_My/BoardsMy.jsx';
import BoardsSelect from './components/boards/Boards_List/Boards_Select/BoardsSelect.jsx';
import BoardSpace from './components/boards/Board_Space/BoardSpace.jsx';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Main from './components/main/Main';
import Profile from './components/profile/Profile.jsx';
import Registration from './components/registration/Registration';


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
        <Header isAdmin={isAdmin} />
        <Routes>
          <Route path="/reg" element={<Registration isAuth={isAuth} userId={userId} />} />
          <Route path="/" element={<Login isAuth={isAuth} userId={userId} />} />
          <Route path="/login" element={<Login isAdmin={isAdmin} isAuth={isAuth} userId={userId} />} />
          <Route path="/profile" element={<Profile isAuth={isAuth} userId={userId} />} />
          <Route path="/brs" element={<BoardsSelect isAuth={isAuth} userId={userId}/>}>
            <Route path="boards" element={<BoardsMy isAuth={isAuth} userId={userId}/>} />
            <Route path="invites" element={<BoardsInvite isAuth={isAuth} userId={userId}/>} />
            <Route path="favorites" element={<BoardsFavorites isAuth={isAuth} userId={userId}/>} />
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
