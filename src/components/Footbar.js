import React, { useContext } from 'react'
import { TasksContext } from '../context'
import { useTranslation } from 'react-i18next'

import "./Footbar.css"

// import alertIcon from '../assets/images/alert-circle.png'
// import formatIcon from '../assets/images/format.png'
// import shareIcon from '../assets/images/share.png'
import sortIcon from '../assets/images/sort.png'
import trashIcon from '../assets/images/trash.png'

const Footbar = () => {

  const {setModal} = useContext(TasksContext)
  const {t} = useTranslation()

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
            {/* <li><img src={alertIcon} alt={t("footbar.alert-icon")} title={t("footbar.alert")} name='alert' onClick={handleClick} /></li> */}
            {/* <li><img src={shareIcon} alt={t("footbar.share-icon")} title={t("footbar.share")} name='share' onClick={handleClick} /></li> */}
            {/* <li><img src={formatIcon} alt={t("footbar.format-icon")} title={t("footbar.format")} name='format' onClick={handleClick} /></li> */}
            <li><img src={sortIcon} alt={t("footbar.sort-icon")} title={t("footbar.sort")} name='sort' onClick={handleClick} /></li>
            <li><img src={trashIcon} alt={t("footbar.trash-icon")} title={t("footbar.trash")} name='delete' onClick={handleClick} /></li>
          </ul>   
        </footer>
    )
}

export default Footbar