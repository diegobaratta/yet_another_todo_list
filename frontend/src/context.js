import React, {useState, useEffect, createContext, useReducer} from "react"

const TasksContext = createContext()

function taskReducer(state, action) {    
    switch(action.type) {
        case "SET_TASKS":
            return action.payload
        case "CREATE_TASK":
            return [...state, action.payload]
        case "DELETE_TASK":
            return state.filter(task => task._id !== action.payload._id)
        case "CHECK_TASK":
            return state.map(task => (
                task._id === action.payload._id ?
                {
                    ...task,
                    checked: !task.checked
                } :
                task
            ))
        case "EDIT_TASK":
            return state.map(task => (
                task._id === action.payload.id ?
                {
                    ...task,
                    title: action.payload.title, 
                    desc: action.payload.desc
                } :
                task
            ))
        case "DELETE_ALL_TASKS":
            return []
        case "SORT_TASKS":
            let sorted = []
            
            switch(action.payload){
                case "alphAsc":
                    sorted = state.sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0))
                    break;                
                case "alphDesc":
                    sorted = state.sort((a, b) => (a.title > b.title ? -1 : a.title < b.title ? 1 : 0)) 
                    break;
                case "dateAsc":
                    sorted = state.sort((a, b) => (a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0))
                    break;
                case "dateDesc":
                    sorted = state.sort((a, b) => (a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0))
                    break;
                default:
                    break;
            }
            
            return sorted
        default:
            return state
    }
}

function TasksContextProvider (props) {
    const [modal, setModal] = useState({opened: false, taskid: 0, type: 'none'})   
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

        if(response.ok){                     
            dispatch({type: 'CREATE_TASK', payload: json})
        }    
    }    

    //Checking task as ready 
    async function checkTask(id, value){

        const response = await fetch("/api/tasks/" + id, {
            method: "PATCH",
            body: JSON.stringify({"checked": value}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(response.ok)
            dispatch({type: 'CHECK_TASK', payload: json})  
    }

    //Editing task 
    async function editTask({id, title, desc}){

        const response = await fetch("/api/tasks/" + id, {
            method: "PATCH",
            body: JSON.stringify({
                "title": title,
                "desc": desc
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })        

        if(response.ok)
            dispatch({type: 'EDIT_TASK', payload: {
                "id": id,
                "title": title,
                "desc": desc
            }})  

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
    
    //Removing all the tasks 
    async function removeAllTasks(){
        const response = await fetch("/api/tasks/", {
            method: "DELETE"
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_ALL_TASKS', payload: json})
        }                
        
        setModal({opened: false, taskid: 0, type: 'none'})
    }

    //Sorting the tasks by criteria
    function sortTasks(type) {            
        dispatch({type: 'SORT_TASKS', payload: type})             
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