// ** React Imports
import { Fragment } from 'react'

// ** Product components
import ProductCards from './ProductCards'
import ProductsHeader from './ProductsHeader'
import ProductsSearchbar from './ProductsSearchbar'

// ** Third Party Components
import classnames from 'classnames'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'


const ProductsPage = props => {
  const {
    activeView,
    setActiveView,
    store,
    sidebarOpen,
    dispatch,
    getProducts,
    addToCart,
    addToWishlist,
    getCartItems,
    deleteWishlistItem,
    deleteCartItem,
    setSidebarOpen
  } = props

  const handlePageChange = val => {
    if (val === 'next') {
      dispatch(getData({ ...store.params, page: store.params.page + 1 }))
    } else if (val === 'prev') {
      dispatch(getData({ ...store.params, page: store.params.page - 1 }))
    } else {
      dispatch(getData({ ...store.params, page: val }))
    }
  }

  const renderPageItems = () => {
    const arrLength = Math.ceil(store.totalDataCount / store.params.perPage)
    return new Array(arrLength).fill().map((item, index) => (
      <PaginationItem
        key={index}
        active={store.params.page === index + 1}
        onClick={() => handlePageChange(index + 1)}
      >
        <PaginationLink href='#' onClick={e => e.preventDefault()}>
          {index + 1}
        </PaginationLink>
      </PaginationItem>
    ))
  }

  const handleNext = () => {
    if (store.params.page < Math.ceil(store.totalDataCount / store.params.perPage)) {
      handlePageChange('next')
    }
  }

  const handlePrev = () => {
    if (store.params.page > 1) {
      handlePageChange('prev')
    }
  }

  return (
    <div className='content-detached content-right'>
      <div className=''>
        <ProductsHeader
          store={store}
          dispatch={dispatch}
          activeView={activeView}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={classnames('body-content-overlay', {
            show: sidebarOpen
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <ProductsSearchbar dispatch={dispatch}    products={store.data} store={store} />
        {store.data.length ? (
          <Fragment>
            <ProductCards
              store={store}
              dispatch={dispatch}
              addToCart={addToCart}
              activeView={activeView}
              products={store.data}
              getProducts={getProducts}
              getCartItems={getCartItems}
              addToWishlist={addToWishlist}
              deleteCartItem={deleteCartItem}
              deleteWishlistItem={deleteWishlistItem}
            />

          </Fragment>
        ) : (
          <div className='d-flex justify-content-center mt-2'>
            <p>No Results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
