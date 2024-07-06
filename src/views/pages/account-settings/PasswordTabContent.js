import * as yup from 'yup'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Label, Input, FormGroup, Row, Col, Button, Alert } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import { updatePasswordWithOTP, otp } from '../../apps/user/store/action'
import { useLocation, useHistory  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
const PasswordTabContent = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()
  const { pathname } = location
  const id = parseInt(pathname.split('/').pop())

  const { handleSubmit, formState: { errors }, reset, control } = useForm()
  
  const [alertMessage, setAlertMessage] = useState('')
  const [userData, setUserData] = useState({
    idUser: id,
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
    otp: ''
  })

  useEffect(() => {
    console.log('Generating OTP')
    dispatch(otp())
  }, [dispatch, id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value
    })
  }

  const onSubmit = async (formData) => {
    try {
      // Vérification que les mots de passe correspondent
      if (userData.newPassword !== userData.newPasswordConfirm) {
        // Affichage d'une alerte si les mots de passe ne correspondent pas
        setAlertMessage('The passwords do not match.')
        return
      }

      // Vérification que le nouveau mot de passe a au moins 4 caractères
      if (userData.newPassword.length < 4) {
        // Affichage d'une alerte si le mot de passe est trop court
        setAlertMessage('The new password must be at least 4 characters long.')
        return
      }

      await dispatch(updatePasswordWithOTP(userData))
      history.push('/dashboard/ecommerce')
      console.log('Password updated successfully!')
      reset() // Réinitialiser le formulaire après la soumission réussie
    } catch (error) {
      console.error('Failed to update password:', error)
      // Gestion des erreurs de soumission du formulaire
      // Vous pouvez ajouter ici la logique pour afficher les erreurs ou notifier l'utilisateur
    }
  }

  const handleReset = () => {
    history.push('/dashboard/ecommerce')
  }


  return (
    <div>
      {alertMessage && (
        <Alert color='danger'>
          <h4 className='alert-heading'>Erreur</h4>
          <div className='alert-body'>
            {alertMessage}
          </div>
        </Alert>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm='6'>
            <FormGroup>
              <Label for='oldPassword'>Ancien mot de passe</Label>
              <InputPasswordToggle
                name='oldPassword'
                value={userData.oldPassword}
                onChange={handleInputChange}
                invalid={!!errors.oldPassword}
                className={classnames('input-group-merge', {
                  'is-invalid': errors.oldPassword
                })}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='otp'>OTP</Label>
              <Input
                type='text'
                id='otp'
                name='otp'
                value={userData.otp}
                onChange={handleInputChange}
                className={classnames('input-group-merge', {
                  'is-invalid': errors.otp
                })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm='6'>
            <FormGroup>
              <Label for='newPassword'>Nouveau mot de passe</Label>
              <InputPasswordToggle
                name='newPassword'
                value={userData.newPassword}
                onChange={handleInputChange}
                invalid={!!errors.newPassword}
                className={classnames('input-group-merge', {
                  'is-invalid': errors.newPassword
                })}
              />
              {errors.newPassword && <div className='invalid-feedback'>{errors.newPassword.message}</div>}
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='newPasswordConfirm'>Confirmer le nouveau mot de passe</Label>
              <InputPasswordToggle
                name='newPasswordConfirm'
                value={userData.newPasswordConfirm}
                onChange={handleInputChange}
                invalid={!!errors.newPasswordConfirm}
                className={classnames('input-group-merge', {
                  'is-invalid': errors.newPasswordConfirm
                })}
              />
              {errors.newPasswordConfirm && <div className='invalid-feedback'>{errors.newPasswordConfirm}</div>}
            </FormGroup>
          </Col>
          <Col className='mt-1' sm='12'>
            <Button.Ripple type='submit' className='mr-1' color='primary'>
              Enregistrer
            </Button.Ripple>
            <Button.Ripple color='secondary' outline onClick={handleReset}>
              Annuler
            </Button.Ripple>
          </Col>
        </Row>
      </Form>
    </div>
  )
}


export default PasswordTabContent
