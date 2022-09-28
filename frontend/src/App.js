import React from 'react'
import { useTranslation } from 'react-i18next';

import TaskList from './components/TaskList'
import FormTask from './components/FormTask'
import Footbar from './components/Footbar'
import LanguageSelection from './components/LanguageSelection'

import "./App.css"

const App = () => {

  const { t } = useTranslation();

  return (
    <main>
        <LanguageSelection />
        <h1>{t("title")}</h1>
        <FormTask />
        <TaskList />
        <Footbar />
    </main>
  )
}

export default App