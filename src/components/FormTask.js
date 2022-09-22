import React, {useState, useContext} from 'react'
import { useTranslation } from 'react-i18next'
import { TasksContext } from '../context'

import "./FormTask.css"

const FormTask = () => {
    const {t} = useTranslation()
    const [form, setForm] = useState({title: "", desc: ""})
    const [placeHolders, setPlaceHolders] = useState({placeholder1: t("form-task.placeholder1"), placeholder2: t("form-task.placeholder2"), red1: false, red2: false})
    const {addTask} = useContext(TasksContext)

    function handleChange(e) {
        const {name, value} = e.target
        
        setForm(prevState => (
            {
                ...prevState,
                [name]: value
            }
        ))
    }    

    function handleSubmit(e) {
        e.preventDefault()

        if(form.title === ""){

            setPlaceHolders(prevState => ({
                ...prevState,
                placeholder1: t("form-task.placeholder1-error"),
                red1: true
            }))

            return false
        }

        if(form.desc === ""){

            setPlaceHolders(prevState => ({
                ...prevState,
                placeholder2: t("form-task.placeholder2-error"),
                red2: true
            }))

            return false
        }

        addTask(form)
        setForm({title: "", desc: ""})
        setPlaceHolders({placeholder1: t("form-task.placeholder1"), placeholder2: t("form-task.placeholder2"), red1: false, red2: false})

    }

    return (                
        <form onSubmit={handleSubmit}>
            <div className="form-group">                
                <input 
                    className={placeHolders.red1 ? "placeHolderRed" : ""}  
                    placeholder={placeHolders.placeholder1} 
                    id='title' 
                    name='title' 
                    value={form.title} 
                    onChange={handleChange} />
            </div>
            <div className="form-group">                
                <textarea 
                    className={placeHolders.red2 ? "placeHolderRed" : ""}  
                    placeholder={placeHolders.placeholder2} 
                    id='desc' 
                    name='desc' 
                    value={form.desc} 
                    onChange={handleChange} />
            </div>
            <button type="submit">{t("form-task.button")}</button>
        </form>        
    )
}

export default FormTask