// ** React Imports
import { useEffect, Fragment } from 'react'
import { useParams, useLocation } from 'react-router-dom'

// ** Product detail components
import ItemFeatures from './ItemFeatures'
import RelatedProducts from './RelatedProducts'
import { getCar } from '../../../../redux/actions/cars'
// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Card, CardBody } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, deleteWishlistItem, addToWishlist, addToCart } from '../store/actions'
import Product from './ProductDetails'
import '@styles/base/pages/app-ecommerce-details.scss'

const Details = () => {
  const location = useLocation()
  const { pathname, search } = location
  const url = pathname + search
  const id = parseInt(pathname.split('/').pop())
  console.log('Current URL:', url)
  console.log('Extracted ID:', id)
  // ** Vars

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.cars)
console.log('store', store)
  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getCar(id))
  }, [dispatch, id])
console.log('selectedUser', store.selectedUser)
  if (!store.selectedUser) {
    return null // Si store.selectedUser est null ou undefined, ne rien afficher
  }
  return (
    <Fragment>
      <div className='app-ecommerce-details'>
        {Object.keys(store.selectedUser).length ? (
          <Card>
            <CardBody>
              <Product
                data={store.selectedUser}
                deleteWishlistItem={deleteWishlistItem}
                dispatch={dispatch}
                addToWishlist={addToWishlist}
                getProduct={getCar}
                productId={id}
                addToCart={addToCart}
              />
            </CardBody>
          </Card>
        ) : null}
      </div>
    </Fragment>
  )
}

export default Details
