import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import PricingFaqs from './PricingFaqs'
import PricingCards from './PricingCards'
import PricingTrial from './PricingTrial'
import PricingHeader from './PricingHeader'
import AddEventSidebar from './AddEventSidebar'
import UpdateEventSidebar from './UpdateEventSidbar'
import '@styles/base/pages/page-pricing.scss'
import classnames from 'classnames'
import { getData, getPack } from '../../../redux/actions/pack'
import { useDispatch, useSelector } from 'react-redux'

const Pricing = () => {
  const [addSidebarOpen, setAddSidebarOpen] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [updateSidebarOpen, setUpdateSidebarOpen] = useState(false)
  const [leftSidebarOpen2, setLeftSidebarOpen2] = useState(false)
  
  const dispatch = useDispatch()
  const data = useSelector(state => state.packs.data)
  const [role, setRole] = useState('')

useEffect(() => {
  const storedRole = sessionStorage.getItem('role')
  if (storedRole) {
    setRole(storedRole)
  }
}, [])
  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

  const toggleSidebar = val => setLeftSidebarOpen(val)
  const toggleSidebar2 = val => setLeftSidebarOpen2(val)
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)
  // const handleUpdateEventSidebar = () => setUpdateSidebarOpen(!updateSidebarOpen)
  const handleUpdateEventSidebar = idForfait => {
    setUpdateSidebarOpen(!updateSidebarOpen) // Ouvrir le sidebar de mise à jour
    dispatch(getPack(idForfait)) // Charger les détails du pack sélectionné
  console.log('idforfait', idForfait)
  }
  console.log('data1', data)
  return (
    <div id='pricing-table'>
      {/* Sidebar Overlay */}
      <div
        className={classnames('body-content-overlay', {
          show: (leftSidebarOpen === true || leftSidebarOpen2 === true)
        })}
        onClick={() => toggleSidebar(false) || toggleSidebar2(false)}
      ></div>
      
      <PricingHeader   />
      {data !== null ? (
        <Fragment>
          <PricingCards data={data} handleUpdateEventSidebar={handleUpdateEventSidebar} toggleSidebar={toggleSidebar2} />
          {role === 'ecole' ? (
            <>
          <PricingTrial handleAddEventSidebar={handleAddEventSidebar} toggleSidebar={toggleSidebar} />
          <AddEventSidebar
            open={addSidebarOpen}
            handleAddEventSidebar={handleAddEventSidebar}
          />
          </>
        ) : (null) 
          }
          <UpdateEventSidebar
            open={updateSidebarOpen}
            handleUpdateEventSidebar={handleUpdateEventSidebar}
          />
        </Fragment>
      ) : null}
    </div>
  )
}
export default Pricing
