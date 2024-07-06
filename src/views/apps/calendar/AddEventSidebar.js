// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import { toast } from 'react-toastify'
import Flatpickr from 'react-flatpickr'
import { X, Check, Trash } from 'react-feather'
import Select, { components } from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, CustomInput, Input, Form } from 'reactstrap'

// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils'

// ** Avatar Images
import img1 from '@src/assets/images/avatars/1-small.png'
import img2 from '@src/assets/images/avatars/3-small.png'
import img3 from '@src/assets/images/avatars/5-small.png'
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCandidat, getMoniteur, getVoiture } from './store/actions'
// ** Toast Component
const ToastComponent = ({ title, icon, color }) => (
  <Fragment>
    <div className='toastify-header pb-0'>
      <div className='title-wrapper'>
        <Avatar size='sm' color={color} icon={icon} />
        <h6 className='toast-title'>{title}</h6>
      </div>
    </div>
  </Fragment>
)

const AddEventSidebar = props => {
  // ** Props
  const {
    store,
    dispatch,
    open,
    handleAddEventSidebar,
    calendarsColor,
    calendarApi,
    refetchEvents,
    addEvent,
    selectEvent,
    updateEvent,
    removeEvent
  } = props
  const customStyles = {
    control: (provided) => ({
      ...provided,
      zIndex: 1
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 20
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 20
    })
  }
  // ** Vars
  const selectedEvent = store.selectedEvent
  // console.log('stores', store)
  const { register, errors, handleSubmit } = useForm()
// console.log('stor.selectedEvent', selectedEvent)
  // ** States

  const [nom_evenement, setTitle] = useState('')
  const [idMoniteur, setGuests] = useState('')
  const [idVoiture, setVoitures] = useState('')
  const [idUser, setCandidat] = useState(null)
  const [date_fin, setEndPicker] = useState(new Date())
  const [date_debut, setStartPicker] = useState(new Date())
  const [type, setValue] = useState([{ value: 'Hour conduit ', label: 'Hour conduit ', color: 'primary' }])
  const [role, setRole] = useState('')

  useEffect(() => {
    const storedRole = sessionStorage.getItem('role')
    console.log('storedRole', storedRole)
    if (storedRole) {
      setRole(storedRole)
    }
  }, [])
  useEffect(() => {
    const storedRole = sessionStorage.getItem('role')
    console.log('storedRole', storedRole)
  if (storedRole === 'ecole') {
    dispatch(getCandidat())
    dispatch(getMoniteur())
    dispatch(getVoiture())
  }
   
    
  }, [dispatch])
  const voiture = useSelector((state) => state.calendar.cars) || []

  const voituresOptions = voiture && voiture.length > 0 ? voiture.map((voitures) => ({
    value: voitures.id,
    label: voitures.marque,
    avatar: `http://localhost:3001/assets/${voitures.image }` || ''
  })) : []

  
  const moniteur = useSelector(state => state.calendar.moniteur) || []
  console.log('moniteur', moniteur)
  const candidatOptions = moniteur && moniteur.length > 0 ? moniteur.map((moniteurs) => ({
    value: moniteurs.idMoniteur,
    label: moniteurs.user.nom,
    avatar: `http://localhost:3001/assets/${moniteurs.user.avatar }` || ''
  })) : []


  const options = [
    { value: 'Hour conduit', label: 'Hour conduit', color: 'primary' },
    { value: 'Hour code', label: 'Hour code', color: 'danger' },
    { value: 'Code exam', label: 'Code exam', color: 'warning' },
    { value: 'Conduit exam', label: 'Conduit exam', color: 'success' }
  ]
  const candidates = useSelector((state) => state.calendar.data) || []
  console.log('candidat', candidates)
  
  const guestsOptions = candidates && candidates.length > 0 ? candidates.map((candidate) => ({
    value: candidate.idCondidat,
    label: candidate.user.nom,
    avatar: `http://localhost:3001/assets/${candidate.user.avatar }` || ''

  })) : []

 
  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props} > 
        <span className={`bullet bullet-${data.color} bullet-sm mr-50`}></span>
        {data.label}
      </components.Option>
    )
  }
  const selectedUser1 = useSelector(state => state.calendar.evented)
  console.log('+++', selectedUser1)
  const GuestsComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props} >
        <div className='d-flex flex-wrap align-items-center'>
          <Avatar className='my-0 mr-1' size='sm' img={data.avatar} />
          <div>{data.label}</div>
        </div>
      </components.Option>
    )
  }
  const handleAddEvent = () => {
    const selectedMoniteur = idMoniteur[0]
    const selectedUser = idUser[0]
    const selectedVoiture = idVoiture[0]
    const startDate = new Date(date_debut)
    const endDate = new Date(date_fin)
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      // console.error('Invalid date format')
      return
    }
    const obj = {
      nom_evenement,
      date_debut: startDate.toISOString(),
      date_fin: endDate.toISOString(),
     idMoniteur  : selectedUser ? selectedUser.value : null,
    idVoiture: selectedVoiture ? selectedVoiture.value : null,
    idUser : selectedMoniteur ? selectedMoniteur.value : null,
    type: type[0] ? type[0].value : null
    }
    console.log('obj', obj)
    dispatch(addEvent(obj))
    refetchEvents()
    handleAddEventSidebar()
 
  }
  useEffect(() => {

    if (Array.isArray(selectedUser1) && selectedUser1.length === 0) {
      // Ne rien faire si selectedUser1 est une liste vide
      return
    }
    if (selectedUser1) {
      console.log(selectedUser1)
      if (typeof selectedUser1 === 'string') {
        console.log('rrr', selectedUser1)
        toast.error(<ToastComponent title={selectedUser1} color='danger' />, {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false
        })
      } else {
        // Afficher un toast de succès si selectedUser est autre chose (probablement un objet de succès)
        toast.success(<ToastComponent title='Event Added' color='success' icon={<Check />} />, {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false
        })
      }
    }
  }, [selectedUser1]) // Utilisez selectedUser dans les dépendances pour surveiller les changements

  // ** Reset Input Values on Close
  const handleResetInputValues = () => {
    dispatch(selectEvent({}))
    setTitle('')
    setVoitures('')
    setGuests('')
    setCandidat('')
    setValue([{ value: 'Hour conduit', label: 'Hour conduit', color: 'primary' }])
    setStartPicker(new Date())
    setEndPicker(new Date())
  }

  // ** Set sidebar fields
  const handleSelectedEvent = () => {
    if (!isObjEmpty(selectedEvent)) {
// console.log('selectedEvent', selectedEvent)
// console.log('selectedEvent._def?.extendedProps?.nom_evenement ', selectedEvent._def?.extendedProps?.nom_evenement)
setTitle(selectedEvent._def?.extendedProps?.nom_evenement || selectedEvent.nom_evenement || nom_evenement)
// setGuests(selectedEvent._def?.extendedProps?.idMoniteur || idMoniteur)
const moniteurValue = moniteur.find(mon => mon.idMoniteur === (selectedEvent._def?.extendedProps?.idMoniteur || idMoniteur))
setGuests(moniteurValue ? [{ value: moniteurValue.idMoniteur, label: moniteurValue.idMoniteur, avatar: moniteurValue.avatar || img3 }] : [])
  // Set idUser
  const userValue = candidates.find(user => user.idCondidat === (selectedEvent._def?.extendedProps?.idUser || idUser))
  setCandidat(userValue ? [{ value: userValue.idCondidat, label: userValue.idCondidat, avatar: userValue.avatar || img1 }] : [])

  // Set idVoiture
  const voitureValue = voiture.find(voit => voit.id === (selectedEvent._def?.extendedProps?.idVoiture || idVoiture))
  setVoitures(voitureValue ? [{ value: voitureValue.id, label: voitureValue.marque, avatar: voitureValue.avatar || img2 }] : [])

// setVoitures(selectedEvent._def?.extendedProps?.idVoiture || idVoiture)
// setCandidat(selectedEvent._def?.extendedProps?.idUser || idUser)
      setStartPicker(new Date(selectedEvent.start))
      setEndPicker(new Date(selectedEvent.end))
      setValue({ value: selectedEvent.type || 'Hour conduit', label: selectedEvent.type || 'Hour conduit', color: calendarsColor[selectedEvent.type] || 'primary' })

    }
  }

  // ** (UI) updateEventInCalendar
  const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {
    const existingEvent = calendarApi.getEventById(updatedEventData.idEvenement)
  
    if (!existingEvent) {
      // console.error(`Event with id ${updatedEventData.idEvenement} not found in calendar.`)
      return
    }
  
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index]
      existingEvent.setProp(propName, updatedEventData[propName])
    }
  
    existingEvent.setDates(updatedEventData.date_debut, updatedEventData.date_fin)
  
    const extendedProps = existingEvent.extendedProps
    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index]
      if (updatedEventData.hasOwnProperty(propName)) {
        extendedProps[propName] = updatedEventData[propName]
      }
    }
  }
  // ** Updates Event in Store
  const handleUpdateEvent = () => {
    const selectedMoniteur = idMoniteur[0]
    const selectedUser = idUser[0]
    const selectedVoiture = idVoiture[0]
    const startDate = new Date(date_debut)
    const endDate = new Date(date_fin)
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      // console.error('Invalid date format')
      return
    }
    if (!selectedEvent || !selectedEvent._def?.extendedProps?.idEvenement) {
      // console.error('Selected event or its properties are undefined.')
      return
    }
    const eventToUpdate = {
      idEvenement: selectedEvent._def?.extendedProps?.idEvenement,
      nom_evenement, 
      date_debut: date_debut.toISOString(), 
      date_fin: date_fin.toISOString(),
      idMoniteur  : selectedUser ? selectedUser.value : null, 
    idVoiture: selectedVoiture ? selectedVoiture.value : null,
    idUser : selectedMoniteur ? selectedMoniteur.value : null,
      type: type.length > 0 ? type[0].type : null
    }

    const propsToUpdate = ['idEvenement', 'nom_evenement']
    const extendedPropsToUpdate = ['type', 'guests', 'location', 'description']
    dispatch(updateEvent(eventToUpdate))
    updateEventInCalendar(eventToUpdate, propsToUpdate, extendedPropsToUpdate)
    handleAddEventSidebar()
    toast.success(<ToastComponent title='Event Updated' color='success' icon={<Check />} />, {
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false
    })
  }
  const removeEventInCalendar = (eventId) => {
    const allEvents = calendarApi.getEvents()
    // console.log('All events in calendar:', allEvents)
    
    // Cherchez l'événement par son ID ou son extendedProps.idEvenement
    const event = allEvents.find(event => event._def?.extendedProps?.idEvenement === eventId)
    if (!event) {
      console.error(`Event with id ${eventId} not found in calendar.`)
      return
    }
    
    event.remove()
    console.log(`Event with id ${eventId} removed from calendar.`)
  }
  
   
  const handleDeleteEvent = () => {
    const eventId = selectedEvent._def?.extendedProps?.idEvenement
    if (!eventId) {
      console.error('Selected event does not have a valid idEvenement.')
      return
    }
    
    console.log(`Event ID to delete: ${eventId}`)
    
    // Remove event from FullCalendar first
  
  
    // Dispatch action to remove event from the Redux store
    dispatch(removeEvent(eventId))
    // removeEventInCalendar(eventId)
    console.log(`Event with id ${eventId} removed from Redux store.`)
    removeEventInCalendar(eventId)
    // Refresh the calendar events
    refetchEvents()
  
    handleAddEventSidebar()
    toast.error(<ToastComponent title='Event Removed' color='danger' icon={<Trash />} />, {
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false
    })
  }
  
  // ** Event Action buttons
  const EventActions = () => {
    if (isObjEmpty(selectedEvent) || (!isObjEmpty(selectedEvent) && !selectedEvent._def?.extendedProps?.nom_evenement)) {
      return (
        <Fragment>
          <Button.Ripple className='mr-1' type='submit' color='primary'>
            Add
          </Button.Ripple>
          <Button.Ripple color='secondary' type='reset' onClick={handleAddEventSidebar} outline>
            Cancel
          </Button.Ripple>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button.Ripple
            className='mr-1'
            color='primary'
             onClick={handleUpdateEvent}
          >
            Update
          </Button.Ripple>
          <Button.Ripple color='danger' onClick={handleDeleteEvent} outline>
            Delete
          </Button.Ripple>
        </Fragment>
      )
    }
  }

  // ** Close BTN
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleAddEventSidebar} />

  return (
    <Modal
      isOpen={open}
      toggle={handleAddEventSidebar}
      className='sidebar-lg'
      contentClassName='p-0'
      onOpened={handleSelectedEvent}
      onClosed={handleResetInputValues}
      modalClassName='modal-slide-in event-sidebar'
    >
      <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>
        {selectedEvent?._def?.extendedProps?.nom_evenement ? 'Update' : 'Add'} Event
          </h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
      <Form
  onSubmit={handleSubmit(data => {
    if (isObjEmpty(errors)) {
      // console.log('errors', errors)
      if (isObjEmpty(selectedEvent) || (!isObjEmpty(selectedEvent) && !selectedEvent._def?.extendedProps?.nom_evenement)) {
        handleAddEvent()
      } else {
        // console.log('Calling handleUpdateEvent')
        handleUpdateEvent()
      }
      handleAddEventSidebar()
    }
  })}
>
          <FormGroup>
            <Label for='idMoniteur'>Candidat</Label>
            <Select
              // isMulti
              id='idMoniteur'
              className='react-select'
              classNamePrefix='select'
              isClearable={false}
              options={guestsOptions}
              theme={selectThemeColors}
              value={idMoniteur}
              onChange={e => setGuests([e])}
              components={{
                Option: GuestsComponent
              }}
              styles={customStyles} 
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <Label for='nom_evenement'>
            Name Event <span className='text-danger'>*</span>
            </Label>
            <Input
              id='nom_evenement'
              name='nom_evenement'
              placeholder='nom evenement'
              value={nom_evenement}
              onChange={e => setTitle(e.target.value)}
              innerRef={register({ register: true, validate: value => value !== '' })}
              className={classnames({
                'is-invalid': errors.nom_evenement
              })}
            />
          </FormGroup>
        
          <FormGroup className="mt-2">
            <Label for='type'>Event Type</Label>
            <Select
              id='type'
              value={type}
              options={options}
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              isClearable={false}
              onChange={data => setValue([data])}
              components={{
                Option: OptionComponent
              }}
              styles={customStyles}
        
            />
          </FormGroup>

          <FormGroup className="mt-2">
            <Label for='date_debut'>Start Date</Label>
            <Flatpickr
              required
              id='date_debut'
              // tag={Flatpickr}
              name='date_debut'
              className='form-control'
              onChange={date => setStartPicker(date[0])}
              value={date_debut}
              options={{
                 enableTime: true,
                dateFormat: 'Y-m-d H:i'
              }}
            />
          </FormGroup>
 
          <FormGroup className="mt-2">
            <Label for='date_fin'>End Date</Label>
            <Flatpickr
              required
              id='date_fin'
              // tag={Flatpickr}
              name='date_fin'
              className='form-control'
              onChange={date => setEndPicker(date[0])}
              value={date_fin}
              options={{
                 enableTime: true,
                dateFormat: 'Y-m-d H:i'
              }}
            />
          </FormGroup>
      
         <FormGroup className="mt-2">
            <Label for='idUser'>Monitor</Label>
            <Select
        
              id='idUser'
              className='react-select'
              classNamePrefix='select'
              isClearable={false}
              options={candidatOptions}
              theme={selectThemeColors}
              value={idUser}
              onChange={e => setCandidat([e])}
              components={{
                Option: GuestsComponent
              }}
              styles={customStyles} 
              
            />
          </FormGroup>
          <FormGroup className="mt-3">
            <Label for='idVoiture'>Car</Label>
            <Select
              
              id='idVoiture'
              className='react-select'
              classNamePrefix='select'
              isClearable={false}
              options={voituresOptions}
              theme={selectThemeColors}
              value={idVoiture}
              onChange={e => setVoitures([e])}
              components={{
                Option: GuestsComponent
              }}
          
            />
          </FormGroup>

          <FormGroup className='d-flex'>
            <EventActions />
          </FormGroup>
        
        </Form>
      </ModalBody>
    </Modal>
  )
}


export default AddEventSidebar
