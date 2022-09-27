import React, {useState} from "react"
import {nanoid} from "nanoid"

const TasksContext = React.createContext({})

function TasksContextProvider (props) {
    const [tasks, setTasks] = useState([])  
    const [modal, setModal] = useState({opened: false, taskid: 0, type: 'none'})    

    function addTask(formData) {
        
        setTasks(prevTasks => ([
            ...prevTasks,
            {
                id: nanoid(), 
                checked: false,
                title: formData.title, 
                desc: formData.desc,
                date: new Date().getTime()
            }
        ]))
    }
    
    function checkTask(id){
        setTasks(prevTasks => (prevTasks.map(task => (
            task.id === id ?
            {
                ...task,
                checked: !task.checked
            } :
            task
            ))))
    }

    function editTask({id, title, desc}){
        
        setTasks(prevTasks =>   (prevTasks.map(task => (
                                    task.id === id ?
                                    {
                                        ...task,
                                        title: title, 
                                        desc: desc
                                    } :
                                    task
                                    ))
                                )
                )
        setModal({opened: false, taskid: 0, type: 'none'})
    }
    
    function removeTask(id){
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
        setModal({opened: false, taskid: 0, type: 'none'})
    } 
    
    function removeAllTasks(){
        setTasks([])
        setModal({opened: false, taskid: 0, type: 'none'})
    }

    function sortTasks(type) {        

        switch(type){
            case "alphAsc":
                setTasks(tasks.sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0)))   
                break;                
            case "alphDesc":
                setTasks(tasks.sort((a, b) => (a.title > b.title ? -1 : a.title < b.title ? 1 : 0)))   
                break;
            case "dateAsc":
                setTasks(tasks.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0)))   
                break;
            case "dateDesc":
                setTasks(tasks.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0)))   
                break;
            default:
                break;
        }       
     
        setModal({opened: false, taskid: 0, type: 'none'})
    }

    return (
        <TasksContext.Provider value={{ tasks, 
                                        addTask, 
                                        removeTask, 
                                        removeAllTasks, 
                                        checkTask, 
                                        editTask,
                                        sortTasks, 
                                        modal, 
                                        setModal
                                    }}>
            {props.children}
        </TasksContext.Provider>
    )
}

export {TasksContext, TasksContextProvider} 