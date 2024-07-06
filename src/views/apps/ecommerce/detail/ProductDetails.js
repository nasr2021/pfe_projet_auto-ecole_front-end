// ** React Imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, DollarSign, Heart, Share2, Facebook, Twitter, Youtube, Instagram } from 'react-feather'
import {
  Row,
  Col,
  CardText,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap'

const Product = props => {
  // ** Props
  const { data, deleteWishlistItem, dispatch, addToWishlist, getProduct, productId, addToCart } = props

  // ** State
  const [selectedColor, setSelectedColor] = useState('primary')

  // ** Renders color options
  const renderColorOptions = () => {
    return data.colorOptions.map(color => {
      return (
        <li
          key={color}
          className={classnames('d-inline-block', {
            selected: selectedColor === color
          })}
          onClick={() => setSelectedColor(color)}
        >
          <div className={`color-option b-${color}`}>
            <div className={`filloption bg-${color}`}></div>
          </div>
        </li>
      )
    })
  }

  // ** Handle Wishlist item toggle
  const handleWishlist = val => {
    if (val) {
      dispatch(deleteWishlistItem(productId))
    } else {
      dispatch(addToWishlist(productId))
    }
    dispatch(getProduct(productId))
  }

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false) {
      dispatch(addToCart(id))
    }
    dispatch(getProduct(productId))
  }

  // ** Condition btn tag
  const CartBtnTag = data.isInCart ? Link : 'button'

  return (
    <Row className='my-2'>
      <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='5' xs='12'>
        <div className='d-flex align-items-center justify-content-center'>
          <img className='img-fluid product-img' 
              src={`http://localhost:3001/assets/${data.image}`}
          alt={data.name} />
        </div>
      </Col>
      <Col md='7' xs='12'>
        <h4>{data.marque}</h4>
    
        <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
        </div>
        <CardText>
          Status - <span className={`ml-25 ${data.statut === 'Available' ? 'text-success' : 'text-danger'}`}>
  {data.statut}
</span>

        </CardText>
        <div className='d-flex mt-2'>
        <div>Model</div> :
        <CardText className='mx-2'>{data.modele}</CardText>
        </div>
        <div className='d-flex mt-2'>
        <div>color</div>
        <CardText className='mx-2'>{data.couleur}</CardText>
        </div>
        <div className='d-flex mt-2'>
        <div>Registration number</div>
        <CardText className='mx-2'>{data.matricule}</CardText>
        </div>
        <div className='mt-2'>Description</div>
        <CardText>{data.description}</CardText>
        <hr />
        <div className='d-flex flex-column flex-sm-row pt-1'>
          <Button
            tag={CartBtnTag}
            className='btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0'
            color='light'
     
          >
            <Link to={`/apps/ecommerce/wishlist/${data.id}`}>
         
            Edit
        </Link>
          </Button>
          {/* <Button
            className='btn-wishlist mr-0 mr-sm-1 mb-1 mb-sm-0'
            color='secondary'
            outline
            onClick={() => handleWishlist(data.isInWishlist)}
          >
            <Heart
              size={14}
              className={classnames('mr-50', {
                'text-danger': data.isInWishlist
              })}
            />
            <span>Wishlist</span>
          </Button> */}
          {/* <UncontrolledButtonDropdown className='dropdown-icon-wrapper btn-share'>
            <DropdownToggle className='btn-icon hide-arrow' color='secondary' caret outline>
              <Share2 size={14} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Facebook size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Twitter size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Youtube size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Instagram size={14} />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown> */}
        </div>
      </Col>
    </Row>
  )
}

export default Product
