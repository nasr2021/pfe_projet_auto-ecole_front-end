import { useEffect, useState } from 'react'
import Sidebar from '@components/sidebar'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, Input, CustomInput } from 'reactstrap'

const SidebarEdit = ({ opens, toggleSidebars, handleEditUser, user }) => {
  const { register, errors, handleSubmit, setValue } = useForm()
  const [status, setStatus] = useState(false)
console.log('user', user.selectedUser)
  useEffect(() => {
    if (user.selectedUser) {
      setValue('nom', user.selectedUser.nom)
      setValue('adresse', user.selectedUser.adresse)
      setValue('ville', user.selectedUser.ville)
      setValue('code_postal', user.selectedUser.code_postal)
      setValue('pays', user.selectedUser.pays)
      setValue('telephone', user.selectedUser.telephone)
      setValue('email', user.selectedUser.email)
      setValue('status', user.selectedUser.status)

      // Set the switch status based on user selected status
      setStatus(user.selectedUser.status === 'authorized')
    }
  }, [user.selectedUser, setValue])

  const onSubmit = (values) => {
    if (Object.keys(errors).length === 0) {
      toggleSidebars()
      const updatedUser = {
        ...user.selectedUser,
        nom: values.nom,
        adresse: values.adresse,
        ville: values.ville,
        code_postal: values.code_postal,
        pays: values.pays,
        telephone: values.telephone,
        email: values.email,
        status: status ? 'authorized' : 'unauthorized'
      }
      handleEditUser(updatedUser)
    }
  }
  return (
    <Sidebar size='lg' open={opens} title='Edit User' headerClassName='mb-1' contentClassName='pt-0' toggleSidebar={toggleSidebars}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='nom'>
            First Name <span className='text-danger'>*</span>
          </Label>
          <Input
            name='nom'
            id='nom'
            placeholder='John'
            innerRef={register({ required: true })}
            className={errors.nom ? 'is-invalid' : ''}
          />
        </FormGroup>
        <FormGroup>
          <Label for='adresse'>Address</Label>
          <Input
            name='adresse'
            id='adresse'
            placeholder='123 Main St, Springfield, IL, 62701'
            innerRef={register({ required: true })}
            className={errors.adresse ? 'is-invalid' : ''}
          />
        </FormGroup>
        <FormGroup>
          <Label for='ville'>City</Label>
          <Input
            name='ville'
            id='ville'
            placeholder='City'
            innerRef={register({ required: true })}
            className={errors.ville ? 'is-invalid' : ''}
          />
        </FormGroup>
        <FormGroup>
          <Label for='code_postal'>Postal Code</Label>
          <Input
            name='code_postal'
            id='code_postal'
            placeholder='Postal Code'
            innerRef={register({ required: true })}
            className={errors.code_postal ? 'is-invalid' : ''}
          />
        </FormGroup>
        <FormGroup>
          <Label for='pays'>Country</Label>
          <Input
            name='pays'
            id='pays'
            placeholder='Country'
            innerRef={register({ required: true })}
            className={errors.pays ? 'is-invalid' : ''}
          />
        </FormGroup>
        <FormGroup>
          <Label for='telephone'>Phone</Label>
          <Input
            name='telephone'
            id='telephone'
            placeholder='(397) 294-5153'
            innerRef={register({ required: true })}
            className={errors.telephone ? 'is-invalid' : ''}
          />
        </FormGroup>
        <FormGroup>
          <Label for='email'>E-mail</Label>
          <Input
            type='email'
            name='email'
            id='email'
            placeholder='john.doe@example.com'
            innerRef={register({ required: true })}
            className={errors.email ? 'is-invalid' : ''}
          />
        </FormGroup>
        <FormGroup>
          <CustomInput
            type='switch'
            id='status'
            name='status'
            label='Status'
            checked={status}
            onChange={() => setStatus(!status)}
            inline
          />
        </FormGroup>
        <Button type='submit' className='mr-1' color='primary'>
          Submit
        </Button>
        <Button type='button' color='secondary' outline onClick={toggleSidebars}>
          Cancel
        </Button>
      </form>
    </Sidebar>
  )
}

export default SidebarEdit
