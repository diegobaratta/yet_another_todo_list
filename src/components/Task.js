import React, {useContext}  from 'react'
import { TasksContext } from '../context'

import checkIcon from '../assets/check-circle.png'
import greenCheckIcon from '../assets/check-circle-green.png'
import trashIcon from '../assets/trash-red.png'
import editIcon from '../assets/edit-green.png'

const Task = ({data}) => {
    
    const {editTask, checkTask, removeTask, openModal, setOpenModal} = useContext(TasksContext)

    function deleteTask() {                
        setOpenModal(true)
    }
    
    return (
        <div className='task'>
            <div className='taskTitle'>
                <div>
                    <img src={data.checked ? greenCheckIcon : checkIcon} alt="Icono de completar tarea" onClick={() => checkTask(data.id)} />
                    <span className={data.checked ? 'checked checked-tit' : ''}>{data.title}</span>
                </div>
                <div>
                    <img src={editIcon} alt="Icono de editar tarea" onClick={() => editTask(data.id)} />
                    <img src={trashIcon} alt="Icono de borrar tarea" onClick={deleteTask} />
                </div>
            </div>
            <p className={`taskDesc ${data.checked && 'checked'}`}>
            {data.desc}
            </p>
        </div>
    )
}

export default Task