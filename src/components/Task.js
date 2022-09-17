import React, {useContext}  from 'react'
import { TasksContext } from '../context'

import checkIcon from '../assets/check-circle.png'
import greenCheckIcon from '../assets/check-circle-green.png'
import trashIcon from '../assets/trash-red.png'
import editIcon from '../assets/edit-green.png'

const Task = ({data}) => {
    
    const {checkTask, setModal} = useContext(TasksContext)

    function handleClick(e) { 

        switch(e.target.name){
            case 'editBtn':                                  
                setModal({opened: true, taskid: data.id, type: 'EDIT'})        
                break
            case 'deleteBtn':
                setModal({opened: true, taskid: data.id, type: 'DELETE'})        
                break
            default:
                break
        }
    }
    
    return (
        <div className='task'>
            <div className='taskTitle'>
                <div>
                    <img src={data.checked ? greenCheckIcon : checkIcon} alt="Icono de completar tarea" onClick={() => checkTask(data.id)} />
                    <span className={data.checked ? 'checked checked-tit' : ''}>{data.title}</span>
                </div>
                <div>
                    <img src={editIcon} alt="Icono de editar tarea" name='editBtn' onClick={handleClick} />
                    <img src={trashIcon} alt="Icono de borrar tarea" name='deleteBtn' onClick={handleClick} />
                </div>
            </div>
            <p className={`taskDesc ${data.checked && 'checked'}`}>
            {data.desc}
            </p>
        </div>
    )
}

export default Task