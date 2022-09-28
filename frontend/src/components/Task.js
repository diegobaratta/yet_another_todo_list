import React, {useContext}  from 'react'
import { TasksContext } from '../context'
import { useTranslation } from 'react-i18next'

import checkIcon from '../assets/images/check-circle.png'
import greenCheckIcon from '../assets/images/check-circle-green.png'
import trashIcon from '../assets/images/trash-red.png'
import editIcon from '../assets/images/edit-green.png'

const Task = ({data}) => {
    
    const {checkTask, setModal} = useContext(TasksContext)
    const {t} = useTranslation()

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
                    <img src={data.checked ? greenCheckIcon : checkIcon} alt={t("task.check-icon")} onClick={() => checkTask(data.id)} />
                    <span className={data.checked ? 'checked checked-tit' : ''}>{data.title}</span>
                </div>
                <div>
                    <img src={editIcon} alt={t("task.edit-icon")} name='editBtn' onClick={handleClick} />
                    <img src={trashIcon} alt={t("task.del-icon")} name='deleteBtn' onClick={handleClick} />
                </div>
            </div>
            <p className={`taskDesc ${data.checked && 'checked'}`}>
            {data.desc}
            </p>
        </div>
    )
}

export default Task