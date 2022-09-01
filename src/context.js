import React, {useState} from "react"
import {nanoid} from "nanoid"

const TasksContext = React.createContext({})

function TasksContextProvider (props) {
    const [tasks, setTasks] = useState([])   

    function addTask(formData) {
        
        setTasks(prevTasks => ([
            ...prevTasks,
            {
                id: nanoid(), 
                checked: false,
                title: formData.title, 
                desc: formData.desc
            }
        ]))

    }
    
    function removeTask(id){
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
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

    function editTask(id){

    }

    return (
        <TasksContext.Provider value={{tasks, addTask, removeTask, checkTask, editTask}}>
            {props.children}
        </TasksContext.Provider>
    )
}

export {TasksContext, TasksContextProvider} 