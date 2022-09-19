import React, {useContext, useState} from 'react'
import ReactDOM from "react-dom"

import { TasksContext } from '../context'

import "./Modal.css"

const Modal = () => {   

    const {tasks, modal, setModal, removeTask, removeAllTasks, editTask} = useContext(TasksContext)  
    const task = modal.taskid ? tasks.find(task => task.id === modal.taskid) : {id: 0, title: '', desc: ''}   
    const [editForm, setEditForm] = useState({id: task.id, title: task.title, desc: task.desc}) 

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
                            <p>¿Realmente desea borrar la tarea?</p>           
                            <div>
                                <button className='modalBtn' name="yesDel" onClick={handleClick}>Si</button>
                                <button className='modalBtn' name="noDel"  onClick={handleClick}>No</button>
                            </div>                         
                        </>            
            break
        case 'DELETEALL':
            modalBody = <>           
                            <p>¿Realmente desea borrar todas las tareas?</p>
                            <div>
                                <button className='modalBtn' name="yesDelAll" onClick={handleClick}>Si</button>
                                <button className='modalBtn' name="noDel"  onClick={handleClick}>No</button>
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
                                <p>Edici&oacute;n de tarea</p>    
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
                                <button className='modalBtn' name="edit" onClick={handleClick}>Editar</button>
                            </div>                         
                        </>
            break
        case 'SORT':                                            
            
            function handleSort(e) {
                
                
                
            } 
            
            modalBody = <>  
                            <div>
                                <select onchange={handleSort}>
                                    <option value=''>Seleccionar orden</option>
                                    <option value='alphAsc'>A - Z</option>
                                    <option value='alphDesc'>Z - A</option>
                                    <option value='dateAsc'>Vieja - Nueva</option>
                                    <option value='dateDesc'>Nueva - Vieja</option>
                                </select>
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