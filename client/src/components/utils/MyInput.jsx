import React from "react";
import { TextField } from "@mui/material";

const MyInput = ( props ) => {
    return (
        <TextField
            type={props.type}
            value={props.value}
            onChange={(event) => props.setValue(event.target.value)}
            placeholder={props.placeholder}
            id="standard-basic"
            label={props.label}
            variant="outlined"
            sx={{ mt: 2 }} />
    )
}

export default MyInput;