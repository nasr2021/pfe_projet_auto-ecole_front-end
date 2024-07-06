// ** React Imports

import { useLocation, Link } from 'react-router-dom'

import UILoader from '@components/ui-loader'

// ** Store & Actions
import { getUser } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap
import { Row, Col, Alert } from 'reactstrap'


// ** User View Components
import PlanCard from './PlanCard'
import UserInfoCard from './UserInfoCard'
import UserTimeline from './UserTimeline'
import InvoiceList from '../../invoice/list'
import PermissionsTable from './PermissionsTable'
import axios from 'axios'
import AvgSessions from '../../../ui-elements/cards/analytics/AvgSessions'
import ProfileAbout from '../../../pages/profile/ProfileAbout'
// ** Styles
import '@styles/react/apps/app-users.scss'
import { useState, useEffect } from 'react'
const UserView = props => {
  // ** Vars
  const location = useLocation()
  const { pathname, search } = location
  const url = pathname + search
  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  const id = parseInt(pathname.split('/').pop())
  const [role, setRole] = useState('')

  useEffect(() => {
    setRole(sessionStorage.getItem('role'))
  }, [])
  useEffect(() => {
    console.log('Dispatching getUser with ID:', id)
    dispatch(getUser(id))
  }, [dispatch, id])
  const selectedUser = useSelector(state => state.users.selectedUser)
  useEffect(() => {

    if (selectedUser) {
      console.log('User Data:', selectedUser)
    }
  }, [selectedUser])
  useEffect(() => {
    axios.get('/profile/data').then(response => setData(response.data))
  }, [])
  return selectedUser !== null && selectedUser !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='6' lg='6' md='12'>
         <ProfileAbout role={role} data={selectedUser} /> 
        </Col>
        {/* <Col xl='3' lg='4' md='5'>
          <PlanCard selectedUser={selectedUser} />
        </Col> */}
      {/* </Row>
      <Row> */}
       {role === 'ecole' && (<Col xl='6' lg='6' md='12'>
          <UserTimeline id={id} className='h-100'/>
        </Col>)}
        {/* <Col md='6'>
       
        </Col> */}
      </Row>
      {(role === 'ecole' && selectedUser.emploi !== 'moniteur') && (<AvgSessions data={selectedUser}/>)}
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link>
      </div>
    </Alert>
  )
}
export default UserView
