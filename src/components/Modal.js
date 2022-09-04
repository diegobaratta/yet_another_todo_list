import React from 'react'
import ReactDOM from "react-dom"

import "./Modal.css"

const Modal = ({openModal, type}) => {   
    
    if(!openModal) return null

    return ReactDOM.createPortal(      
        <>
            <div className='overlay' />
            <div className='modal'>            
                <p>¿Realmente desea borrar la tarea?</p>           
                <div>
                    <button className='modalBtn'>Si</button>
                    <button className='modalBtn'>No</button>
                </div> 
            </div>
        </> ,
        document.getElementById("portal")
    )
}

export default Modal