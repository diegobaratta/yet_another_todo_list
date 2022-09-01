import React, {useContext} from 'react'
import { TasksContext } from '../context'

import Task from "./Task"
import "./TaskList.css"

const TaskList = () => {
    const {tasks, editTask, checkTask, removeTask} = useContext(TasksContext)

    const taskGroup = tasks.map(task => {      
        return (            
            <li key={task.id}>
                <Task data={task} methods={[editTask, checkTask, removeTask]} />
            </li>
        )
    })

    return (
        <section className='tasks'>
            <ul>
                {taskGroup}
            </ul>
        </section>
    )
}

export default TaskList