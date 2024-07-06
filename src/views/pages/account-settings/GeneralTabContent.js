import { Fragment, useState, useEffect } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { Edit, Trash2  } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { putUser, uploadImg } from '../../apps/user/store/action'
import { useLocation, useHistory  } from 'react-router-dom'

const GeneralTabs = ({ selectedUser }) => {
  // ** States
  console.log('selectedUser', selectedUser)
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()
  const { pathname, search } = location
  const url = pathname + search
  const id = parseInt(pathname.split('/').pop())
  console.log('Current URL:', url)
  console.log('Extracted ID:', id)
  const [img, setImg] = useState(null)
  const [userData, setUserData] = useState({
    nom: selectedUser.nom || '',
    prenom: selectedUser.prenom || '',
    email: selectedUser.email || '',
    numero_telephone1: selectedUser.numero_telephone1 || '',
    numero_telephone2: selectedUser.numero_telephone2 || '',
    adresse: selectedUser.adresse || '',
    cin: selectedUser.cin || '',
    description: selectedUser.description || '',
    avatar: selectedUser.avatar || '',
    username: selectedUser.username || ''

  })
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log('id', id)
      await dispatch(putUser(id, userData))
      history.push('/apps/user/list')
      console.log('User updated successfully!')
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }
  const onChange = (e) => {
    const reader = new FileReader()
    const file = e.target.files[0]
    
    reader.onload = async function () {
      const imageUrl = reader.result
      setImg(imageUrl)
  
      try {
        const formData = new FormData()
        formData.append('file', file)
        
        const response = await dispatch(uploadImg(formData))
     
        console.log('responsefront', response) 
        
        userData.avatar = response
        console.log(' userData.avatar',  userData.avatar)
        setUserData({ ...userData })
      } catch (error) {
        console.error('Failed to upload image:', error)
      }
    }
    
    reader.readAsDataURL(file)
  }
  

  const renderUserAvatar = () => {
    if (img === null) {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
        const imageUrl = selectedUser.avatar ? `http://localhost:3001/assets/${selectedUser.avatar}` : '' 
  
      return (
        <img
        style={{
          height: '8.92rem',
          width: '8.92rem'
        }}
          // initials
          color={color}
          className='user-avatar rounded mr-2 my-25 cursor-pointer'
           src={imageUrl}
           content={imageUrl}
         
        />
      )
    } else {
      return (
        <img
          className='user-avatar rounded mr-2 my-25 cursor-pointer'
          src={img}
          alt='user profile avatar'
          // height='90'
          // width='90'
          style={{
            height: '8.92rem',
            width: '8.92rem'
          }}
        />
      )
    }
  }
  const handleReset = () => {
    history.push('/apps/user/list')
  }
  return (
    <Row>
         {/* <Col sm='12'>
        <Media className='mb-2'>
          <img
            className='user-avatar rounded mr-2 my-25 cursor-pointer'
            src={`http://localhost:3001/assets/${selectedUser.avatar}`}
            alt='user profile avatar'
            height='90'
            width='90'
          />
          <Media className='mt-50' body>
            <h4>{selectedUser.username}</h4>
            <div className='d-flex flex-wrap mt-1 px-0'>
              <Button.Ripple id='change-img' tag={Label} className='mr-75 mb-0' color='primary'>
                <span className='d-none d-sm-block'>Change</span>
                <span className='d-block d-sm-none'>...</span>
                <Input type='file' hidden id='change-img' onChange={handleFileChange} accept='image/*' />
              </Button.Ripple>
            </div>
          </Media>
        </Media>
      </Col> */}
     <Col sm='12'>
        
         <Media className='mb-2'>
          {renderUserAvatar()}
          <Media className='mt-50' body>
            <h4>{selectedUser.username} </h4>
            <div className='d-flex flex-wrap mt-1 px-0'>
              <Button.Ripple id='change-img' tag={Label} className='mr-75 mb-0' color='primary'>
                <span className='d-none d-sm-block'>Change</span>
                <span className='d-block d-sm-none'>
                  <Edit size={14} />
                </span>
                <input type='file' hidden id='change-img' onChange={onChange} accept='image/*' />
              </Button.Ripple>
              <Button.Ripple color='secondary' outline>
                <span className='d-none d-sm-block'>Remove</span>
                <span className='d-block d-sm-none'>
                  <Trash2 size={14} />
                </span>
              </Button.Ripple>
            </div>
          </Media>
        </Media> 
      </Col> 
      <Col sm='12'>
      <Form onSubmit={handleSubmit}>
          <Row>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='nom'>First Name</Label>
                <Input type='text' id='nom' placeholder='First Name' 
                value={userData.nom}
                onChange={(e) => setUserData({ ...userData, nom: e.target.value })}
             />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='prenom'>Last Name</Label>
                <Input type='text' id='prenom' placeholder='Last Name' 
                value={userData.prenom}
                onChange={(e) => setUserData({ ...userData, prenom: e.target.value })}
           />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input type='text' id='email' placeholder='Email' 
                 value={userData.email}
                 onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='numero_telephone1'>Phone 1</Label>
                <Input
                  type='text'
                  id='numero_telephone1'
                  value={userData.numero_telephone1}
                  onChange={(e) => setUserData({ ...userData, numero_telephone1: e.target.value })}
       
                  placeholder='Phone'
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='numero_telephone2'>Phone</Label>
                <Input
                  type='text'
                  id='numero_telephone2'
                  value={userData.numero_telephone2}
                  onChange={(e) => setUserData({ ...userData, numero_telephone2: e.target.value })}
       
                  placeholder='Phone'
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='adresse'>Adress</Label>
                <Input
                  type='text'
                  id='adresse'
                  value={userData.adresse}
                  onChange={(e) => setUserData({ ...userData, adresse: e.target.value })}
       
                  placeholder='adress'
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='cin'>NICN</Label>
                <Input
                  type='text'
                  id='cin'
                  value={userData.cin}
                  onChange={(e) => setUserData({ ...userData, cin: e.target.value })}
       
                  placeholder='NICN'
                />
              </FormGroup>
            </Col>
            <Col md='8' sm='12'>
              <FormGroup>
                <Label for='description'>Description</Label>
                <Input
                  type='text'
                  id='description'
                  value={userData.description}
                  onChange={(e) => setUserData({ ...userData, description: e.target.value })}
       
                  placeholder='description'
                />
              </FormGroup>
            </Col>
            <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
            <Button.Ripple className='mb-1 mb-sm-0 mr-0 mr-sm-1' type='submit' color='primary'>
                Save Changes
              </Button.Ripple>
              <Button.Ripple color='secondary' outline onClick={handleReset}>
                Reset
              </Button.Ripple>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}
export default GeneralTabs