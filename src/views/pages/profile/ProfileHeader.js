import { useState } from 'react'
import { AlignJustify, Rss, Info, Image, Users, Edit } from 'react-feather'
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap'
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
// ** Custom Components
import Avatar from '@components/avatar'
const ProfileHeader = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const renderClient = (data) => {
    const stateNum = Math.floor(Math.random() * 6)
    const states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary']
    const color = states[stateNum]
    const imageUrl = `http://localhost:3001/assets/${data.avatar}`
    
    console.log('row.avatar', data.avatar)
    console.log('imageUrl', imageUrl)
  
    return (
      // <img className='rounded img-fluid'  initials  color={color || 'primary'}  content={data.avatar || data.username} src={imageUrl} alt='image' /> 
      <Avatar
      style={{
        height: '8.92rem',
        width: '8.92rem'
      }}
        color={color || 'primary'}
        className='rounded img-fluid' 
        // img={imageUrl}
        content={imageUrl || data.username}
        initials
      />
    )
  }
  return (
    <Card className='profile-header mb-2'>
      <CardImg  src="https://tse2.mm.bing.net/th?id=OIP.t8wMR8J_3gr3WVBFH8t2uAHaEb&pid=Api&P=0&h=180"   style={{ maxHeight: '200px' }} alt='User Profile Image' top />
      <div className='position-relative'>
        <div className='profile-img-container d-flex align-items-center'>
          <div className='profile-img'>
          {renderClient(data)}
            {/* <img className='rounded img-fluid' src={defaultAvatar} alt='Card image' /> */}
          </div>
          <div className='profile-title ml-3'>
            <h2 className='text-white'>{data.username} </h2>
            <p className='text-white'>{data.emploi}</p>
          </div>
        </div>
      </div>
      <div className='profile-header-nav'>
        <Navbar className='justify-content-end justify-content-md-between w-100' expand='md' light>
          <Button color='' className='btn-icon navbar-toggler' >
            <AlignJustify size={21} />
          </Button>
          {/* <Collapse isOpen={isOpen} navbar>
            <div className='profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0'>
              <Nav className='mb-0' pills>
              </Nav>
              <Button color='primary'>
                <Edit className='d-block d-md-none' size={14} />
                <span className='font-weight-bold d-none d-md-block'>Edit</span>
              </Button>
            </div>
          </Collapse> */}
        </Navbar>
      </div>
    </Card>
  )
}

export default ProfileHeader
