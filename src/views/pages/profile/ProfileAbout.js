import { Card, CardBody, CardText, Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
const ProfileAbout = ({ role, data }) => {
  const [id, setId] = useState('')

  useEffect(() => {
    setId(sessionStorage.getItem('idUser'))
  }, [])
  console.log('idddd', id)
  const history = useHistory()
  const handleReset = () => {
    history.push('/apps/user/list')
  }
  return (
    <Card>
      <CardBody>
        <h5 className='mb-75'>About</h5>
        <CardText>{data.description}</CardText>
        
        <div className='mt-2'>
          <h5 className='mb-75'>CIN:</h5>
          <CardText>{data.cin}</CardText>
        </div>
        
        <div className='mt-2'>
          <h5 className='mb-75'>Phone:</h5>
          <CardText>{data.numero_telephone1}</CardText>
          <CardText>{data.numero_telephone2}</CardText>
        </div>
        
        <div className='mt-2'>
          <h5 className='mb-75'>Email:</h5>
          <CardText>{data.email}</CardText>
        </div>
        
        <div className='mt-2'>
          <h5 className='mb-75'>Gender:</h5>
          <CardText>{data.genre}</CardText>
        </div>
        
        <div className='mt-2'>
          <h5 className='mb-75'>Address:</h5>
          <CardText>{data.adresse}</CardText>
        </div>

        {/* Conditions basées sur le rôle et le type d'emploi */}
        {role === 'ecole' && data.emploi === 'candidat' && (
          <>
            <div className='mt-2'>
              <h5 className='mb-75'>Code hours:</h5>
              <CardText>{data.nombre_heures_code}</CardText>
            </div>
            <div className='mt-2'>
              <h5 className='mb-75'>Drive hours:</h5>
              <CardText>{data.nombre_heures_conduit}</CardText>
            </div>
            <div className='mt-2'>
              <h5 className='mb-75'>Drive count:</h5>
              <CardText>{data.nombre_fois_conduit}</CardText>
            </div>
            <div className='mt-2'>
              <h5 className='mb-75'>Code frequency:</h5>
              <CardText>{data.nombre_fois_code}</CardText>
            </div>
          </>
        )}

        {/* Bouton de réinitialisation uniquement visible si l'utilisateur actuel ne correspond pas à l'utilisateur sélectionné */}
        {id !== data.idUser && (
          <Button.Ripple color='secondary' className='mt-2' outline onClick={handleReset}>
            Return
          </Button.Ripple>
        )}
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
