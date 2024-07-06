// ** Third Party Components
import { Search } from 'react-feather'
import { Row, Col, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap'
import { getData } from '../../../../redux/actions/cars'
const ProductsSearchbar = props => {
  // ** Props
  const { dispatch, getProducts, store, products } = props

  return (
    <div id='ecommerce-searchbar' className='ecommerce-searchbar'>
      <Row className='mt-1'>
        <Col sm='12'>
          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              placeholder='Search Product'
              onChange={e => dispatch(getData({ ...store.params, q: e.target.value }))}
            />
            <InputGroupAddon addonType='append'>
              <InputGroupText>
                <Search className='text-muted' size={14} />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductsSearchbar
