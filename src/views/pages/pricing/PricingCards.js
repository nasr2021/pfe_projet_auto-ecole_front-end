import classnames from 'classnames'
import { useEffect, useState } from 'react'
import { Row, Col, Card, CardBody, CardText, Badge, ListGroup, ListGroupItem, Button } from 'reactstrap'
import UpdateEventSidebar from './UpdateEventSidbar'
import { useDispatch } from 'react-redux'
import { getPack, AcheterPack } from '../../../redux/actions/pack'
import { Edit2 } from 'react-feather'
const PricingCards = ({ data = [] }) => {
  const [role, setRole] = useState('')

  useEffect(() => {
    const storedRole = sessionStorage.getItem('role')
    if (storedRole) {
      setRole(storedRole)
    }
  }, [])

  const dispatch = useDispatch()
  const [openSidebar, setOpenSidebar] = useState(false)
  const [selectedForfait, setSelectedForfait] = useState(null)

  const handleUpdateEventSidebar = (idForfait) => {
    setSelectedForfait(idForfait)
    setOpenSidebar(true)
  }

  const handleAcheterClick = (idForfait) => {
    dispatch(AcheterPack(idForfait))
  }

  const toggleSidebar = (isOpen) => {
    setOpenSidebar(isOpen)
  }

  return (
    <Row className='pricing-card'>
      <Col className='mx-auto' sm={{ offset: 2, size: 10 }} lg={{ offset: 2, size: 10 }} md='12'>
        <Row>
          {Array.isArray(data) && data.map((item, index) => (
            <Col key={index} md='4' xs='12'>
              <Card className='text-center'>
                <CardBody>
                  {item.popular && (
                    <div className='pricing-badge text-right'>
                      <Badge color='light-primary' pill>
                        Popular
                      </Badge>
                    </div>
                  )}
                  {/* <img className='mb-2' src='/path/to/image.svg' alt='pricing svg' /> */}
                  <h3>{item.nom_forfait}</h3> 
                  <CardText>{item.subtitle}</CardText>
                  <div className='annual-plan'>
                    <div className='plan-price mt-2'>
                      <sup className='font-medium-1 font-weight-bold text-primary mr-25'>DT</sup>
                      <span className='pricing-value font-weight-bolder text-primary'>
                        {item.prix}
                      </span>
                      <span className='pricing-duration text-body font-medium-1 font-weight-bold ml-25'>/Years</span>
                    </div>
                  </div>
                  <ListGroup tag='ul' className='list-group-circle text-left mb-2'>
                    <ListGroupItem tag='li'>
                      Nombre de comptes: {item.nombre_compte}
                    </ListGroupItem>
                    <ListGroupItem tag='li'>
                      Nombre de SMS: {item.nombre_sms}
                    </ListGroupItem>
                    <ListGroupItem tag='li'>
                      Historique: {item.historique ? 'Oui' : 'Non'}
                    </ListGroupItem>
                  </ListGroup>
                  {role === 'ecole' ? (
                    <Button.Ripple
                      color='primary'
                      outline={item.nom_forfait !== 'Pack Standard'}
                      onClick={() => handleAcheterClick(item.idForfait)}
                    >
                      Buy
                    </Button.Ripple>
                  ) : (
                    <Button.Ripple className='mx-2'
                      color='primary'
                      outline={item.nom_forfait !== 'Premium'}
                      onClick={() => handleUpdateEventSidebar(item.idForfait)}
                    >
                      <Edit2/>
                    </Button.Ripple>
                  )}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
      {/* Sidebar pour mettre à jour le pack */}
      <UpdateEventSidebar
        open={openSidebar}
        handleUpdateEventSidebar={() => toggleSidebar(false)}
        idForfait={selectedForfait} // Passer l'id du forfait sélectionné à UpdateEventSidebar
      />
    </Row>
  )
}


export default PricingCards
