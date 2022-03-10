import React from 'react';
import s from './task.module.css'

let Task = (props) =>{
    return(
        <div className={s.task}>
            {props.name}
        </div>
    )
}

export default Task;