// ** React Imports
import { useState } from 'react'

import { X } from 'react-feather'

import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, CustomInput, Input, Form } from 'reactstrap'
import { useDispatch } from 'react-redux'
// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils'
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { addPack } from '../../../redux/actions/pack'

const AddEventSidebar = props => {
  // ** Props
  const { open, handleAddEventSidebar } = props
  
  // ** States
  const [nombre_sms, setSms] = useState(0)
  const [nombre_compte, setMoniteur] = useState(0)
  const [historique, setHistorique] = useState(false)
 
  
  const dispatch = useDispatch()

  // ** Adds New Event
  const handleAddEvent = (e) => {
    e.preventDefault()
    const obj = {
      nombre_sms: Number(nombre_sms),
      historique,
      nombre_compte: Number(nombre_compte)
    }
    dispatch(addPack(obj))
    handleAddEventSidebar() // Fermez la sidebar après l'ajout
  }

  // ** Reset Input Values on Close
  const handleResetInputValues = () => {
    setSms(0)
    setHistorique(false)
    setMoniteur(0)
  }

  // ** Close BTN
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleAddEventSidebar} />

  return (
    <Modal
      isOpen={open}
      toggle={handleAddEventSidebar}
      className='sidebar-lg'
      contentClassName='p-0'
      onClosed={handleResetInputValues}
      modalClassName='modal-slide-in event-sidebar'
    >
      <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Add Event</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
        <Form onSubmit={handleAddEvent}>
          <FormGroup>
            <Label for='nombre_sms'>
              SMS <span className='text-danger'>*</span>
            </Label>
            <Input
            type='number'
              id='nombre_sms'
              name='nombre_sms'
              placeholder='SMS'
              value={nombre_sms}
              onChange={e => setSms(Number(e.target.value))}
            />
          </FormGroup>

          <FormGroup>
            <Label for='nombre_compte'>
              Moniteur <span className='text-danger'>*</span>
            </Label>
            <Input
            type='number'
              id='nombre_compte'
              name='nombre_compte'
              placeholder='Moniteur'
              value={nombre_compte}
              onChange={e => setMoniteur(Number(e.target.value))}
            />
          </FormGroup> 

          <FormGroup>
            <CustomInput
              type='switch'
              id='historique'
              name='historique'
              label='Historique'
              checked={historique}
              onChange={e => setHistorique(e.target.checked)}
              inline
            />
          </FormGroup>         
    
          <FormGroup className='d-flex'>
            <Button.Ripple className='mr-1' type='submit' color='primary'>
              Add
            </Button.Ripple>
            <Button.Ripple color='secondary' type='reset' onClick={handleAddEventSidebar} outline>
              Cancel
            </Button.Ripple>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  )
}
export default AddEventSidebar

