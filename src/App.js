import React from 'react'
import TaskList from './components/TaskList'
import FormTask from './components/FormTask'
import Footbar from './components/Footbar'

import "./App.css"

const App = () => {
  return (
    <main>
        <h1>Mis tareas</h1>
        <FormTask />
        <TaskList />
        <Footbar />
    </main>
  )
}

export default App