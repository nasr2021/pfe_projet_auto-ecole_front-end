import ExpandableTable, { data, columns } from '../../../tables/data-tables/data'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, Row, Label } from 'reactstrap'
import { Fragment, useEffect, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getData, getTime } from '../../calendar/store/actions'

const InvoiceEdit = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const dispatch = useDispatch()
  const store = useSelector(state => state.calendar.allData)
  const stores = useSelector(state => state.calendar.total)
  const temp = useSelector(state => state.calendar.temp)
  console.log('stores pagination', stores)
  const [picker, setPicker] = useState()

  const formatDate = (date) => {
    if (!date) return ''
    if (Array.isArray(date)) {
      date = date[0]
    }
    if (!(date instanceof Date)) {
      date = new Date(date)
    }
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)
    const hours = `0${date.getHours()}`.slice(-2)
    const minutes = `0${date.getMinutes()}`.slice(-2)
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }
  const fetchData = (date) => {
    dispatch(getData({ page: currentPage, perPage: rowsPerPage, date: formatDate(date) }))
    dispatch(getTime())
  }

  useEffect(() => {
    fetchData(picker)
    console.log('temp', temp)
  }, [picker, currentPage, rowsPerPage])

  const handlePagination = page => {
    const selectedPage = page.selected + 1
    setCurrentPage(selectedPage)
  }

  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
  }
  const CustomPagination = () => {
    console.log('store.totalDataCount', stores)
    // const pageCount = Math.ceil(stores.totalDataCount / rowsPerPage)
  
    // console.log('pageCount', pageCount)
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={stores || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
      />
    )
  }
  // const CustomPagination = () => {
  //   const pageCount = Math.ceil(store.totalDataCount / rowsPerPage);
  //   return (
  //     <ReactPaginate
  //       previousLabel={'<'}
  //       nextLabel={'>'}
  //       pageCount={pageCount || 1}
  //       activeClassName='active'
  //       forcePage={currentPage - 1}
  //       onPageChange={page => handlePagination(page)}
  //       pageClassName={'page-item'}
  //       nextLinkClassName={'page-link'}
  //       nextClassName={'page-item next'}
  //       previousClassName={'page-item prev'}
  //       previousLinkClassName={'page-link'}
  //       pageLinkClassName={'page-link'}
  //       containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
  //       pageRangeDisplayed={pageCount} // Show all pages
  //       marginPagesDisplayed={2} // Number of pages to show at the start and end
  //     />
  //   );
  // };

  return (
    <Card>
      <CardHeader>
        <h5><span>Clear history date at :</span>{temp}</h5>
        <Row>
          <div className='col-11'>
            <Label for='default-picker'></Label>
            <Flatpickr
              className='form-control'
              options={{
                enableTime: true,
                dateFormat: 'Y-m-d H:i'
              }}
              value={picker}
              onChange={date => setPicker(date[0])}
              id='default-picker'
              placeholder='2024-01-01 '
            />
          </div>
        </Row>
      </CardHeader>
      <DataTable
        noHeader
        pagination
        data={store}
        expandableRows
        columns={columns(store)}
        expandOnRowClicked
        className='react-dataTable'
        sortIcon={<ChevronDown size={10} />}
        paginationDefaultPage={currentPage}
        expandableRowsComponent={<ExpandableTable />}
        paginationRowsPerPageOptions={[10]}
        paginationComponent={CustomPagination}
      />
    </Card>
  )
}

export default InvoiceEdit