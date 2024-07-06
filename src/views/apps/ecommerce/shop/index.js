// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Products'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  getProducts,
  getCartItems,
  addToWishlist,
  deleteCartItem,
  deleteWishlistItem
} from '../store/actions'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { getData } from '../../../../redux/actions/cars'
const Shop = () => {
  const [activeView, setActiveView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const dispatch = useDispatch()
  const store = useSelector(state => state.cars)

  const fetchData = () => {
    dispatch(
      getData({
        // page: 1,
        // perPage: 9,
        q: searchTerm
      })
    )
  }

  useEffect(() => {
    fetchData()
  }, [dispatch, searchTerm])

  return (
    <Fragment >
      {/* <Breadcrumbs breadCrumbTitle='Shop' breadCrumbParent='Cars' breadCrumbActive='Shop' /> */}
      <Products
        store={store}
        dispatch={dispatch}
        activeView={activeView}
        setActiveView={setActiveView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        fetchData={fetchData}
      />
      {/* <Sidebar sidebarOpen={sidebarOpen} /> */}
    </Fragment>
    )
  }
export default Shop
