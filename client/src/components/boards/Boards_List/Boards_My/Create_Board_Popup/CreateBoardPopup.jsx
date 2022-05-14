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
            case 0:
                colorText = "linear-gradient(144deg, rgba(202,113,218,1) 0%, rgba(162,113,218,1) 100%)"
                break;
            case 1:
                colorText = "linear-gradient(144deg, rgba(135,150,224,1) 0%, rgba(135,188,224,1) 100%)"
                break;
            case 2:
                colorText = "linear-gradient(144deg, rgba(87,214,255,1) 0%, rgba(87,232,255,1) 100%)"
                break;
            case 3:
                colorText = "linear-gradient(144deg, rgba(85,200,189,1) 0%, rgba(85,200,162,1) 100%)"
                break;
            case 4:
                colorText = "linear-gradient(144deg, rgba(153,204,153,1) 0%, rgba(175,204,153,1) 100%)"
                break;
            case 5:
                colorText = "linear-gradient(144deg, rgba(231,231,159,1) 0%, rgba(231,213,159,1) 100%)"
                break;
            case 6:
                colorText = "linear-gradient(144deg, rgba(255,255,102,1) 0%, rgba(255,222,102,1) 100%)"
                break;
            case 7:
                colorText = "linear-gradient(144deg, rgba(255,153,102,1) 0%, rgba(255,130,102,1) 100%)"
                break;
            case 8:
                colorText = "linear-gradient(144deg, rgba(177,150,140,1) 0%, rgba(145,113,113,1) 100%)"
                break;
            case 9:
                colorText = "linear-gradient(144deg, rgba(246,246,246,1) 0%, rgba(227,225,225,1) 100%)"
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