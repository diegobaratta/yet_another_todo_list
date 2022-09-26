import React, {useContext, useState} from 'react'
import ReactDOM from "react-dom"
import { useTranslation } from 'react-i18next'

import { TasksContext } from '../context'

import "./Modal.css"

const Modal = () => {   

    const {tasks, modal, setModal, removeTask, removeAllTasks, editTask, sortTasks} = useContext(TasksContext)  
    const task = modal.taskid ? tasks.find(task => task.id === modal.taskid) : {id: 0, title: '', desc: ''}   
    const [editForm, setEditForm] = useState({id: task.id, title: task.title, desc: task.desc}) 
    const {t} = useTranslation()

    let modalBody;
    
    if(!modal.opened) return null

    function handleClick (e) {
        switch(e.target.name){
            case "yesDel":
                removeTask(modal.taskid)
                break;
            case "noDel":
                setModal({opened: false, taskid: 0, type: 'none'})
                break;
            case "yesDelAll":
                removeAllTasks()
                break;
            case "edit":  
                editTask(editForm)
                break;
            case "sort":  
                editTask(editForm)
                break;
            default:
                setModal({opened: false, taskid: 0, type: 'none'})
                break;
        }
    }

    switch(modal.type){
        case 'DELETE':
            modalBody = <>           
                            <p>{t("modal.delete-task")}</p>           
                            <div>
                                <button className='modalBtn' name="yesDel" onClick={handleClick}>{t("yes")}</button>
                                <button className='modalBtn' name="noDel"  onClick={handleClick}>{t("no")}</button>
                            </div>                         
                        </>            
            break
        case 'DELETEALL':
            modalBody = <>           
                            <p>{t("modal.delete-tasks")}</p>
                            <div>
                                <button className='modalBtn' name="yesDelAll" onClick={handleClick}>{t("yes")}</button>
                                <button className='modalBtn' name="noDel"  onClick={handleClick}>{t("no")}</button>
                            </div>                         
                        </>            
            break
        case 'EDIT':                                            
            
            function handleChange(e) {
                const {name, value} = e.target
                
                setEditForm(prevState => (
                    {
                        ...prevState,
                        [name]: value
                    }
                ))
            } 
            
            modalBody = <>                                 
                            <form>  
                                <p>{t("modal.edit-task")}</p>    
                                <input                                         
                                    id='title' 
                                    name='title' 
                                    value={editForm.title} 
                                    onChange={handleChange} />
                                <textarea                                         
                                    id='desc' 
                                    name='desc' 
                                    value={editForm.desc} 
                                    onChange={handleChange} />
                            </form>
                            <div>
                                <button className='modalBtn' name="edit" onClick={handleClick}>{t("edit")}</button>
                                <button className='modalBtn' name="close" onClick={handleClick}>{t("close")}</button>
                            </div>                         
                        </>
            break
            case 'SORT':                                            
            
            function handleSort(e) {
                sortTasks(e.target.value)
            } 
            
            modalBody = <>  
                            <p>{t("modal.order-tasks")}</p>    
                            <select onChange={handleSort}>
                                <option value=''>{t("modal.select")}</option>
                                <option value='alphAsc'>A - Z</option>
                                <option value='alphDesc'>Z - A</option>
                                <option value='dateAsc'>{t("modal.dateASC")}</option>
                                <option value='dateDesc'>{t("modal.dateDESC")}</option>
                            </select>
                            <div>                                    
                                <button className='modalBtn' name="close" onClick={handleClick}>{t("close")}</button>
                            </div>  
                        </>
            break
        default:
            break
    }   
    
    return ReactDOM.createPortal(      
        <>
            <div className='overlay' name="overlay" onClick={handleClick} />
            <div className='modal'>            
                {modalBody}
            </div>
        </>,
       document.getElementById("portal")
   )
}

export default Modal