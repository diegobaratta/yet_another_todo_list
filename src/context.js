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
        
        let compareFunc

        switch(type){
            case "alphAsc":   
                compareFunc = (s1, s2) => (s1.localeCompare(s2) > 0 ? 1 : s1.localeCompare(s2) < 0 ? -1 : 0)                         
                break;
            case "alphDesc":
                compareFunc = (s1, s2) => (s1.localeCompare(s2) < 0 ? 1 : s1.localeCompare(s2) > 0 ? -1 : 0)                         
                break;
            case "dateAsc":
                compareFunc = (a, b) => (a > b ? 1 : a < b ? -1 : 0)         
                break;
            case "dateDesc":
                compareFunc = (a, b) => (a < b ? 1 : a > b ? -1 : 0)         
                break;
            default:
                break;
        }
        console.log(mergeSort(tasks, compareFunc, type))
        // setTasks(mergeSort(tasks, compareFunc, type))
        // setModal({opened: false, taskid: 0, type: 'none'})
    }

    let defaultCompare = (a, b) => (a > b ? 1 : a < b ? -1 : 0)

    function mergeSort(array, compare = defaultCompare, type, start = 0, end = array.length){
        
        let length = end - start
        
        if(length <= 1) return array.slice(start, end)

        //Divide
        let pivot = Math.floor(length / 2)

        //Conquer
        let left = mergeSort(array, compare, type, start, start + pivot)
        let right = mergeSort(array, compare, type, start + pivot, end)
        
        //Combine
        let i = 0, j = 0
        let sorted = []
        
        for (let k = 0; k < length; k++){
            
            let comp1, comp2            
            
            if(type === "alphAsc" || type === "alphDesc"){                
                comp1 = left[i]?.title
                comp2 = right[j]?.title
            }else{
                comp1 = left[i]?.date
                comp2 = right[j]?.date
            }
            
            if(i < left.length && compare(comp1, comp2) <= 0){                
                sorted.push(left[i])
                i++
            } else {
                sorted.push(right[j])
                j++
            }
        }

        return sorted        
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