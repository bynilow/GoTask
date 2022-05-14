import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { getBoardsInvite } from "../../../../actions/boards";
import { toggleIsFetchingAC } from "../../../../reducers/boardsReducer";
import Preloader from "../../../common/Preloader";
import BoardCardInvite from "../../Board_Card/BoardCardInvite.jsx";
import s from './boardsInvite.module.css';

let BoardsInvite = (props) => {

    if(!props.isAuth) return <Navigate to='/login' />

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
        dispatch(getBoardsInvite(postQuery))       
    },[])

    

    const isFetching = useSelector(state => state.boards.isFetching)


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
            : <div className={s.boards}>
                {
                    boards.map((br, ind) => {
                        if (typeof boards[0].none === 'undefined') {
                            return (
                                <BoardCardInvite 
                                    id={br.inviteId}
                                    boardId={br.boardId}
                                    key={ind} 
                                    name={br.tittle} 
                                    username={br.senderName} 
                                    color={br.background} 
                                    userId={postQuery}/>
                            )
                        }
                    })
                }
            </div>}
            
            
        </div>
    )
}

export default BoardsInvite;