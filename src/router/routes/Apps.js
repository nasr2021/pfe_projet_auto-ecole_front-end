import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import { isUserLoggedIn } from '@utils'
const userRole = isUserLoggedIn() ? sessionStorage.getItem('role') : null
const checkUserRole = (roles, userRole) => {
  return !roles || (userRole && roles.includes(userRole))
}
const AppRoutes = [
  {
    path: '/apps/email',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/calendar',
    component: lazy(() => import('../../views/apps/calendar')),
    roles: ['ecole', 'candidat', 'moniteur'] 
  },
  {
    path: '/apps/invoice/list',
    component: lazy(() => import('../../views/apps/invoice/list')),
    roles: ['manager'] 
  },
  {
    path: '/apps/invoice/preview/:id',
    component: lazy(() => import('../../views/apps/invoice/preview')),
    meta: {
      navLink: '/apps/invoice/preview'
    }
  },
  {
    path: '/apps/invoice/preview',
    exact: true,
    component: () => <Redirect to='/apps/invoice/preview/4987' />
  },
  {
    path: '/apps/invoice/edit',
    component: lazy(() => import('../../views/apps/invoice/edit')),
    meta: {
      navLink: '/apps/invoice/edit'
    },
    roles: ['candidat', 'ecole', 'moniteur']
  },
  {
    path: '/apps/invoice/add',
    component: lazy(() => import('../../views/apps/invoice/add'))
  },
  {
    path: '/apps/invoice/print',
    layout: 'BlankLayout',
    component: lazy(() => import('../../views/apps/invoice/print'))
  },
  {
    path: '/apps/ecommerce/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/shop')),
    roles: ['ecole'] 
  },
  {
    path: '/apps/ecommerce/wishlist/:product',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/wishlist'))
  },
  {
    path: '/apps/ecommerce/product-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => <Redirect to='/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />
  },
  {
    path: '/apps/ecommerce/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/detail')),
    meta: {
      navLink: '/apps/ecommerce/product-detail'
    }
  },
    {
    path: '/apps/ecommerce/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/detail')),
    meta: {
      navLink: '/apps/ecommerce/product-detail'
    }
  },
  {
    path: '/apps/ecommerce/checkout',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/checkout')),
    roles: ['ecole'] 
  },
  {
    path: '/apps/user/list',
    component: lazy(() => import('../../views/apps/user/list')),
    roles: ['manager', 'ecole'] 
  },
  {
    path: '/apps/user/edit',
    exact: true,
    component: () => <Redirect to='/apps/user/edit/1' />
  },
  {
    path: '/apps/user/edit/:idUser',
    component: lazy(() => import('../../views/apps/user/edit')),
    meta: {
      navLink: '/apps/user/edit'
    }
  },
  {
    path: '/apps/user/view',
    exact: true,
    component: () => <Redirect to='/apps/user/view/1' />
  },
  {
    path: '/apps/user/view/:id',
    component: lazy(() => import('../../views/apps/user/view')),
    meta: {
      navLink: '/apps/user/view'
    },
    roles: ['ecole', 'manager'] 
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
  } else {
    // Si l'utilisateur n'a pas les permissions pour accéder à la route, redirige vers '/misc/not-authorized'
    acc.push({
      path: '/misc/not-authorized',
      component: () => <Redirect to='/misc/not-authorized' />
    })
  }
  return acc
}, [])

export default AppRoutes
// {
  //   path: '/apps/invoice/edit',
  //   exact: true,
  //   component: () => <Redirect to='/apps/invoice/edit/4987' />
  // },
// {
  //   path: '/apps/email/:folder',
  //   exact: true,
  //   appLayout: true,
  //   className: 'email-application',
  //   component: lazy(() => import('../../views/apps/email')),
  //   meta: {
  //     navLink: '/apps/email'
  //   }
  // },
  // {
  //   path: '/apps/email/label/:label',
  //   exact: true,
  //   appLayout: true,
  //   className: 'email-application',
  //   component: lazy(() => import('../../views/apps/email')),
  //   meta: {
  //     navLink: '/apps/email'
  //   }
  // },
  // {
  //   path: '/apps/email/:filter',
  //   component: lazy(() => import('../../views/apps/email')),
  //   meta: {
  //     navLink: '/apps/email'
  //   }
  // },
  // {
  //   path: '/apps/chat',
  //   appLayout: true,
  //   className: 'chat-application',
  //   component: lazy(() => import('../../views/apps/chat'))
  // },
  // {
  //   path: '/apps/todo',
  //   exact: true,
  //   appLayout: true,
  //   className: 'todo-application',
  //   component: lazy(() => import('../../views/apps/todo'))
  // },
  // {
  //   path: '/apps/todo/:filter',
  //   appLayout: true,
  //   exact: true,
  //   className: 'todo-application',
  //   component: lazy(() => import('../../views/apps/todo')),
  //   meta: {
  //     navLink: '/apps/todo'
  //   }
  // },
  // {
  //   path: '/apps/todo/tag/:tag',
  //   appLayout: true,
  //   className: 'todo-application',
  //   component: lazy(() => import('../../views/apps/todo')),
  //   meta: {
  //     navLink: '/apps/todo'
  //   }
  // },