// ** React Imports
import { Fragment, useState, useEffect } from 'react'
// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'
import Avatar from '@components/avatar'
// ** Third Party Components
import classnames from 'classnames'
import { Media, Input, Label, FormGroup, Col, Row, Form, CardTitle, CardHeader, Card, CardBody, CardText, Button, Alert } from 'reactstrap'
import { useLocation, useHistory } from 'react-router-dom'
import { uploadImg } from '../../user/store/action'
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getWishlistItems, deleteWishlistItem, addToCart } from '../store/actions'
import { putCar, getCar } from '../../../../redux/actions/cars'
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { Edit } from 'react-feather'

// const Wishlist = () => {
//   const location = useLocation()
//   const { pathname, search } = location
//   const url = pathname + search
//   const id = parseInt(pathname.split('/').pop())
//   console.log('Current URL:', url)
//   console.log('Extracted ID:', id)
//   const history = useHistory()
//   // ** Store Vars
//   const dispatch = useDispatch()
//   const store = useSelector(state => state.cars)
//   console.log('store', store)
//   const [img, setImg] = useState(null)
//   // ** ComponentDidMount : Get product
//   useEffect(() => {
//     dispatch(getCar(id))
//   }, [dispatch, id])
//   console.log('selectedUser', store.selectedUser)
//   const [statut, setStatut] = useState('Disponible')
//   const [userData, setUserData] = useState({
//     marque: '',
//     modele: '',
//     couleur: '',
//     statut: statut,
//     annee: '',
//     matricule:'',
//     description:'',
//     image:''
//   })

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setUserData({
//       ...userData,
//       [name]: value
//     })
//   }
//   useEffect(() => {
//     if (store.selectedUser) {
//       setUserData({
//         marque: store.selectedUser.marque || '',
//         modele: store.selectedUser.modele || '',
//         matricule: store.selectedUser.matricule || '',
//         description: store.selectedUser.description || '',
//         couleur: store.selectedUser.couleur || '',
//         statut: store.selectedUser.statut || statut ,
//         annee: store.selectedUser.annee || '',
//         image: store.selectedUser.image || ''
//       })
//     }
//   }, [store.selectedUser])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       console.log('id', id)
//       await dispatch(putCar(id, userData))
//       console.log('Car updated successfully!')
//       history.push('/apps/ecommerce/shop')
//     } catch (error) {
//       console.error('Failed to update car:', error)
//     }
//   }
//   const handleCancel = () => {
//     console.log('dcxsszs')
//     history.push('/apps/ecommerce/shop')
//   }
//   if (!store.selectedUser) {
//     return null 
//   }
//   const onChange = (e) => {
//     const reader = new FileReader()
//     const file = e.target.files[0]
    
//     reader.onload = async function () {
//       const imageUrl = reader.result 
//       setImg(imageUrl) 
  
//       try {
//         const formData = new FormData()
//         formData.append('file', file)
        
//         const response = await dispatch(uploadImg(formData))
//         userData.avatar = response
//         setUserData({ ...userData }) 
//       } catch (error) {
//         console.error('Failed to upload image:', error)
//       }
//     } 
//     reader.readAsDataURL(file)
//   }

//   const renderUserAvatar = () => {
//     if (img === null) {
//       const stateNum = Math.floor(Math.random() * 6),
//         states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
//         color = states[stateNum]
//         const imageUrl = userData.image ? `http://localhost:3001/assets/${userData.image}` : '' // Update with your server URL
//       return (
//         // <Avatar
//           // className='user-avatar  mr-2 my-25'
//           // img={imageUrl}
//           // content={imageUrl}
//           // contentStyles={{
//           //   borderRadius: 0,
//           //   fontSize: 'calc(36px)',
//           //   width: '100%',
//           //   height: '100%'
//           // }}
//           // style={{
//           //   height: '90px',
//           //   width: '90px'
//           // }}
//         // />
//         <img
//         className='user-avatar rounded mr-2 my-25 cursor-pointer'
//         src={imageUrl}
//         alt='user profile avatar'
//         height='90'
//         width='90'
//       />
//       )
//     } else {
//       return (
//         <img
//           className='user-avatar rounded mr-2 my-25 cursor-pointer'
//           src={img}
//           alt='user profile avatar'
//           height='90'
//           width='90'
//         />
//       )
//     }
//   }
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle tag='h4'>Edit Car</CardTitle>
//       </CardHeader>
//       <CardBody>
//       <Media className='mb-2'>
//           {renderUserAvatar()}
//           <Media className='mt-50' body>
          
//             <div className='d-flex flex-wrap mt-1 px-0'>
//               <Button.Ripple id='change-img' tag={Label} className='mr-75 mb-0' color='primary'>
//                 <span className='d-none d-sm-block'>Change</span>
//                 <span className='d-block d-sm-none'>
//                   <Edit size={14} />
//                 </span>
//                 <input type='file' hidden id='change-img' onChange={onChange} accept='image/*' />
//               </Button.Ripple>
//             </div>
//           </Media>
//         </Media> 
//         <Form onSubmit={handleSubmit}>
//           <Row>
//             <Col md='6' sm='12'>
//               <FormGroup>
//                 <Label for='marque'>Brand</Label>
//                 <Input
//                   type='text'
//                   name='marque'
//                   id='marque'
//                   placeholder='marque'
//                   value={userData.marque}
//                   onChange={handleInputChange}
//                   className={classnames({ 'is-invalid': !userData.marque })}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md='6' sm='12'>
//               <FormGroup>
//                 <Label for='modele'>Model</Label>
//                 <Input
//                   type='text'
//                   name='modele'
//                   id='modele'
//                   placeholder='modele'
//                   value={userData.modele}
//                   onChange={handleInputChange}
//                   className={classnames({ 'is-invalid': !userData.modele })}
//                 />
//               </FormGroup>
//             </Col>

            
//             <Col md='6' sm='12'>
//               <FormGroup>
//                 <Label for='annee'>Year</Label>
//                 <Input
//                   type='number'
//                   name='annee'
//                   id='annee'
//                   placeholder='annee'
//                   value={userData.annee}
//                   onChange={handleInputChange}
//                   className={classnames({ 'is-invalid': !userData.annee })}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md='6' sm='12'>
//               <FormGroup>
//                 <Label for='couleur'>Color</Label>
//                 <Input
//                   type='text'
//                   name='couleur'
//                   id='couleur'
//                   placeholder='couleur'
//                   value={userData.couleur}
//                   onChange={handleInputChange}
//                   className={classnames({ 'is-invalid': !userData.couleur })}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md='6' sm='12'>
//               <FormGroup>
//                 <Label for='matricule'>Registration Number</Label>
//                 <Input
//                   type='text'
//                   name='matricule'
//                   id='matricule'
//                   placeholder='985-526585'
//                   value={userData.matricule}
//                   onChange={handleInputChange}
//                   className={classnames({ 'is-invalid': !userData.matricule })}
//                 />
//               </FormGroup>
//             </Col>
//             <Col  md='6' sm='12'>
//             <FormGroup>
//           <Label for='statut'>status</Label>
//           <Input
//             type='select'
//             name='statut'
//             id='statut'
//             value={statut}
//             onChange={(e) => setStatut(e.target.value)}
//           >
//             <option value='Disponible'>Disponible</option>
//             <option value='Indisponible'>Indisponible</option>
//           </Input>
//         </FormGroup></Col>
//             <Col md='12' sm='12'>
//               <FormGroup>
//                 <Label for='description'> Description</Label>
//                 <Input
//                    type="textarea"
//                   name='description'
//                   id='description'
//                   placeholder='985-526585'
//                   value={userData.description}
//                   onChange={handleInputChange}
//                   className={classnames({ 'is-invalid': !userData.description })}
//                 />
//               </FormGroup>
//             </Col>
//             <Col sm='12'>
//               <FormGroup className='d-flex mb-0'>
//                 <Button.Ripple className='mr-1' color='primary' type='submit' >
//                   Submit
//                 </Button.Ripple>
//                 <Button.Ripple outline color='secondary' type='reset'  onClick={handleCancel}>
//                   Reset
//                 </Button.Ripple>
//               </FormGroup>
//             </Col>
//           </Row>
//         </Form>
//       </CardBody>
//     </Card>
//   )
// }

const Wishlist = () => {
  const location = useLocation()
  const { pathname, search } = location
  const url = pathname + search
  const id = parseInt(pathname.split('/').pop())
  console.log('Current URL:', url)
  console.log('Extracted ID:', id)
  const history = useHistory()

  const dispatch = useDispatch()
  const store = useSelector(state => state.cars)
  console.log('store', store)
  const [img, setImg] = useState(null)
  
  useEffect(() => {
    dispatch(getCar(id))
  }, [dispatch, id])
  
  console.log('selectedUser', store.selectedUser)

  const [userData, setUserData] = useState({
    marque: '',
    modele: '',
    couleur: '',
    statut: 'Available',
    annee: '',
    matricule: '',
    description: '',
    image: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value
    })
  }

  useEffect(() => {
    if (store.selectedUser) {
      setUserData({
        marque: store.selectedUser.marque || '',
        modele: store.selectedUser.modele || '',
        matricule: store.selectedUser.matricule || '',
        description: store.selectedUser.description || '',
        couleur: store.selectedUser.couleur || '',
        statut: store.selectedUser.statut || 'Available',
        annee: store.selectedUser.annee || '',
        image: store.selectedUser.image || ''
      })
    }
  }, [store.selectedUser])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log('id', id)
      await dispatch(putCar(id, userData))
      console.log('Car updated successfully!')
      history.push('/apps/ecommerce/shop')
    } catch (error) {
      console.error('Failed to update car:', error)
    }
  }

  const handleCancel = () => {
    history.push('/apps/ecommerce/shop')
  }

  if (!store.selectedUser) {
    return null
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
        setUserData({
          ...userData,
          image: response
        })
      } catch (error) {
        console.error('Failed to upload image:', error)
      }
    }
    reader.readAsDataURL(file)
  }

  const renderUserAvatar = () => {
    const imageUrl = userData.image ? `http://localhost:3001/assets/${userData.image}` : ''
    return (
      <img
        className='user-avatar rounded mr-2 my-25 cursor-pointer'
        src={img || imageUrl}
        alt='user profile avatar'
        height='90'
        width='90'
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Edit Car</CardTitle>
      </CardHeader>
      <CardBody>
        <Media className='mb-2'>
          {renderUserAvatar()}
          <Media className='mt-50' body>
            <div className='d-flex flex-wrap mt-1 px-0'>
              <Button.Ripple id='change-img' tag={Label} className='mr-75 mb-0' color='primary'>
                <span className='d-none d-sm-block'>Change</span>
                <span className='d-block d-sm-none'>
                  <Edit size={14} />
                </span>
                <input type='file' hidden id='change-img' onChange={onChange} accept='image/*' />
              </Button.Ripple>
            </div>
          </Media>
        </Media>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='marque'>Brand</Label>
                <Input
                  type='text'
                  name='marque'
                  id='marque'
                  placeholder='marque'
                  value={userData.marque}
                  onChange={handleInputChange}
                  className={classnames({ 'is-invalid': !userData.marque })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='modele'>Model</Label>
                <Input
                  type='text'
                  name='modele'
                  id='modele'
                  placeholder='modele'
                  value={userData.modele}
                  onChange={handleInputChange}
                  className={classnames({ 'is-invalid': !userData.modele })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='annee'>Year</Label>
                <Input
                  type='number'
                  name='annee'
                  id='annee'
                  placeholder='annee'
                  value={userData.annee}
                  onChange={handleInputChange}
                  className={classnames({ 'is-invalid': !userData.annee })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='couleur'>Color</Label>
                <Input
                  type='text'
                  name='couleur'
                  id='couleur'
                  placeholder='couleur'
                  value={userData.couleur}
                  onChange={handleInputChange}
                  className={classnames({ 'is-invalid': !userData.couleur })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='matricule'>Registration Number</Label>
                <Input
                  type='text'
                  name='matricule'
                  id='matricule'
                  placeholder='985-526585'
                  value={userData.matricule}
                  onChange={handleInputChange}
                  className={classnames({ 'is-invalid': !userData.matricule })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='statut'>Status</Label>
                <Input
                  type='select'
                  name='statut'
                  id='statut'
                  value={userData.statut}
                  onChange={(e) => setUserData({ ...userData, statut: e.target.value })}
                >
                  <option value='Available'>Available</option>
                  <option value='Unavailable'>Unavailable</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md='12' sm='12'>
              <FormGroup>
                <Label for='description'>Description</Label>
                <Input
                  type='textarea'
                  name='description'
                  id='description'
                  placeholder='Description'
                  value={userData.description}
                  onChange={handleInputChange}
                  className={classnames({ 'is-invalid': !userData.description })}
                />
              </FormGroup>
            </Col>
            <Col sm='12'>
              <FormGroup className='d-flex mb-0'>
                <Button.Ripple className='mr-1' color='primary' type='submit'>
                  Submit
                </Button.Ripple>
                <Button.Ripple outline color='secondary' type='reset' onClick={handleCancel}>
                  Reset
                </Button.Ripple>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}
export default Wishlist
