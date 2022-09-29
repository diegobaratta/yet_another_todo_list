import React, {useState, useEffect, createContext, useReducer} from "react"
import {nanoid} from "nanoid"

const TasksContext = createContext()

function taskReducer(state, action) {    
    switch(action.type) {
        case "SET_TASKS":
            return action.payload
        case "CREATE_TASK":
            return [...state, action.payload]
        case "DELETE_TASK":
            return state.filter(task => task._id !== action.payload._id)
        default:
            return state
    }
}

function TasksContextProvider (props) {
    const [tasks2, setTasks] = useState([])  
    const [modal, setModal] = useState({opened: false, taskid: 0, type: 'none'})    
    const [error, setError] = useState(null)
    const [tasks, dispatch] = useReducer(taskReducer, [])

    //Downloading all tasks in DB
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch("/api/tasks")
            const json = await response.json()
            
            if (response.ok){
                dispatch({type: 'SET_TASKS', payload: json})
            }
        }

        fetchTasks()
    }, [])

    //Adding new task
    async function addTask(formData) {

        const response = await fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }else{
            setError(null)
            console.log("New task added", json)
            dispatch({type: 'CREATE_TASK', payload: json})
        }    
    }    

    //TODO: Checking task as ready 
    function checkTask(id){
        setTasks(prevTasks => (prevTasks.map(task => (
            task._id === id ?
            {
                ...task,
                checked: !task.checked
            } :
            task
            ))))
    }

    //TODO: Editing task 
    function editTask({id, title, desc}){
        
        setTasks(prevTasks =>   (prevTasks.map(task => (
                                    task._id === id ?
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
    
    //Removing task
    async function removeTask(id){
        const response = await fetch("/api/tasks/" + id, {
            method: "DELETE"
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_TASK', payload: json})
        }

        // setTasks(prevTasks => prevTasks.filter(task => task._id !== id))
        setModal({opened: false, taskid: 0, type: 'none'})
    } 
    
    //TODO: Removing all the tasks 
    function removeAllTasks(){
        setTasks([])
        setModal({opened: false, taskid: 0, type: 'none'})
    }

    //TODO: Sorting the tasks by criteria
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
                                        setModal,
                                        // state,
                                        dispatch,
                                    }}>
            {props.children}
        </TasksContext.Provider>
    )
}

export {TasksContext, TasksContextProvider} 