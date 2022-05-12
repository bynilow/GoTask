import { Box, Button, Pagination, TextField, Typography } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect } from 'react';
import {Navigate} from 'react-router-dom';
import s from './adminpanel.module.css';
import { getUsers } from '../../actions/user';
import UserCard from '../users/UserCard/UserCard';
import SearchIcon from '@mui/icons-material/Search';
import { setUsersAC } from '../../reducers/userReducer';
import EditUserPopup from './Edit_User_Popup/EditUserPopup';
import Board_Logs from '../boards/Board_Space/Board_Logs/Board_Logs';

const AdminPanel = (props) => {
    
    if(typeof props.isAdmin !== 'undefined' && !props.isAdmin) return <Navigate to='/login' />

    const dispatch = useDispatch();

    const users = useSelector(state => state.user.users)

    const [page, setPage] = React.useState(1);
    const [userNameText, setUserNameText] = React.useState('');
    const [isEditUser, setIsEditUser] = React.useState(0);

    useEffect(() => {
        dispatch(getUsers(1,userNameText));
    }, [])

    
    const onPaginationChange = (event, value=page) => {
        setPage(value);
        dispatch(getUsers(value,userNameText));
    }

    const toggleIsEditUser = (uId) => {
        setIsEditUser(uId);
    }

    return(
        <div className={s.admin_panel}>
            <div className={s.container}>
                <div className={s.header_search}>
                    <TextField
                        size='small'
                        label='Имя пользователя или Email'
                        sx={{ width: '250px', margin: '0 5px' }}
                        value={userNameText}
                        onChange={event => setUserNameText(event.target.value)} />
                    <Button
                        sx={{ margin: '0 5px' }}
                        variant="contained"
                        onClick={onPaginationChange}
                        startIcon={<SearchIcon />} >
                        Найти
                    </Button>
                    
                </div>
                <div className={s.users}>
                    <Typography sx={{ paddingTop: '1%', alignText: 'center' }}>Пользователи:</Typography>
                    <div className={s.users_list}>
                        {
                            users.users.map((user, ind) =>
                                <UserCard 
                                key={user.id} 
                                login={user.login} 
                                email={user.email} 
                                id={user.id} 
                                photo={user.photo}
                                type={user.user_type - 1}
                                toggleIsEditUser={() => toggleIsEditUser(user.email)} />
                            )
                        }
                    </div>
                    <Box sx={{ position: 'absolute', left: '0', right: '0', display: 'flex', justifyContent:'center' }}>
                        <Pagination
                            page={page}
                            onChange={onPaginationChange}
                            count={Math.ceil(users.count / 9)} />
                    </Box>
                </div>
                {
                    isEditUser
                    ? <Board_Logs
                        email={isEditUser} 
                        isAdminPanel={true}
                        toggleIsEditUser={() => toggleIsEditUser(0)} />
                    : <></>
                }
            </div>
        </div>
    )
}

export default AdminPanel;