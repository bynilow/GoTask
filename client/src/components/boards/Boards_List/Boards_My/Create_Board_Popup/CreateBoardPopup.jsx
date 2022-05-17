import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/Done';
import { Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createBoard } from '../../../../../actions/boards';
import s from './createBoardPopup.module.css';

const CreateBoardPopup = (props) => {

    const dispatch = useDispatch()

    const [choosenColor, setChoosenColor] = React.useState(0);
    const [inputText, setInputText] = React.useState("");
    const changeColor = (color, ind) => {
        setChoosenColor(ind);
    }
    const onClickCreateBoard = () => {
        let colorText = '';
        switch (choosenColor) {
            default:
                colorText = "OTHER"
            case 0: //orange
                colorText = "linear-gradient(144deg, rgba(255,204,102,1) 0%, rgba(255,140,102,1) 100%)"
                break;
            case 1: //brown
                colorText = "linear-gradient(144deg, rgba(204,153,102,1) 0%, rgba(204,124,102,1) 100%)"
                break;
            case 2: //red
                colorText = "linear-gradient(144deg, rgba(87,214,255,1) 0%, rgba(87,232,255,1) 100%)"
                break;
            case 3: // purple
                colorText = "linear-gradient(144deg, rgba(255,102,204,1) 0%, rgba(243,102,255,1) 100%)"
                break;
            case 4: //violet
                colorText = "linear-gradient(144deg, rgba(204,51,255,1) 0%, rgba(119,51,255,1) 100%)"
                break;
            case 5: // blue
                colorText = "linear-gradient(144deg, rgba(153,153,255,1) 0%, rgba(153,213,255,1) 100%)"
                break;
            case 6: // aqua
                colorText = "linear-gradient(144deg, rgba(0,153,204,1) 0%, rgba(0,204,191,1) 100%)"
                break;
            case 7: // lime
                colorText = "linear-gradient(144deg, rgba(102,204,153,1) 0%, rgba(108,204,102,1) 100%)"
                break;
            case 8: // green
                colorText = "linear-gradient(144deg, rgba(102,204,102,1) 0%, rgba(154,204,102,1) 100%)"
                break;
            case 9: // gray
                colorText = "linear-gradient(144deg, rgba(204,204,204,1) 0%, rgba(164,158,152,1) 100%)"
                break;
        }
        if(inputText.length > 0){
            dispatch(createBoard(props.userId, inputText, colorText, 1))
        }
        else{
            dispatch(createBoard(props.userId, "Новая доска", colorText, 1))
        }
        onClickClosePopup();
    }
    const inputChanged = (event) => {
        if (event.target.value.toString().length < 45) {
            setInputText(event.target.value)
        }
    }

    const onClickClosePopup = () => {
        props.closePopup();
    }

    return (
        <div className={s.board_popup}>
            <IconButton onClick={onClickClosePopup}
                sx={{position:'absolute', right: '0', top: '0', margin: '10px'}}>
                <CloseIcon />
            </IconButton>
            
            <div className={s.popup_inner}>
                <div>
                    <Typography variant="h6" sx={{ textTransform: 'uppercase' }}>Создание доски</Typography>
                    <Divider className={s.divider} />
                </div>

                <div className={s.select_color_inner}>
                    <Typography variant="h6">фон</Typography>
                    <div className={s.color_picker_group}>
                        <div onClick={() => changeColor("purple", 0)} className={s.color + " " + s.orange}>
                            <CheckCircleIcon className={(choosenColor == 0) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("indigo", 1)} className={s.color + " " + s.brown}>
                            <CheckCircleIcon className={(choosenColor == 1) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        
                        <div onClick={() => changeColor("teal", 3)} className={s.color + " " + s.purple}>
                            <CheckCircleIcon className={(choosenColor == 3) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("green", 4)} className={s.color + " " + s.violet}>
                            <CheckCircleIcon className={(choosenColor == 4) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("lime", 5)} className={s.color + " " + s.blue}>
                            <CheckCircleIcon className={(choosenColor == 5) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("yellow", 6)} className={s.color + " " + s.aqua}>
                            <CheckCircleIcon className={(choosenColor == 6) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("orange", 7)} className={s.color + " " + s.lime}>
                            <CheckCircleIcon className={(choosenColor == 7) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("brown", 8)} className={s.color + " " + s.green}>
                            <CheckCircleIcon className={(choosenColor == 8) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                        <div onClick={() => changeColor("gray", 9)} className={s.color + " " + s.white}>
                            <CheckCircleIcon className={(choosenColor == 9) ? s.select_color + " " + s.color_active : s.select_color + " " + s.color_unactive} />
                        </div>
                    </div>
                </div>


                <TextField
                    type="text"
                    className={s.board_name}
                    sx={{width:'70%'}}
                    label="Название доски"
                    value={inputText}
                    onChange={inputChanged} />
                <Button variant='contained' color='secondary' onClick={onClickCreateBoard}>
                    Создать
                </Button>
                

            </div>
        </div>
    )
}

export default CreateBoardPopup;