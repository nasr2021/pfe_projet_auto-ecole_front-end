// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'
import BreadCrumbs from '@components/breadcrumbs'

// ** Steps
import Cart from './steps/Cart'
import Address from './steps/Address'
import Payment from './steps/Payment'

// ** Third Party Components
import { ShoppingCart, Home, CreditCard, Plus } from 'react-feather'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, deleteCartItem, deleteWishlistItem, addToWishlist } from '../store/actions'
import MultipleColumnForm from '../../../forms/form-layouts/MultipleColumnForm'
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const Checkout = () => {
  // ** Ref & State
  const ref = useRef(null)
  const [stepper, setStepper] = useState(null)

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // ** Get Cart Items on mount
  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  const steps = [
    {

       title: 'Add Cars',
    
       icon: <Plus size={18} />,
      content: <Address stepper={stepper} />
    }

  ]

  return (
    <Fragment>
       <MultipleColumnForm />
    </Fragment>
  )
}

export default Checkout
