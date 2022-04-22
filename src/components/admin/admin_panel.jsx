import { Typography } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect } from 'react';
import {Navigate} from 'react-router-dom';
import s from './adminpanel.module.css';
import { getUsers } from '../../actions/user';
import UserCard from '../users/UserCard/UserCard';


const AdminPanel = (props) => {
    const dispatch = useDispatch();

    const users = useSelector(state => state.user.users)

    useEffect(() => {
        dispatch(getUsers())
    }, [])


    // if(props.isAuth) return <Navigate to={'/login'}/>

    return(
        <div className={s.admin_panel}>
            <div className={s.container}>
                
                <div className={s.users}>
                    <Typography>Пользователи:</Typography>
                    <div className={s.users_list}>
                        {
                            users.map((user, ind) => 
                                <UserCard key={ind} login={user.login} email={user.email} id={user.id} type={user.user_type-1}/>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel;