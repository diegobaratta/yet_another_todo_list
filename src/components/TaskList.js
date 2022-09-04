import React, {useContext} from 'react'
import { TasksContext } from '../context'

import Task from "./Task"
import Modal from './Modal'
import "./TaskList.css"

const TaskList = () => {
    const {tasks, openModal} = useContext(TasksContext)

    const taskGroup = tasks.map(task => {      
        return (            
            <li key={task.id}>
                <Task data={task} />
            </li>
        )
    })

    return (
        <section className='tasks'>
            <ul>
                {taskGroup}
            </ul>
            <Modal open={openModal} type='DELETE' />
        </section>
    )
}

export default TaskList