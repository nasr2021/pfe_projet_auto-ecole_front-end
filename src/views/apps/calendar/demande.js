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
import { addDemande } from '../../../redux/actions/demande'
import { getDemandeEvent } from './store/actions'
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

const AddDemandeSidebar = props => {
  // ** Props
  const {
    store,
    dispatch,
    open,
    handleSidebar,
    fetchEvents
  } = props

  // ** Vars
 
  // console.log('stores', store)
  const { register, errors, handleSubmit } = useForm()
// console.log('stor.selectedEvent', selectedEvent)
  // ** States
  const [idEvenement, setVoitures] = useState('')
  const [date_fin, setEndPicker] = useState(new Date())
  const [date_debut, setStartPicker] = useState(new Date())
  useEffect(() => {
    dispatch(fetchEvents()) 
    dispatch(getDemandeEvent())
  }, [dispatch])
  const demandeEvent = useSelector((state) => state.calendar.demandeEvent) || []

  // const voituresOptions = demandeEvent && demandeEvent.length > 0 ? demandeEvent.map((demandeEvents) => ({
   
  //   value: demandeEvents.extendedProps?.idEvenement,
  //     label: demandeEvents.title
  // })) : []
  // const event = useSelector((state) => state.calendar.events) || []
  // console.log('select...', event)
  const voituresOptions = demandeEvent && demandeEvent.length > 0 ? demandeEvent.map((events) => ({
    value: events.idEvenement,
    label: events.nom_evenement

  })) : []
   // Filter events to include only those with a start date greater than today
   useEffect(() => {
    dispatch(fetchEvents()) 
  }, [dispatch])

  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}><span className={`bullet bullet-${data.color} bullet-sm mr-50`}></span>
        {data.label}
      </components.Option>
    )
  }
  const GuestsComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className='d-flex flex-wrap align-items-center'>
        
          <div>{data.label}</div>
        </div>
      </components.Option>
    )
  }
  const handleAddEvent = () => {
    const selectedVoiture = idEvenement[0]
    const startDate = new Date(date_debut)
    const endDate = new Date(date_fin)
    const obj = {
      date_debut: startDate.toISOString(),
      date_fin: endDate.toISOString(),
      idEvenement: selectedVoiture ? selectedVoiture.value : null
    }
    dispatch(addDemande(obj))
   
    handleSidebar()
    toast.success(<ToastComponent title='Event Added' color='success' icon={<Check />} />, {
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false
    })
  }

  // ** Reset Input Values on Close
  const handleResetInputValues = () => {
    setVoitures('')
    setStartPicker(new Date())
    setEndPicker(new Date())
  }

  // ** Event Action buttons
  const EventActions = () => {

      return (
        <Fragment>
          <Button.Ripple className='mr-1' type='submit' color='primary'>
            Add
          </Button.Ripple>
          <Button.Ripple color='secondary' type='reset' onClick={handleSidebar} outline>
            Cancel
          </Button.Ripple>
        </Fragment>
      )
    
  }

  // ** Close BTN
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleSidebar} />

  return (
    <Modal
      isOpen={open}
      toggle={handleSidebar}
      className='sidebar-lg'
      contentClassName='p-0'
     
      onClosed={handleResetInputValues}
      modalClassName='modal-slide-in event-sidebar'
    >
      <ModalHeader className='mb-1' toggle={handleSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>
        Add 
          </h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
      <Form
  onSubmit={handleSubmit(data => {
        handleAddEvent()
  })}
>       
          <FormGroup>
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

          <FormGroup>
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
         
          <FormGroup>
            <Label for='idEvenement'>Event</Label>
            <Select
              // isMulti
              id='idEvenement'
              className='react-select'
              classNamePrefix='select'
              isClearable={false}
              options={voituresOptions}
           
              value={idEvenement}
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

export default AddDemandeSidebar