import { Box, Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User } from 'react-feather'

export default [
  {
    id: 'apps',
    title: 'Apps',
    icon: <Box />,
    children: [
      // {
      //   id: 'email',
      //   title: 'Email',
      //   icon: <Mail />,
      //   navLink: '/apps/email'
      // },
      // {
      //   id: 'chat',
      //   title: 'Chat',
      //   icon: <MessageSquare />,
      //   navLink: '/apps/chat'
      // },
      // {
      //   id: 'todo',
      //   title: 'Todo',
      //   icon: <CheckSquare />,
      //   navLink: '/apps/todo'
      // },
      {
        id: 'calendar',
        title: 'Calendar',
        icon: <Calendar />,
        navLink: '/apps/calendar'
      },
      {
        id: 'invoiceApp',
        title: 'Invoice',
        icon: <FileText />,
        children: [
          {
            id: 'invoiceList',
            title: 'List',
            icon: <Circle />,
            navLink: '/apps/invoice/list'
          },
          {
            id: 'invoicePreview',
            title: 'Preview',
            icon: <Circle />,
            navLink: '/apps/invoice/preview'
          },
          {
            id: 'invoiceEdit',
            title: 'Edit',
            icon: <Circle />,
            navLink: '/apps/invoice/edit'
          },
          {
            id: 'invoiceAdd',
            title: 'Add',
            icon: <Circle />,
            navLink: '/apps/invoice/add'
          }
        ]
      },
      {
        id: 'Cars',
        title: 'Cars',
        icon: <ShoppingCart />,
        children: [
          {
            id: 'shop',
            title: 'Shop',
            icon: <Circle />,
            navLink: '/apps/ecommerce/shop'
          },
          {
            id: 'detail',
            title: 'Details',
            icon: <Circle />,
            navLink: '/apps/ecommerce/product-detail'
          }
          // {
          //   id: 'wishList',
          //   title: 'Wish List',
          //   icon: <Circle />,
          //   navLink: '/apps/ecommerce/wishlist'
          // },
          // {
          //   id: 'checkout',
          //   title: 'Checkout',
          //   icon: <Circle />,
          //   navLink: '/apps/ecommerce/checkout'
          // }
        ]
      },
      {
        id: 'users',
        title: 'User',
        icon: <User />,
        navLink: '/apps/user/list'
        // children: [
        //   {
        //     id: 'list',
        //     title: 'List',
        //     icon: <Circle />,
        //     navLink: '/apps/user/list'
        //   },
          // {
          //   id: 'view',
          //   title: 'View',
          //   icon: <Circle />,
          //   navLink: '/apps/user/view'
          // },
          // {
          //   id: 'edit',
          //   title: 'Edit',
          //   icon: <Circle />,
          //   navLink: '/apps/user/edit'
          // }
        // ]
      }
    ]
  }
]
