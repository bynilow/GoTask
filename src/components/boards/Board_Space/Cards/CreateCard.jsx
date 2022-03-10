import { Button, TextField } from "@mui/material";
import React from "react";
import s from './createcard.module.css'

let CreateCard = () =>{
    return(
        <div className={s.createcard}>
            <TextField label="Название колонки" />
            <Button variant="contained">Создать</Button>
        </div>
    )
}

export default CreateCard;