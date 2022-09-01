import React from 'react'

import checkIcon from '../assets/check-circle.png'
import greenCheckIcon from '../assets/check-circle-green.png'
import trashIcon from '../assets/trash-2-red.png'
import editIcon from '../assets/edit-3.png'

const Task = ({data, methods}) => {

    const [editTask, checkTask, removeTask] = methods
    
    return (
        <div className='task'>
            <div className='taskTitle'>
                <div>
                    <img src={data.checked ? greenCheckIcon : checkIcon} alt="Icono de completar tarea" onClick={() => checkTask(data.id)} />
                    <span className={data.checked ? 'checked checked-tit' : ''}>{data.title}</span>
                </div>
                <div>
                    <img src={editIcon} alt="Icono de editar tarea" onClick={() => editTask(data.id)} />
                    <img src={trashIcon} alt="Icono de borrar tarea" onClick={() => removeTask(data.id)} />
                </div>
            </div>
            <p className={`taskDesc ${data.checked && 'checked'}`}>
            {data.title} Descripci&oacute;n: {data.desc}
            </p>
        </div>
    )
}

export default Task