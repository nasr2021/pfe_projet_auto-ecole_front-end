// ** React Import
import { useState, useEffect } from 'react'
import { Edit } from 'react-feather'

// ** Custom Components
import Sidebar from '@components/sidebar'
import Avatar from '@components/avatar'
// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, Form, Input } from 'reactstrap'
import Select, { components } from 'react-select'
// ** Store & Actions
import { addUser, uploadImg, getPermi } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'


const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [role, setRole] = useState('candidat') // Default role is set to 'candidat'
  const [img, setImg] = useState(null)
  const [idPermi, setPermi] = useState('')
  // ** Store Vars
  const dispatch = useDispatch()
  useEffect(() => { 
    dispatch(getPermi())
  }, [dispatch])
  const permi = useSelector((state) => state.users.permi) || []
console.log('permi', permi)

const permisOptions = permi && permi.length > 0 ? permi.map((permis) => ({
  value: permis.idPermi,
  label: permis.type
})) : []
  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async (values) => {
    const selectedPermis = idPermi[0]
    if (Object.keys(errors).length === 0) {
      toggleSidebar()
      const userData = {
        nom: values['nom'],
        prenom: values['prenom'],
        email: values['email'],
        numero_telephone1: values['numero-telephone1'],
        numero_telephone2: values['numero-telephone2'],
        genre: values['genre'],
        emploi: role,
        adresse: values['adress'],
        avatar: img,
        idPermi:selectedPermis ? selectedPermis.value : null
      }

      console.log('User data to be added:', userData)
      dispatch(addUser(userData))
    }
  }
  const onChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await dispatch(uploadImg(formData))
        setImg(response)
      } catch (error) {
        console.error('Failed to upload image:', error)
      }
    }
  }
  const GuestsComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props} >
        <div className='d-flex flex-wrap align-items-center'>
   
          <div>{data.label}</div>
        </div>
      </components.Option>
    )
  }
  const renderUserAvatar = () => {
    if (!img) {
      const stateNum = Math.floor(Math.random() * 6)
      const states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary']
      const color = states[stateNum]

      return (
        <Avatar
          className='rounded mr-2 my-25'
          img={img} // Use img here for the avatar source
          content={img || 'John Doe'}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '90px',
            width: '90px'
          }}
        />
      )
    } else {
      return (
        <img
          className='user-avatar rounded mr-2 my-25 cursor-pointer'
          src={img}
          alt='user profile avatar'
          height='90'
          width='90'
        />
      )
    }
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='New User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
           {/* <Media className='mb-2'>
        {renderUserAvatar()}
        <Media className='mt-50' body>
          <div className='d-flex flex-wrap mt-1 px-0'>
       
            <input type='file' id='change-img' onChange={onChange} accept='image/*' style={{ display: 'none' }} />
            <label htmlFor='change-img'>
              <Button.Ripple tag='span' className='mr-75 mb-0' color='primary'>
                <span className='d-none d-sm-block'>Change</span>
                <span className='d-block d-sm-none'>
                  <Edit size={14} />
                </span>
              </Button.Ripple>
            </label>
          </div>
        </Media>
      </Media> */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='nom'>
            First Name <span className='text-danger'>*</span>
          </Label>
          <Input
            name='nom'
            id='nom'
            placeholder='John'
            innerRef={register({ required: true })}
            className={errors['nom'] ? 'is-invalid' : ''}
          />
        </FormGroup>
        <FormGroup>
          <Label for='prenom'>
            Last Name <span className='text-danger'>*</span>
          </Label>
          <Input
            name='prenom'
            id='prenom'
            placeholder='Doe'
            innerRef={register({ required: true })}
            className={errors['prenom'] ? 'is-invalid' : ''}
          />
        </FormGroup>
        <FormGroup>
          <Label for='email'>
            E-mail <span className='text-danger'>*</span>
          </Label>
          <Input
            type='email'
            name='email'
            id='email'
            placeholder='john.doe@example.com'
            innerRef={register({ required: true })}
            className={errors['email'] ? 'is-invalid' : ''}
          />
        </FormGroup>
        <FormGroup>
          <Label for='numero-telephone1'>
            Phone <span className='text-danger'>*</span>
          </Label>
          <Input
            name='numero-telephone1'
            id='numero-telephone1'
            placeholder='(397) 294-5153'
            innerRef={register({ required: true })}
            className={errors['numero-telephone1'] ? 'is-invalid' : ''}
          />
        </FormGroup>
        <FormGroup>
          <Label for='numero-telephone2'>Numéro de téléphone 2</Label>
          <Input name='numero-telephone2' id='numero-telephone2' placeholder='(397) 294-5154' innerRef={register} />
        </FormGroup>
        <FormGroup>
          <Label for='genre'>Genre</Label>
          <Input type='select' name='genre' id='genre' innerRef={register({ required: true })}>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for='emploi'>Role (Role)</Label>
          <Input
            type='select'
            name='emploi'
            id='emploi'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value='candidat'>candidat</option>
            <option value='moniteur'>moniteur</option>
          </Input>
        </FormGroup>
        <FormGroup className="mt-3">
            <Label for='idPermi'>Permi</Label>
            <Select
              
              id='idPermi'
              className='react-select'
              classNamePrefix='select'
              isClearable={false}
              options={permisOptions}
              value={idPermi}
              onChange={e => setPermi([e])}
              components={{
                Option: GuestsComponent
              }}
          
            />
          </FormGroup>
        <FormGroup>
          <Label for='adress'>
            Adress <span className='text-danger'>*</span>
          </Label>
          <Input
            name='adress'
            id='adress'
            placeholder='123 Main St, Springfield, IL, 62701'
            innerRef={register({ required: true })}
            className={errors['adress'] ? 'is-invalid' : ''}
          />
        </FormGroup>

        <Button type='submit' className='mr-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
