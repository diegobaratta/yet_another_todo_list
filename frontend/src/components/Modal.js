import React, {useContext, useRef, useState} from 'react'
import ReactDOM from "react-dom"
import { useTranslation } from 'react-i18next'

import { TasksContext } from '../context'

import arrowUp from '../assets/images/arrow-top.png'
import arrowDown from '../assets/images/arrow-down.png'

import "./Modal.css"

const Modal = () => {   

    const {tasks, modal, setModal, removeTask, removeAllTasks, editTask, sortTasks} = useContext(TasksContext)  
    const task = modal.taskid ? tasks.find(task => task._id === modal.taskid) : {id: 0, title: '', desc: ''}   
    const [editForm, setEditForm] = useState({id: task._id, title: task.title, desc: task.desc}) 
    const {t} = useTranslation()
    const optionsRef = useRef()
    const arrowImgRef = useRef()

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
                sortTasks(e.target.id)
            }

            function openOptions() {
                if(optionsRef.current.classList.contains('hidden')){
                    arrowImgRef.current.src = arrowUp
                    optionsRef.current.classList.remove("hidden")
                }else{
                    arrowImgRef.current.src = arrowDown
                    optionsRef.current.classList.add("hidden")
                }
            }
            
            modalBody = <>  
                            <p>{t("modal.order-tasks")}</p>
                            <div className='selectBox' onClick={openOptions}>
                                <h5>{t("modal.select")}</h5>
                                <img ref={arrowImgRef} className='arrow' src={arrowDown} alt={t("footbar.sort-arrow")} />
                            </div>    
                            <ul className='options hidden' ref={optionsRef}>
                                <li id='alphAsc' onClick={handleSort}>A - Z</li>
                                <li id='alphDesc' onClick={handleSort}>Z - A</li>
                                <li id='dateAsc' onClick={handleSort}>{t("modal.dateASC")}</li>
                                <li id='dateDesc' onClick={handleSort}>{t("modal.dateDESC")}</li>
                            </ul>
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