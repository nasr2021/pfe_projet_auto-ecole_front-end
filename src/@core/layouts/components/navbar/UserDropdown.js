// ** React Imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

const Profile = () => {

  // Reste du code...
}

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/logo/logo-primary.png'

const UserDropdown = () => {
  const dispatch = useDispatch()

  const [userData, setUserData] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [id, setUserId] = useState(null)
  const isUserLoggedIn = () => {
    return sessionStorage.getItem('user') !== null // Exemple de vérification de connexion utilisateur
  }
  useEffect(() => {
    if (isUserLoggedIn()) {
      setUserData(sessionStorage.getItem('user'))
      setUserRole(sessionStorage.getItem('role'))
      setAvatar(sessionStorage.getItem('avatar'))
      setUserId(sessionStorage.getItem('idUser'))
    }
  }, [])


  console.log('av', avatar)


  const userAvatar = avatar ? `http://localhost:3001/assets/${avatar}` : defaultAvatar // Utilise l'avatar par défaut si avatar est null
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary']
  const color = states[stateNum]
  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold'>{userData || 'User'}</span>
          <span className='user-status'>{userRole || 'Role'}</span>
        </div>
        <div className='d-flex align-items-center'>
          {avatar ? (
            <Avatar img={`http://localhost:3001/assets/${avatar}`} />
          ) : (
            <Avatar content={userData ? userData.charAt(0).toUpperCase() : 'U'} />
          )}
       
        </div>
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem  tag={Link} to={`/pages/profile/${id}`}>
          <User size={14} className='mr-75' />
          <span className='align-middle' >Profile</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to={`/pages/account-settings/${id}`}>
          <Settings size={14} className='mr-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/pages/pricing'>
          <CreditCard size={14} className='mr-75' />
          <span className='align-middle'>Pricing</span>
        </DropdownItem>
       {userRole === 'ecole' &&  (<DropdownItem tag={Link} to='/pages/faq'> 
           <HelpCircle size={14} className='mr-75' /> 
          <span className='align-middle'>FAQ</span> 
         </DropdownItem>)}
        <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
          <Power size={14} className='mr-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
