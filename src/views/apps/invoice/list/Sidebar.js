// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { addInvoice } from '../store/actions'
const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [role, setRole] = useState('candidat') // Par défaut, le rôle est défini sur 'candidat'
  const [plan, setPlan] = useState('basic')

  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // // ** Function to handle form submit
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      toggleSidebar()
      console.log('aaaaa')
      const userData = {
        nom: values['nom'],
        adresse: values['adresse'], 
        ville: values['ville'],
        code_postal: values['code_postal'],
        pays: values['pays'], 
        telephone: values['telephone'], 
        email: values['email'],
        matricule: values['matricule']
      
      }
      console.log('User data to be added:', userData)
      dispatch(addInvoice(userData))
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
            className={classnames({ 'is-invalid': errors['nom'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='matricule'>
          Last Name  <span className='text-danger'>*</span>
          </Label>
          <Input
            name='matricule'
            id='matricule'
            placeholder='556562'
            innerRef={register({ required: true })} 
            className={classnames({ 'is-invalid': errors['matricule'] })}
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
            className={classnames({ 'is-invalid': errors['email'] })}
          />

        </FormGroup>
        <FormGroup>
          <Label for='telephone'>
            Phone
             <span className='text-danger'>*</span>
          </Label>
          <Input
            name='telephone'
            id='telephone'
            placeholder='(397) 294-5153'
            innerRef={register({ required: true })} 
            className={classnames({ 'is-invalid': errors['telephone'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='adresse'>Adress</Label>
          <Input
            name='adresse'
            id='adresse'
            placeholder='rue 123, xxx'
            innerRef={register({ required: true })} 
          />
        </FormGroup>
      
       
        <FormGroup>
          <Label for='pays'>
          Country <span className='text-danger'>*</span>
          </Label>
          <Input
            name='pays'
            id='pays'
            placeholder='Springfield'
            innerRef={register({ required: true })} 
            className={classnames({ 'is-invalid': errors['pays'] })}
          />
        </FormGroup>
        
        <FormGroup>
          <Label for='ville'>
          City <span className='text-danger'>*</span>
          </Label>
          <Input
            name='ville'
            id='ville'
            placeholder='IL, 62701'
            innerRef={register({ required: true })} 
            className={classnames({ 'is-invalid': errors['ville'] })}
          />
        </FormGroup>
          <FormGroup>
          <Label for='code_postal'>
          Code postal <span className='text-danger'>*</span>
          </Label>
          <Input
            name='code_postal'
            id='code_postal'
            placeholder='62701'
            innerRef={register({ required: true })} 
            className={classnames({ 'is-invalid': errors['code_postal'] })}
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
