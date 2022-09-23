import React, {useState, useContext} from 'react'
import { useTranslation } from 'react-i18next'
import { TasksContext } from '../context'

import "./FormTask.css"

const FormTask = () => {
    const {t} = useTranslation()
    const [form, setForm] = useState({title: "", desc: ""})    
    const [inputErrors, setInputErrors] = useState({input1: 0, input2: 0})
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
            setInputErrors(prevState => ({
                ...prevState,
                input1: 1
            }))
            
            return false
        }

        if(form.desc === ""){
            setInputErrors(prevState => ({
                ...prevState,
                input2: 1
            }))            

            return false
        }

        addTask(form)
        setForm({title: "", desc: ""})        

    }

    function handleFocus(e){
        switch(e.target.name){
            case 'title':
                setInputErrors(prevState => ({
                    ...prevState,
                    input1: 0
                })) 
                break;
            case 'desc':
                setInputErrors(prevState => ({
                    ...prevState,
                    input2: 0
                })) 
                break;
            default: 
                break;
        }
    }

    return (                
        <form onSubmit={handleSubmit}>
            <div className="form-group">     
                <label htmlFor='title'>
                    {t("form-task.input1")}
                </label>           
                <input 
                    id='title' 
                    name='title' 
                    value={form.title}
                    onFocus={handleFocus} 
                    onChange={handleChange} />
                <div class={`errorInput ${inputErrors.input1 === 0 ? 'hidden' : ''}`}>{t("form-task.input1-error")}</div>    
            </div>
            <div className="form-group">    
                <label htmlFor='desc'>
                    {t("form-task.input2")}
                </label>                  
                <textarea 
                    id='desc' 
                    name='desc' 
                    value={form.desc} 
                    onFocus={handleFocus} 
                    onChange={handleChange} />
                <div class={`errorInput ${inputErrors.input2 === 0 ? 'hidden' : ''}`}>{t("form-task.input2-error")}</div>    
            </div>
            <button type="submit">{t("form-task.button")}</button>
        </form>        
    )
}

export default FormTask