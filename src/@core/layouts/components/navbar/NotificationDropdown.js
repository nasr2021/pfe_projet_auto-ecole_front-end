// ** React Imports
import React, { useEffect, useState, Fragment } from 'react'
import { getFirebaseToken } from '../../../../firebaseConfig' // Import correct
// ** Custom Components
import Avatar from '@components/avatar'
import { useForm } from 'react-hook-form'
import { addService } from '../../../../redux/actions/transaction'
// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle } from 'react-feather'
import {
  Button,
  Badge,
  Media,
  CustomInput,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Input, Form  
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { sendTokenToServer, getNotification, Notification } from '../../../../redux/actions/statestique'
import { isObjEmpty } from '@utils'

const NotificationDropdown = () => {
  const [formModal, setFormModal] = useState(false) // État pour contrôler l'ouverture/fermeture du modal
  const [selectedNotification, setSelectedNotification] = useState(null) // État pour stocker la notification sélectionnée
  
  const data = useSelector(state => state.statistiques.allNotif)
  const toggleModal = (notification) => {
    setSelectedNotification(notification)
    setFormModal(!formModal)
  }
  const handleSubmit = (values) => {
    // Traitez la soumission du formulaire ici
    setFormModal(false) // Fermez le modal après la soumission
  }
  const dispatch = useDispatch()
  const fetchData = () => dispatch(getNotification())
  useEffect(() => {
    fetchData()
    // dispatch(getNotification())
    console.log('notif')
    const fetchToken = async () => {
      try {
        const token = await getFirebaseToken()
        console.log('token', token)
        if (token) {
          dispatch(sendTokenToServer(token))
        }
      } catch (error) {
        // console.error('Error fetching token:', error)
      }
    }
    fetchToken()
  }, [dispatch])
  const handleAcceptClick = (idNotif) => {
    dispatch(Notification(idNotif)) // Appel de l'action Redux `Notification` avec l'ID de la notification
  }
  
  // Compte le nombre de notifications lues (lu: true)
  const readNotificationsCount = data.filter(notification => notification.lu).length

  // Compte le nombre de notifications non lues (lu: false)
  const unreadNotificationsCount = data.filter(notification => !notification.lu).length

  useEffect(() => {
    console.log('readNotificationsCount', readNotificationsCount)
    console.log('unreadNotificationsCount', unreadNotificationsCount)
    console.log('notif', data)
  },  
    [data, readNotificationsCount, unreadNotificationsCount])
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {data.map((item, index) => (
 <a 
 key={index} 
 className='d-flex' 
 href='/' onClick={(e) => { e.preventDefault(); toggleModal(item); handleAcceptClick(item.idNotification) }}>      
           <Media className={classnames('d-flex', {
                'align-items-start': !item.lu,
                'align-items-center': item.lu
              })}
            >
              {!item.lu ? (
                <Fragment>
                 <Media left>
  <Avatar
    {...(item.user.avatar ? { img: `http://localhost:3001/assets/${item.user.avatar}`, imgHeight: 32, imgWidth: 32 } : item.avatarIcon ? { icon: item.avatarIcon } : null)}
  />
</Media>

                  <Media body>
                    <div className='notification-text'>{item.description}</div>
                    <small className='notification-text'>{item.date_creation}</small>
                  </Media>
                </Fragment>
              ) : (
                <Fragment>
                  <div>{item.description}</div>
                  <div>{item.lu}</div>
                </Fragment>
              )}
            </Media>
          </a>
        ))}
      </PerfectScrollbar>
    )
  }
  
  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item mr-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Bell size={21} />
        <Badge pill color='danger' className='badge-up'>
          {unreadNotificationsCount}
        </Badge>
      </DropdownToggle>
      <DropdownMenu tag='ul' right className='dropdown-menu-media mt-0 mb-1'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 mr-auto'>Notifications</h4>
            <Badge tag='div' color='light-primary' pill>
              {readNotificationsCount} New
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
       
      </DropdownMenu>
      <Modal isOpen={formModal} toggle={toggleModal} className='modal-dialog-centered'>
        <ModalHeader toggle={toggleModal}> Details</ModalHeader>
        <ModalBody>
          {selectedNotification && (
            <div>
              <p >Description: {selectedNotification.description}</p>
              <p className='mt-2'>Sending date: {selectedNotification.date_creation}</p>
              {/* Ajoutez d'autres détails de notification si nécessaire */}
            </div>
          )
          }
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleSubmit}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </UncontrolledDropdown>
  )

}

export default NotificationDropdown