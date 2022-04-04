import { Button, Divider, TextField, ToggleButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoard, getBoards } from "../../../actions/boards";
import BoardCard from "../board_card/BoardCard";
import s from './boards_inner.module.css'
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import CheckCircleIcon from '@mui/icons-material/Done';
import Preloader from "../../common/Preloader";
import { toggleIsFetchingAC } from "../../../reducers/boardsReducer";

let Boards_Inner = () => {

    let boards = useSelector(state => state.boards.boards)
    const userId = useSelector(state => state.user.currentUser.id)
    const dispatch = useDispatch()

    console.log(boards)
    
    // if (boards === undefined){
    //     dispatch(getBoards(userId))
    //     dispatch(toggleIsFetchingAC(true))
    //     if(boards === undefined){
    //         boards = null;
    //     }
    // }

    useEffect(()=>{
        
    },[])

    if(boards.length === 0 && boards !== null){
        dispatch(getBoards(userId))
        dispatch(toggleIsFetchingAC(true))
    }
        
    const isFetching = useSelector(state => state.boards.isFetching)
        

    const [boardVisibility, setBoardVisibility] = React.useState(false);
    const [createVisibility, setCreateVisibility] = React.useState(false);
    const [choosenColor, setChoosenColor] = React.useState(0);
    const [inputText, setInputText] = React.useState("");

    const handleChanged = (event) => {
        setBoardVisibility(!boardVisibility)
    }

    const inputChanged = (event) => {
        if(event.target.value.toString().length < 45){
            setInputText(event.target.value)
        }
        
    }

    const clickCreateVisibility = () => {
        setCreateVisibility(!createVisibility)
        
    }

    const changeColor = (color, ind) => {
        setChoosenColor(ind);

    }

    const clickCreateBoard = () => {
        let colorText = '';
        switch (choosenColor) {
            default:
                colorText = "OTHER"
            case 0:
                colorText = "#b867c6"
                break;
            case 1:
                colorText = "#7b88cc"
                break;
            case 2:
                colorText = "#4fc3f7"
                break;
            case 3:
                colorText = "#4db6ac"
                break;
            case 4:
                colorText = "#81c784"
                break;
            case 5:
                colorText = "#dce775"
                break;
            case 6:
                colorText = "#ffd54f"
                break;
            case 7:
                colorText = "#ff8a65"
                break;
            case 8:
                colorText = "#a1887f"
                break;
            case 9:
                colorText = "#e0e0e0"
                break;
        }
        const visibilityNum = (Number(boardVisibility)+1)
        dispatch(createBoard(userId, inputText, colorText, visibilityNum))
    }

    return (
        <div className={s.boards_inner}>
            {isFetching ? <Preloader /> : null}
            {boards != null
                ? boards.map((br, ind) =>
                    <BoardCard id={br.boardsId} key={ind} name={br.tittle} color={br.background} />)
                : null}


            <div className={s.createBoard_btn} onClick={createVisibility ? "" : clickCreateVisibility}>

                <Typography className={s.createBoard_inner} >
                    + Создать доску
                </Typography>


                <div
                    className={createVisibility ? s.createVisible + " " + s.createBoard_popup : s.createHidden + " " + s.createBoard_popup}
                    onMouseLeave={clickCreateVisibility}>

                    <Typography variant="h6">Создание доски</Typography>
                    <Divider className={s.divider} />
                    <Typography variant="h6">фон</Typography>
                    <div className={s.color_picker_group}>
                        <div onClick={() => changeColor("purple", 0)} className={s.color + " " + s.purple}>
                            <CheckCircleIcon className={(choosenColor == 0) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("indigo", 1)} className={s.color + " " + s.indigo}>
                            <CheckCircleIcon className={(choosenColor == 1) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("blue", 2)} className={s.color + " " + s.blue}>
                            <CheckCircleIcon className={(choosenColor == 2) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("teal", 3)} className={s.color + " " + s.teal}>
                            <CheckCircleIcon className={(choosenColor == 3) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("green", 4)} className={s.color + " " + s.green}>
                            <CheckCircleIcon className={(choosenColor == 4) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("lime", 5)} className={s.color + " " + s.lime}>
                            <CheckCircleIcon className={(choosenColor == 5) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("yellow", 6)} className={s.color + " " + s.yellow}>
                            <CheckCircleIcon className={(choosenColor == 6) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("orange", 7)} className={s.color + " " + s.orange}>
                            <CheckCircleIcon className={(choosenColor == 7) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("brown", 8)} className={s.color + " " + s.brown}>
                            <CheckCircleIcon className={(choosenColor == 8) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("gray", 9)} className={s.color + " " + s.gray}>
                            <CheckCircleIcon className={(choosenColor == 9) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                    </div>

                    <TextField
                        type="text"
                        autoFocus
                        className={s.board_name}
                        label="Название доски"
                        value={inputText}
                        onChange={inputChanged} />

                    <ToggleButton value={boardVisibility} onChange={handleChanged} className={s.toggleButton}>
                        {
                            boardVisibility
                                ? <div className={s.toggleButton_description + " " + s.private}>
                                    <LockIcon fontSize="large" className={s.toggleButton_Lock} />
                                    <div className={s.toggleButton_text}>
                                        <Typography variant="h5">Приватная</Typography>
                                        <Typography >Просматривать и изменять эту доску могут только добавленные на нее пользователи.</Typography>
                                    </div>

                                </div>
                                : <div className={s.toggleButton_description + " " + s.public}>
                                    <PublicIcon fontSize="large" className={s.toggleButton_Private} />
                                    <div className={s.toggleButton_text}>
                                        <Typography variant="h5">Публичная</Typography>
                                        <Typography>Просматривать эту доску могут все в Интернете. Изменять только участники.</Typography>
                                    </div>

                                </div>
                        }
                    </ToggleButton>
                    <Button onClick={clickCreateBoard} variant="contained" color="secondary" className={s.btn_create}>Создать</Button>
                </div>

            </div>
        </div>
    )
}

export default Boards_Inner;