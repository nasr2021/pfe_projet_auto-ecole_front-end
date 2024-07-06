// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Heart } from 'react-feather'
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'
import { deleteCar } from '../../../../redux/actions/cars'

const ProductCards = props => {
  // ** Props
  const {
    store,
    products,
    activeView,
    addToCart,
    dispatch,
    getProducts,
    getCartItems,
    addToWishlist,
    deleteWishlistItem
  } = props

  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map((item) => {
        const CartBtnTag = item.id ? Link : 'button'
        return (
          <Card className='ecommerce-card' key={item.id}>
            <div className='item-img text-center mx-auto'>
              <img
                className='img-fluid card-img-top'
                src={`http://localhost:3001/assets/${item.image}`}
                alt={item.name}
              />
            </div>
            <CardBody>
              <h6 className='item-name'>
                <div className='d-flex'> 
                  <div>Brand :</div>
                  <div className='text-body mx-2'>{item.marque}</div>
                </div>
                <CardText tag='span' className='item-company mt-1'>
                  By{'  '}
                  <a
                    className='company-name'
                    href='/'
                    onClick={(e) => e.preventDefault()}
                  >
                    {item.modele}
                  </a>
                </CardText>
              </h6>
              <div className='d-flex mt-1'>
                <div>year : </div>
                <CardText className='item-description mx-2'>{item.annee}</CardText>
              </div>
              <div className='d-flex mt-1'>
                <div>color :</div>
                <CardText className='item-description mx-2'>{item.couleur}</CardText>
              </div> 
              <div className='d-flex mt-1'>
                <div>Registration number : </div>
                <CardText className='item-description mx-2'>{item.matricule}</CardText>
              </div>
            </CardBody>
            <div className='item-options text-center'>
              <div className='item-wrapper'>
                <div className='item-cost'>
                  <h4 className='item-price'>{item.statut}</h4>
                </div>
              </div>
              <Button className='btn-wishlist' color='light'>
                <Link to={`/apps/ecommerce/product-detail/${item.id}`}>
                  See details
                </Link>
              </Button>
              <Button
    color='light'
    tag={CartBtnTag}
    className='btn-cart move-cart'
    to={item.id ? `/apps/ecommerce/wishlist/${item.id}` : undefined}
  >
    {item.id ? 'Edit' : 'Button Text if no item.id'}
  </Button>
            </div>
          </Card>
        )
      })
    }
  }

  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  )
}
export default ProductCards
