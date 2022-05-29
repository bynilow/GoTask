import { IconButton, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import s from './deadlinePicker.module.css';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

const CardDeadlinePicker = (props) => {

    const dispatch = useDispatch()
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = React.useState(today);
   
    return(
        <div className={s.deadline_picker_bg}>
            <IconButton
                sx={{ position: 'absolute', right: '10px', top: '10px' }}
                onClick={props.closeDeadPicker} >
                <CloseIcon />
            </IconButton>
            <div className={s.picker_inner}>
                <TextField type="date" value={date} onChange={e => setDate(e.target.value)}/>
                <IconButton onClick={() => props.savePicker(date)}>
                    <SaveIcon />
                </IconButton>
            </div>

        </div>
    )
}

export default CardDeadlinePicker;