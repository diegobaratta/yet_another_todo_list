import React from 'react'

import { useTranslation } from "react-i18next";

import './LanguageSelection.css'

import translation from '../assets/images/translation.png'
import spanish from '../assets/images/spanish.png'
import english from '../assets/images/english.png'

const LanguageSelection = () => {    
    const { i18n } = useTranslation();   
    
    function handleChangeLng(lng){
        i18n.changeLanguage(lng)
        localStorage.setItem("lng", lng)
    }

    return (
        <div className='languageGroup'>

            <img src={translation} alt="Icono de traducci&oacute;n" />
            <div className='flags'>
                <label>
                    <input type="radio" name="lang" value="es" defaultChecked />
                    <img src={spanish} alt="Opcion ES" onClick={() => handleChangeLng('es')} />
                </label>

                <label>
                    <input type="radio" name="lang" value="en" />
                    <img src={english} alt="Opcion EN" onClick={() => handleChangeLng('en')} />
                </label>
            </div>

        </div>
    )
}

export default LanguageSelection