import { Truck, Mail, MessageSquare, CheckSquare, Archive, Calendar, FileText, Circle, ShoppingCart, User } from 'react-feather'
import { isUserLoggedIn } from '@utils'
const checkUserRole = (roles, userRole) => {
  return !roles || (userRole && roles.includes(userRole))
}
const userRole = isUserLoggedIn() ? sessionStorage.getItem('role') : null
//  const userRole = sessionStorage.getItem('role')
export default [
  {
    id: 'calendar',
    title: 'Calendar',
    icon: <Calendar size={20} />,
    navLink: '/apps/calendar',
    roles: ['ecole', 'candidat', 'moniteur'] 
  },
  
  {
    id: 'invoiceApp',
    title: 'Driving school',
    icon: <FileText size={20} />,
    navLink: '/apps/invoice/list',
    roles: ['manager'] 
  },
  {
    id: 'eCommerce',
    title: 'Cars',
    icon: <Truck  size={20} />,
    children: [
      {
        id: 'shop',
        title: 'List Car',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/shop'
      },
      {
        id: 'Add ',
        title: 'Add Car',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/checkout'
      }
    ],
    roles: ['ecole'] 
  },
  {
    id: 'users',
    title: 'User',
    icon: <User size={20} />,
    navLink: '/apps/user/list',
    roles: ['manager', 'ecole'] 
  },
  {
    id: 'invoiceEdit',
    title: 'History',
    icon: <Archive  size={12} />,
    navLink: '/apps/invoice/edit',
    roles: ['candidat', 'ecole', 'moniteur'] 
  }
].reduce((acc, item) => {
  // Vérifie si l'utilisateur a le rôle requis ou si aucun rôle n'est défini
  if (checkUserRole(item.roles, userRole) || !item.roles) {
    // Si l'élément a des enfants (sous-routes), filtre et organise également les sous-routes
    if (item.children) {
      const children = item.children.filter(child => checkUserRole(child.roles, userRole) || !child.roles)
      if (children.length > 0) {
        acc.push({ ...item, children })
      }
    } else {
      acc.push(item)
    }
  }
  return acc
}, [])
// .filter(item => checkUserRole(item.roles, userRole) || !item.roles)

