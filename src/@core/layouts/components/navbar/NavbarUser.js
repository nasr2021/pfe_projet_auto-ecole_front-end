// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown'
import CartDropdown from './CartDropdown'
import UserDropdown from './UserDropdown'
import NavbarSearch from './NavbarSearch'
import NotificationDropdown from './NotificationDropdown'
import { useEffect, useState } from 'react'
import { isUserLoggedIn } from '@utils'
// ** Third Party Components
import { Sun, Moon } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin} = props
console.log('nav', props)
  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  const [userRole, setUserRole] = useState(null)
  useEffect(() => {
    if (isUserLoggedIn()) {
      setUserRole(sessionStorage.getItem('role'))
    }
  }, [])
  return (
    <ul className='nav navbar-nav align-items-center ml-auto'>
      <IntlDropdown />
      <NavItem className='d-none d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem>
      <NavbarSearch />
      {/* <CartDropdown /> */}
      {userRole === 'manager' ? null : (<NotificationDropdown />) }
      <UserDropdown  />
    </ul>
  )
}
export default NavbarUser
