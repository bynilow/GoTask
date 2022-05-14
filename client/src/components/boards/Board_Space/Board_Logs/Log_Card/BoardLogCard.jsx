import { Avatar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import s from './boardLogCard.module.css';


const BoardLogCard = (props) => {
    useEffect(() => {

    }, [])
    const msg = props.message.split('"')
    console.log(msg)
    
    return(
        <div className={s.log}>
            <div className={s.user_info}>
                <Avatar src={props.photo} sx={{ width: '50px', height: '50px' }} />
                <Typography sx={{marginLeft: '10px', fontSize: '20px'}}>{props.login}</Typography>
            </div>
            <div className={s.info}>
            {
                msg.map((e, ind) => {
                    if(ind && (msg[ind-1].charAt(0) == ' ' || msg[ind-1].charAt(msg[ind-1].length - 1) == ' ') ){
                        return (<Typography component="span" sx={{borderBottom: '1px black solid;'}}>'{e}'</Typography>)
                    }
                    else{
                        return (<Typography component="span">{e}</Typography>)
                    }
                })
            }
            <Typography sx={{fontSize: '14px', color:'gray'}}>{props.date}</Typography>
            </div>
            
            
        </div>
    )
}

export default BoardLogCard;