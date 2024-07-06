import Avatar from '@components/avatar'
import * as Icon from 'react-feather'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData, addService, deleteService } from '../../../../redux/actions/transaction'
import { Card, CardHeader, CardTitle, CardBody, Media, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Input, Form  } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import { store } from '../../../../redux/storeConfig/store'
import { isObjEmpty } from '@utils'

const CardTransactions = () => {
  const { register, errors, handleSubmit } = useForm()
  const [formModal, setFormModal] = useState(false)
  const dispatch = useDispatch()

  const fetchData = () => {
    dispatch(getData())
  }

  useEffect(() => {
    console.log("Fetching data...")
    fetchData()
  }, [dispatch, formModal])

  const handleAddUser = (user) => {
    dispatch(addService(user))
    setFormModal(false)
    fetchData()
  }

  const allData = useSelector(state => state.transaction.allData)

  const renderTransactions = () => {
    if (!Array.isArray(allData)) {
      return <div>No data available</div>
    }

    return allData.map(item => {
      const service = item.service || {}
      return (
        <div key={item.idService} className='transaction-item'>
          <Media>
            {/* <Avatar className='rounded' color={item.color} icon={<item.Icon size={18} />} /> */}
            <div className='mt-1'>{service.nom || 'No Service Name'}</div>
          </Media>
          <div className='font-weight-bolder text-danger'>{item.tarif}</div>
          <UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
              <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem className='w-100'>
                <Archive size={14} className='mr-50' />
                <span className='align-middle'>Edit</span>
              </DropdownItem>
              <DropdownItem className='w-100'  onClick={() => {

                store.dispatch(deleteService(item.idService))
              }}>
                <Trash2 size={14} className='mr-50' />
                <span className='align-middle' >Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    })
  }

  const onSubmit = (values) => {
    if (isObjEmpty(errors)) {
      setFormModal(false)
      console.log('User data to be added:', values)
      dispatch(addService(values))
    }
  }

  return (
    <Card className='card-transaction'>
      <CardHeader>
        <CardTitle tag='h4'>Transactions</CardTitle>
        <Button.Ripple color='primary' outline onClick={() => setFormModal(!formModal)}>
          Add
        </Button.Ripple>
        <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
          <ModalHeader toggle={() => setFormModal(!formModal)}> Add</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for='nom'>Service:</Label>
              <Input
                type='text'
                name='nom'
                id='nom'
                placeholder='SMS'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors['nom'] })}
              />
            </FormGroup>
            <FormGroup>
              <Label for='tarif'>Pricing:</Label>
              <Input
                type='number'
                name='tarif'
                id='tarif'
                placeholder='10'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors['tarif'] })}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={handleSubmit(onSubmit)}>
              Add
            </Button>
          </ModalFooter>
        </Modal>
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions