import React, { useContext } from 'react'
import { TasksContext } from '../context'

import "./Footbar.css"

import alertIcon from '../assets/alert-circle.png'
import formatIcon from '../assets/format.png'
import shareIcon from '../assets/share.png'
import sortIcon from '../assets/sort.png'
import trashIcon from '../assets/trash.png'

const Footbar = () => {

  const {setModal} = useContext(TasksContext)

  function handleClick(e) { 

      switch(e.target.name){
          case 'alert':                                  
              
              break
          case 'share':
              
              break
          case 'format':
              
              break
          case 'sort':
              setModal({opened: true, taskid: 0, type: 'SORT'}) 
              break
          case 'delete':
              setModal({opened: true, taskid: 0, type: 'DELETEALL'})        
              break
          default:
              break
      }
  }


    return (
        <footer className='footbar'>
          <ul className='listIcons'>
            <li><img src={alertIcon} alt="Icono de Informaci&oacute;n" title="Informaci&oacute;n" name='alert' onClick={handleClick} /></li>
            <li><img src={shareIcon} alt="Icono de Compartir" title="Compartir" name='share' onClick={handleClick} /></li>
            <li><img src={formatIcon} alt="Icono de Formato" title="Formato" name='format' onClick={handleClick} /></li>
            <li><img src={sortIcon} alt="Icono de Ordenar" title="Ordenar" name='sort' onClick={handleClick} /></li>
            <li><img src={trashIcon} alt="Icono de Eliminar todas las tareas" title="Eliminar todas las tareas" name='delete' onClick={handleClick} /></li>
          </ul>   
        </footer>
    )
}

export default Footbar