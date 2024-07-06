import { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'
import CompanyTable from './CompanyTable'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
import EarningsMang from './EarningsMang'
import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import Timeline from '@components/timeline'
import { List } from 'react-feather'
import Orders from './order'
import { useDispatch, useSelector } from 'react-redux'
import User from './user'

import { getEvent } from '../../apps/calendar/store/actions'
import { getStatestique, getOrder, getstatEvent, getStatestiqueSuperAdmin, getOrderSuperAdmin, getstatUser, getUser, getUserStats } from '../../../redux/actions/statestique'
const EcommerceDashboard = () => {

  const { colors } = useContext(ThemeColors),
    trackBgColor = '#e9ecef'
    const [role, setRole] = useState('')
    const [connect, setConnect] = useState('')
    const [idUser, setidUser] = useState('')
    const [idRole, setidRole] = useState('')
    useEffect(() => {
      const storedidUseridRole = sessionStorage.getItem('idRole')
      console.log('idRole', storedidUseridRole)
      const storedidUser = sessionStorage.getItem('idUser')
      console.log('idUser', storedidUser)
      const storedConnect = sessionStorage.getItem('connect')
      console.log('connect', storedConnect)
      const storedRole = sessionStorage.getItem('role')
      if (storedRole) {
        setRole(storedRole)
      }  
      setidRole(storedidUseridRole)
        setidUser(storedidUser)
        setConnect(storedConnect)  
    }, [])
const dispatch = useDispatch()
    useEffect(() => {
      console.log("Fetching data...")
      if (role !== 'manager') {
        dispatch(getStatestique())
      }   
      dispatch(getStatestiqueSuperAdmin())
      dispatch(getEvent())
      if (idUser && idRole) {
        console.log(" data...")
        dispatch(getUserStats(idUser, idRole))
      }
      // dispatch(getUserStats(idUser, idRole))
      dispatch(getOrder())
      dispatch(getstatEvent())
      dispatch(getOrderSuperAdmin())
      dispatch(getstatUser())
      dispatch(getUser(idUser, idRole))
    }, [dispatch, idUser, idRole, role])

    const selectedUser = useSelector(state => state.users.selectedUser) || []
    const revenu = useSelector((state) => state.statistiques.statsData) || []
    const statestique = useSelector((state) => state.statistiques.allData) || []
     const statestiqueSuperAdmin = useSelector((state) => state.statistiques.superadmin) || []
    const eventStat = useSelector((state) => state.statistiques.statEvent) || []
    const user = useSelector((state) => state.statistiques.user) || []
    const OrderSuperAdmin = useSelector((state) => state.statistiques.superorder) || []
    const order = useSelector((state) => state.statistiques.order) || []
    const event = useSelector((state) => state.calendar.eventData) || []

    useEffect(() => {
      console.log('revenu', revenu)
   console.log('selectedUser', selectedUser)
    }, [event, revenu, selectedUser, statestique, order, eventStat, statestiqueSuperAdmin, user])
   
    const data = event ? event.map(row => ({
      title: row.nom_evenement,
      selector: 'nom_evenement',
      content: row.moniteur && row.moniteur.user ? row.moniteur.user.username : '',
      meta: `${new Date(row.date_debut).toLocaleString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })} - ${new Date(row.date_fin).toLocaleString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })}`,
      metaClassName: 'mr-1',
      color: 'info'
    })) : []
    
    console.log('data', data)

  return (
    <div id='dashboard-ecommerce'>
        {connect !== 1 ? (

<Row className='match-height'>
<Col xl='12' md='12' xs='12'>
    <StatsCard cols={{ xl: '3', sm: '6' }} statsData={selectedUser}/>
  </Col>
</Row>
) : (<Row className='match-height'>
<Col xl='4' md='6' xs='12'>
<CardCongratulations />
</Col>
<Col xl='8' md='6' xs='12'>
  <StatsCard cols={{ xl: '3', sm: '6' }} statsData={selectedUser}/>
</Col>
</Row>)}
{(role !== 'candidat' && role !== 'moniteur') && (<Row className='match-height'>
        <Col lg='4' md='12'>
          <Row className='match-height'>
            <Col lg='6' md='3' xs='6'>
            {role === 'manager' ? (<><Orders OrderSuperAdmin={OrderSuperAdmin} warning={colors.warning.main} /></>) : (<> <OrdersBarChart order={order} warning={colors.warning.main} /></>)}
            </Col>
            <Col lg='6' md='3' xs='6'>
            {role === 'manager' ? (<><User user={user} info={colors.info.main} /></>) : (<><ProfitLineChart eventStat={eventStat} info={colors.info.main} /></>)}
            </Col>
            <Col lg='12' md='6' xs='12'>
            {role === 'manager' ? (
  <EarningsMang statestiqueSuperAdmin={statestiqueSuperAdmin} success={colors.success.main} />
) : (
  <Earnings statestique={statestique} success={colors.success.main} />
)}

            {/* {role === 'ecole' ? (<><Earnings statestique={statestique} success={colors.success.main} /></>) : (<><EarningsMang statestiqueSuperAdmin={statestiqueSuperAdmin} success={colors.success.main} /></>)} */}
            </Col>
          </Row>
        </Col>
       <Col lg='8' md='12'>
       <RevenueReport primary={colors.primary.main} warning={colors.warning.main} revenu={revenu} />
        </Col>
      </Row>)}
      {role === 'candidat' && (<Row className='match-height'>
        <Col lg='4' md='12'>
          <Row className='match-height'>
            <Col lg='6' md='5' xs='6'>
            {role === 'manager' ? (<><Orders OrderSuperAdmin={OrderSuperAdmin} warning={colors.warning.main} /></>) : (<> <OrdersBarChart order={order} warning={colors.warning.main} /></>)}
            </Col>
            <Col lg='6' md='7' xs='6'>
            {role === 'manager' ? (<><User user={user} info={colors.info.main} /></>) : (<><ProfitLineChart eventStat={eventStat} info={colors.info.main} /></>)}
            </Col>
          </Row>
        </Col>
       <Col lg='8' md='12'>
       <RevenueReport primary={colors.primary.main} warning={colors.warning.main} revenu={revenu} />
        </Col>
      </Row>)}

      {role === 'moniteur' && (<Row className='match-height'>
        <Col lg='12' md='12'>
          <Row className='match-height'>
            <Col lg='6' md='5' xs='6'>
            {role === 'manager' ? (<><Orders OrderSuperAdmin={OrderSuperAdmin} warning={colors.warning.main} /></>) : (<> <OrdersBarChart order={order} warning={colors.warning.main} /></>)}
            </Col>
            <Col lg='6' md='7' xs='6'>
            {role === 'manager' ? (<><User user={user} info={colors.info.main} /></>) : (<><ProfitLineChart eventStat={eventStat} info={colors.info.main} /></>)}
            </Col>
           
          </Row>
        </Col>
      </Row>)}
      <Row className='match-height'>
      {role !== 'manager' ? (<Col lg='12' xs='12'>
          <Card className='card-user-timeline'>
            <CardHeader>
              <div className='d-flex align-items-center'>
                <List className='user-timeline-title-icon' />
                <CardTitle tag='h4'>User Timeline</CardTitle>
              </div>
            </CardHeader>
            <CardBody>
            {data.length > 0 ? (<Timeline className='ml-50 mb-0' data={data} />) : (<div className='d-flex justify-content-center mt-2'><p>Aucun événement</p></div>)}
            </CardBody>
          </Card>
        </Col>) : (null)}
          {/* <Col lg='6' md='12' xs='12'> 
        <CardTransactions />
        </Col>   */}

      </Row>
      
      <Row className='match-height'>
        <Col lg='12' xs='12'> {(role === 'ecole' || role === 'manager') ? (<><CompanyTable /></>) : (null)}</Col>
      </Row>
    
    </div>
  )
}

export default EcommerceDashboard
