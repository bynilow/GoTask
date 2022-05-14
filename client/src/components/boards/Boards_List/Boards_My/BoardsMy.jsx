import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Hidden, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { getBoards } from "../../../../actions/boards";
import { toggleIsFetchingAC } from "../../../../reducers/boardsReducer";
import Preloader from "../../../common/Preloader";
import BoardCard from "../../Board_Card/BoardCard.jsx";
import s from './boardsMy.module.css';
import Create_Board_Popup from "./Create_Board_Popup/CreateBoardPopup";



let BoardsMy = (props) => {


    if (!props.isAuth) return <Navigate to='/login' />

    const [selectBoards, setSelectBoards] = React.useState(1);
    const [nameBoardText, setNameBoardText] = React.useState('');

    const userId = useSelector(state => state.user.currentUser.id)
    const boards = useSelector(state => state.boards.boards)
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams();
    const postQuery = searchParams.get('user');
    const isAuth = useSelector(state => state.user.isAuth)

    let thisUser;

    thisUser = postQuery == userId;

    useEffect(() => {
        dispatch(toggleIsFetchingAC(true))
        dispatch(getBoards(postQuery))
    }, [])

    const isFetching = useSelector(state => state.boards.isFetching)

    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const onClosePopup = () => {
        setIsPopupOpen(false)
    }
    const onClickCreate = () => {
        setIsPopupOpen(true)

    }

    console.log(boards)
    if (!thisUser) {
        return (
            <div>
                <Typography variant="h2" sx={{ pt: 25 }}>Нет доступа к доскам</Typography>
            </div>
        )
    }
    return (
        <div className={s.boards_inner} >
            {isFetching
                ? <Preloader />
                : <div className={s.boards_upper}>
                    <div className={s.header_select}>
                        <div className={s.header_search}>
                            <TextField 
                            size='small' 
                            label='Название доски' 
                            sx={{ width: '250px', margin: '0 5px' }}
                            value={nameBoardText}
                            onChange={event => setNameBoardText(event.target.value)} />
                            <Select
                                size='small'
                                value={selectBoards}
                                sx={{ width: '250px', margin: '0 5px' }}
                                onChange={(event) => setSelectBoards(event.target.value)}>
                                <MenuItem value={1} >Все доски</MenuItem>
                                <MenuItem value={2} >Мои доски</MenuItem>
                                <MenuItem value={3} >Приглашенные доски</MenuItem>
                            </Select>
                            <Button 
                            sx={{margin: '0 5px'}} 
                            variant="contained" 
                            startIcon={<SearchIcon />}
                            onClick={() => dispatch(getBoards(postQuery, nameBoardText, selectBoards))} >
                                Найти
                            </Button>
                        </div>
                        
                        <Button
                            onClick={onClickCreate}
                            variant="contained"
                            color="secondary"
                            className={s.btn_create}
                            startIcon={<AddIcon />} >
                            {<Hidden >Создать</Hidden>}
                        </Button>
                    </div>
                    
                    <div className={s.boards}>
                        {
                            boards.map((br, ind) => {
                                if (typeof boards[0].none === 'undefined') {
                                    return (
                                        <BoardCard
                                            id={br.boardsId}
                                            key={br.boardsId}
                                            name={br.tittle}
                                            date={br.createdDate}
                                            countGroup={br.countGroup}
                                            color={br.background}
                                            userId={userId}
                                            invited={br.invitedId}
                                            favorite={br.favoriteId} />
                                    )
                                }
                            })
                            
                        }
                        <div className={s.hidden_boardCard} />
                        <div className={s.hidden_boardCard} />
                        <div className={s.hidden_boardCard} />
                        <div className={s.hidden_boardCard} />

                        
                    </div>
                </div>}
            {
                isPopupOpen
                    ? <div className={s.popup}>
                        <div className={s.popup_bg} />
                        <Create_Board_Popup closePopup={() => onClosePopup()} userId={postQuery} />
                    </div>
                    : <></>

            }

        </div>
    )
}

export default BoardsMy;