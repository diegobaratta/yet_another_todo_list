import React, {useContext} from 'react'
import { TasksContext } from '../context'

import Task from "./Task"
import Modal from './Modal'
import "./TaskList.css"

const TaskList = () => {
    const {tasks, modal} = useContext(TasksContext)
    
    const taskGroup = tasks.map(task => {      
        return (            
            <li key={task._id}>
                <Task data={task} />
            </li>
        )
    })

    return (
        <section className='tasks'>
            <ul>
                {taskGroup}
            </ul>
            {modal.opened && <Modal />}
        </section>
    )
}

export default TaskList