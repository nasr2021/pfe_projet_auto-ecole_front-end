import Avatar from '@components/avatar'
import { getData, acheterPack, refuserPack } from '../../../redux/actions/demande'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useState, useEffect, Fragment } from 'react'
import { Monitor, Coffee, Watch, Archive, TrendingUp, TrendingDown, MoreVertical, Trash2 } from 'react-feather'
import {Table,  Card, CardHeader, CardTitle, CardBody, Media, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Input  } from 'reactstrap'
const CompanyTable = () => {
  const [role, setRole] = useState('')
  const ToastComponent = ({ title, color }) => (
    <Fragment>
      <div className='toastify-header pb-0'>
        <div className='title-wrapper'>
          <Avatar size='sm' color={color}/>
          <h6 className='toast-title'>{title}</h6>
        </div>
      </div>
    </Fragment>
  )
    useEffect(() => {
      const storedRole = sessionStorage.getItem('role')
      if (storedRole) {
        setRole(storedRole)
      }
    }, [])
    const data = useSelector(state => state.demande.data),
    
    dispatch = useDispatch()
    
  const fetchData = () => dispatch(getData())
    useEffect(() => {
      fetchData()
    }, [dispatch])
    
    const selectedUser = useSelector(state => state.demande.selectedUser) // Assurez-vous de l'état Redux correctement défini
    const selectedUser1 = useSelector(state => state.demande.selectedUser) 
    useEffect(() => {
      if (selectedUser) {
        if (typeof selectedUser === 'string') {
          // Afficher un toast d'erreur si selectedUser est une chaîne (probablement un message d'erreur)
          toast.success(<ToastComponent title={selectedUser} color='success' />, {
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false
          })
        } else {
          // Afficher un toast de succès si selectedUser est autre chose (probablement un objet de succès)
          toast.success(<ToastComponent title="Le demande acceptée avec succès" color='success' />, {
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false
          })
        }
      }
    }, [selectedUser])
    const handleAcceptClick = async (packId) => {
      // dispatch(acheterPack(packId)).then((result) => {
      //   console.log('er', result)
      //   // Utilisation du résultat retourné pour afficher le toast
      //   toast.error(<ToastComponent title={result} color='danger' />, {
      //     autoClose: 2000,
      //     hideProgressBar: true,
      //     closeButton: false
      //   })
      // })
      await dispatch(acheterPack(packId))
      fetchData()
     
    }
 // Utilisez selectedUser dans les dépendances pour surveiller les changements
  
    const handleRefuserClick = async (packId) => {
      await dispatch(refuserPack(packId))
          // Utilisation du résultat retourné pour afficher le toast
          toast.success(<ToastComponent title="Le demande refuser avec succès" color='success' />, {
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false
          })
        
      fetchData()
    }


    const renderData = () => {
      if (!data || data.length === 0) {
        return (
          <tr>
            <td colSpan="6" className="text-center">No data available</td>
          </tr>
        )
      }
      const renderClient = (data) => {
        const stateNum = Math.floor(Math.random() * 6)
        const states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary']
        const color = states[stateNum]
        const imageUrl = `http://localhost:3001/assets/${data.user.avatar}`
        
        console.log('data.user.avatar', data.user.avatar)
        console.log('imageUrl', imageUrl)
      
        return (
          <Avatar
            color={color || 'primary'}
            className='mr-1'
            img={imageUrl}
            content={data.user.avatar || 'John Doe'}
            initials
          />
        )
      }
      return data.map(col => (
        <tr key={col.idDemande}>
          <td>
            <div className='d-flex align-items-center'>
              <div className='avatar rounded'>
                <div className='avatar-content'>
                  {renderClient(col)}
                </div>
              </div>
              <div>
              {role !== 'ecole' ? (<div className='font-weight-bolder'>{col.autoecole?.nom}</div>) : (<div className='font-weight-bolder'>{col.user.nom} {col.user.prenom}</div>)}
              </div>
            </div>
          </td>
          <td>
            <div className='d-flex align-items-center'>
  
              <span>{col.type}</span>
            </div>
          </td>
          <td className='text-nowrap'>
            <div className='d-flex flex-column'>
              {/* <span className='font-weight-bolder mb-25'>{col.views}</span> */}
              <span className='font-small-2 text-muted'>in {col.date_creation}</span><span>{col.date_debut}  {col.date_fin}</span>
            </div>
          </td>
          {role !== 'ecole' ? (<td>{col.forfait?.prix}DT</td>) : (<td>{col.evenement?.nom_evenement}</td>)}
          <td>{col.autoecole?.telephone}</td>
          <td>
            <div className='d-flex align-items-center'>
              <span className='font-weight-bolder mr-1'>
                <UncontrolledDropdown>
                  <DropdownToggle tag='div' className='btn btn-sm'>
                    <MoreVertical size={14} className='cursor-pointer' />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      className='w-100'
                      onClick={() => handleAcceptClick(col.idDemande)}
                    >
                      <Archive size={14} className='mr-50' />
                      <span className='align-middle'>Accepted</span>
                    </DropdownItem>
                    <DropdownItem
                      className='w-100'
                      onClick={() => handleRefuserClick(col.idDemande)}
                    >
                      <Trash2 size={14} className='mr-50' />
                      <span className='align-middle'>Refused</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </span>
            </div>
          </td>
        </tr>
      ))
    }
    
  
  return (
    <Card className='card-company-table'>
      <Table responsive>
        <thead>
          <tr>
            <th>Driving school</th>
            <th>Category</th>
            <th>Date</th>
            {role !== 'ecole' ? (<th>Price</th>) : (<th>Event</th>)}
            <th>Phone number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  )
}
export default CompanyTable
