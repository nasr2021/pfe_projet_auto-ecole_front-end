import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import UILoader from '@components/ui-loader'
import ProfilePoll from './ProfilePolls'
import ProfileAbout from './ProfileAbout'
import ProfilePosts from './ProfilePosts'
import ProfileHeader from './ProfileHeader'
import { Row, Col, Button } from 'reactstrap'
import ProfileTwitterFeeds from './ProfileTwitterFeeds'
import ProfileLatestPhotos from './ProfileLatestPhotos'
import ProfileSuggestedPages from './ProfileSuggestedPages'
import ProfileFriendsSuggestions from './ProfileFriendsSuggestions'
import Breadcrumbs from '@components/breadcrumbs'
import ProfileEdit from './ProfileEdit'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../apps/user/store/action'
import '@styles/react/pages/page-profile.scss'
import { useLocation } from 'react-router-dom'

const Profile = () => {
  const location = useLocation()
  const { pathname, search } = location
  const url = pathname + search

  const [data, setData] = useState(null)
  const [block, setBlock] = useState(false)
  const dispatch = useDispatch()


  const id = parseInt(pathname.split('/').pop())

  console.log('Current URL:', url)
  console.log('Extracted ID:', id)
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

  return (
    <Fragment>
          {selectedUser !== null ? (
        <div id='user-profile'>
          <Row>
            <Col sm='12'>
              <ProfileHeader data={selectedUser} />
            </Col>
          </Row>
          <section id='profile-info'>
            <Row>
              <Col lg={{ size: 12, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>
                <ProfileAbout data={selectedUser} />

              </Col>

            </Row>
         
          </section>
        </div>
      ) : null}
    </Fragment>
  )
}

export default Profile
