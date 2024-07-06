import { Media, Card, CardHeader, CardTitle, CardBody, FormGroup, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import { isObjEmpty } from '@utils'
import Avatar from '@components/avatar'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addCar } from '../../../redux/actions/cars'
import { useHistory } from 'react-router-dom'
import { uploadImg } from '../../apps/user/store/action'
import { useState } from 'react'
import { Edit } from 'react-feather'
const MultipleColumnForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [img, setImg] = useState(null)
  const { register, errors, handleSubmit } = useForm()

  const handleCancel = () => {
    history.push('/apps/ecommerce/shop')
  }

  const onSubmit = async (values) => {
    if (isObjEmpty(errors)) {
      const userData = {
        marque: values['marque'],
        modele: values['modele'],
        annee: values['annee'],
        couleur: values['couleur'],
        statut: values['statut'],
        matricule: values['matricule'],
        description: values['description'],
        image: img 
      }

      try {
        await dispatch(addCar(userData))
        history.push('/apps/ecommerce/shop')
      } catch (error) {
        console.error('Failed to add car:', error)
      }
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
        setImg(response)
      } catch (error) {
        console.error('Failed to upload image:', error)
      }
    }

    reader.readAsDataURL(file) 
  }

  const renderUserAvatar = () => {
    const imageUrl = img ? `http://localhost:3001/assets/${img}` : ''
  

      return (
       <img
        className='user-avatar rounded mr-2 my-25 cursor-pointer'
          src={imageUrl} 
          alt='Car profile avatar'
        height='90'
        width='90'
        />
      )
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Add Car</CardTitle>
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

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='marque'>Brand</Label>
                <Input
                  type='text'
                  name='marque'
                  id='marque'
                  placeholder='Brand'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['marque'] })}
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
                  placeholder='Modele'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['modele'] })}
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
                  placeholder='Year'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['annee'] })}
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
                  placeholder='Color'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['couleur'] })}
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
                  placeholder='Registration Number'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['matricule'] })}
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
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['statut'] })}
                  defaultValue='Available'
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
                  innerRef={register({ required: false })}
                  className={classnames({ 'is-invalid': errors['description'] })}  />
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

export default MultipleColumnForm
