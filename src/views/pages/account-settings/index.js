import { Fragment, useState, useEffect } from 'react'
import Tabs from './Tabs'
import axios from 'axios'
import InfoTabContent from './InfoTabContent'
import Breadcrumbs from '@components/breadcrumbs'
import SocialTabContent from './SocialTabContent'
import GeneralTabContent from './GeneralTabContent'
import PasswordTabContent from './PasswordTabContent'
import NotificationsTabContent from './NotificationsTabContent'
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

import { getUser } from '../../apps/user/store/action'
const AccountSettings = () => {
  const location = useLocation()
  const { pathname, search } = location
  const url = pathname + search
  const [activeTab, setActiveTab] = useState('1')
  const dispatch = useDispatch()
  const id = parseInt(pathname.split('/').pop())
  console.log('Current URL:', url)
  console.log('Extracted ID:', id)
  const store = useSelector(state => state.users)
  useEffect(() => {
    console.log('Dispatching getUser with ID:', id)
    dispatch(getUser(id))
  }, [dispatch, id])

  useEffect(() => {

    if (store) {
      console.log('User Data:', store)
    }
  }, [store])
  const toggleTab = tab => {
    setActiveTab(tab)
  }
  return (
    <Fragment>
         {store.selectedUser !== null && store.selectedUser !== undefined ? (
        <Row>
          <Col className='mb-2 mb-md-0' md='3'>
            <Tabs activeTab={activeTab} toggleTab={toggleTab} />
          </Col>
          <Col md='9'>
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='1'>
                    <GeneralTabContent  selectedUser={store.selectedUser}/>
                  </TabPane>
                   <TabPane tabId='2'>
                    <PasswordTabContent  data={store.selectedUser} />
                  </TabPane>
                 {/* <TabPane tabId='3'>
                    <InfoTabContent  data={store.selectedUser} />
                  </TabPane>
                  <TabPane tabId='4'>
                    <SocialTabContent  data={store.selectedUser} />
                  </TabPane>
                  <TabPane tabId='5'>
                    <NotificationsTabContent  data={store.selectedUser} />
                  </TabPane> */}
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  )
}
export default AccountSettings
