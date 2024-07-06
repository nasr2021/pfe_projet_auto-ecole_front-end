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
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { putPack, getPack } from '../../../redux/actions/pack'

const UpdateEventSidebar = ({ open, handleUpdateEventSidebar, idForfait }) => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.packs)

  const [userData, setUserData] = useState({
    nombre_sms: '',
    nombre_compte: '',
    historique: false,
    prix: '',
    nom_forfait: 'basic'
  })

  const { nombre_sms, nombre_compte, historique, prix, nom_forfait } = userData
  const { loading, error } = store

  useEffect(() => {
    if (open && idForfait) {
      dispatch(getPack(idForfait)) // Charger les données du pack sélectionné
    }
  }, [dispatch, idForfait, open])

  useEffect(() => {
    if (store.selectedUser) {
      setUserData({
        nombre_sms: store.selectedUser.nombre_sms || '',
        nombre_compte: store.selectedUser.nombre_compte || '',
        historique: store.selectedUser.historique || false,
        prix: store.selectedUser.prix || '',
        nom_forfait: store.selectedUser.nom_forfait || 'basic'
      })
    }
  }, [store.selectedUser])

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    setUserData({
      ...userData,
      [name]: val
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    
    // Convertir nombre_sms et nombre_compte en nombres
    const updatedUserData = {
      ...userData,
      nombre_sms: parseInt(userData.nombre_sms),
      nombre_compte: parseInt(userData.nombre_compte)
    }

    try {
      await dispatch(putPack(updatedUserData)) // Mettre à jour le pack
      console.log('Pack updated successfully!')
      handleUpdateEventSidebar() // Fermer le modal après la mise à jour
    } catch (error) {
      console.error('Failed to update pack:', error.message) // Afficher le message d'erreur
    }
  }

  // Si le modal n'est pas ouvert ou si l'ID est absent, ne rien afficher
  if (!open || !idForfait) {
    return null
  }

  // Bouton pour fermer le sidebar
  const CloseBtn = (
    <X
      className='cursor-pointer'
      size={15}
      onClick={() => handleUpdateEventSidebar()}
    />
  )

  return (
    <Modal
      isOpen={open}
      toggle={() => handleUpdateEventSidebar()}
      className='sidebar-lg'
      contentClassName='p-0'
      modalClassName='modal-slide-in event-sidebar'
    >
      <ModalHeader className='mb-1' toggle={() => handleUpdateEventSidebar()} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>Update Pack</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for='nom_forfait'>Forfait Name</Label>
            <Input
              type='text'
              name='nom_forfait'
              id='nom_forfait'
              value={nom_forfait}
              disabled
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for='nombre_sms'>
              SMS <span className='text-danger'>*</span>
            </Label>
            <Input
              id='nombre_sms'
              name='nombre_sms'
              placeholder='SMS'
              value={nombre_sms}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for='nombre_compte'>
              Moniteur <span className='text-danger'>*</span>
            </Label>
            <Input
              id='nombre_compte'
              name='nombre_compte'
              placeholder='Moniteur'
              value={nombre_compte}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <CustomInput
              type='switch'
              id='historique'
              name='historique'
              label='Historique'
              checked={historique}
              onChange={handleInputChange}
              inline
            />
          </FormGroup>
          <FormGroup>
            <Label for='prix'>
              Prix <span className='text-danger'>*</span>
            </Label>
            <Input
              id='prix'
              name='prix'
              placeholder='Prix'
              value={prix}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className='d-flex'>
            <Button.Ripple className='mr-1' type='submit' color='primary' disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </Button.Ripple>
            <Button.Ripple color='secondary' type='button' onClick={() => handleUpdateEventSidebar()} outline>
              Cancel
            </Button.Ripple>
          </FormGroup>
          {error && <p className='text-danger'>{error}</p>}
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default UpdateEventSidebar