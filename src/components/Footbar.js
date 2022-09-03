import React from 'react'

import "./Footbar.css"

import alertIcon from '../assets/alert-circle.png'
import formatIcon from '../assets/format.png'
import shareIcon from '../assets/share.png'
import sortIcon from '../assets/sort.png'
import trashIcon from '../assets/trash.png'

const Footbar = () => {
    return (
        <footer className='footbar'>
          <ul className='listIcons'>
            <li><img src={alertIcon} alt="Icono de Alerta" /></li>
            <li><img src={shareIcon} alt="Icono de Compartir" /></li>
            <li><img src={formatIcon} alt="Icono de Formato" /></li>
            <li><img src={sortIcon} alt="Icono de Ordenar" /></li>
            <li><img src={trashIcon} alt="Icono de Eliminar" /></li>
          </ul>   
        </footer>
    )
}

export default Footbar