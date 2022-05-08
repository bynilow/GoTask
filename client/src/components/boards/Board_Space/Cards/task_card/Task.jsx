import React from 'react';
import { useDispatch } from 'react-redux';
import { moveTask } from '../../../../../actions/boards';
import s from './task.module.css'

let Task = (props) => {

    const cardId = props.cardId;
    const taskId = props.taskId;

    const dispatch = useDispatch();

    const [currentCard, setCurrentCard] = React.useState(null);
    const [currentTask, setCurrentTask] = React.useState(null);


    const dragOverHandler = (e, card, task) =>{
        e.preventDefault();
        if(e.target.className == s.task){
            e.target.style.boxShadow = '0 2px 0px red';

        }
    }
    const dragLeaveHandler = (e) =>{
        e.target.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)';

    }
    const dragStartHandler = (e) =>{
        setCurrentCard(cardId)
        setCurrentTask(taskId)
    }
    const dragEndHandler = (e) =>{
        e.target.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)';
    }
    const dropHandler = (e) =>{
        e.preventDefault();
        e.target.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)';
        console.log(e.target.cardId)
        dispatch(moveTask(taskId, cardId))
    }

    return (
        <div
            className={s.task}
            draggable={true}
            onDragOver={e => dragOverHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragStart={e => dragStartHandler(e)}
            onDragEnd={e => dragEndHandler(e)}
            onDrop={e => dropHandler(e)} >
            {props.name}
        </div>
    )
}

export default Task;