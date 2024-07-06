
// ** React Imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Button, Label, Input, CustomInput, Row, Col, Card, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, MoreVertical  } from 'reactstrap'

// ** Store & Actions
import { getData, addInvoice, getInvoice, putInvoice } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import SidebarEdit from './SidebarEdit'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
// const InvoiceList = () => {
//   const dispatch = useDispatch()
//   const store = useSelector(state => state.invoice)
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [sidebarOpens, setSidebarOpens] = useState(false)
//   const [value, setValue] = useState('')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [statusValue, setStatusValue] = useState('')
//   const [rowsPerPage, setRowsPerPage] = useState(10)
//   const [selectedUser, setSelectedUser] = useState(null)
//   const toggleSidebars = () => setSidebarOpens(!sidebarOpens)
//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
//   const fetchData = () => {
//     dispatch(
//       getData({
//         page: currentPage,
//         perPage: rowsPerPage,
//         status: statusValue,
//         q: value
//       })
//     )
//   }
//   const handleEditButtonClick = (row) => {
//     dispatch(getInvoice(row.idUser))
//     toggleSidebars()
//   }
//   useEffect(() => {
//     fetchData()
//   }, [sidebarOpen, dispatch, currentPage, rowsPerPage, statusValue, value])
//   const handleAddUser = (user) => {
//     dispatch(addInvoice(user))
//     setSidebarOpen(false)
//     fetchData()
//   }
//   const handleEditUser = (iduser) => {
//     dispatch(putInvoice(iduser))
//     setSidebarOpens(false)
//     fetchData()
//   }
//   const handleFilter = val => {
//     setValue(val)
//     dispatch(
//       getData({
//         page: currentPage,
//         perPage: rowsPerPage,
//         status: statusValue,
//         q: val
//       })
//     )
//   }

//   const handlePerPage = e => {
//     const perPage = parseInt(e.target.value)
//     setRowsPerPage(perPage)
//     dispatch(
//       getData({
//         page: currentPage,
//         perPage,
//         status: statusValue,
//         q: value
//       })
//     )
//   }

//   const handleStatusValue = e => {
//     const selectedStatus = e.target.value
//     setStatusValue(selectedStatus)
//     dispatch(
//       getData({
//         page: currentPage,
//         perPage: rowsPerPage,
//         status: selectedStatus,
//         q: value
//       })
//     )
//   }

//   const handlePagination = page => {
//     const selectedPage = page.selected + 1
//     setCurrentPage(selectedPage)
//     dispatch(
//       getData({
//         page: selectedPage,
//         perPage: rowsPerPage,
//         status: statusValue,
//         q: value
//       })
//     )
//   }

//   const CustomPagination = () => {
//     const pageCount = Math.ceil(store.totalDataCount / rowsPerPage)

//     return (
//       <ReactPaginate
//         pageCount={pageCount || 1}
//         nextLabel=''
//         breakLabel='...'
//         previousLabel=''
//         activeClassName='active'
//         breakClassName='page-item'
//         breakLinkClassName='page-link'
//         forcePage={currentPage !== 0 ? currentPage - 1 : 0}
//         onPageChange={page => handlePagination(page)}
//         pageClassName={'page-item'}
//         nextLinkClassName={'page-link'}
//         nextClassName={'page-item next'}
//         previousClassName={'page-item prev'}
//         previousLinkClassName={'page-link'}
//         pageLinkClassName={'page-link'}
//         containerClassName={'pagination react-paginate justify-content-end p-1'}
//       />
//     )
//   }

//   const dataToRender = () => {
//     const filters = {
//       status: statusValue,
//       q: value
//     }

//     const isFiltered = Object.keys(filters).some(function (k) {
//       return filters[k].length > 0
//     })

//     if (store.data.length > 0) {
//       return store.data
//     } else if (store.data.length === 0 && isFiltered) {
//       return []
//     } else {
//       return (store.allData || []).slice(0, rowsPerPage)
      
//     }
//   }

//   return (
//     <div className='invoice-list-wrapper'>
//       <Card>
//         <div className='invoice-list-dataTable'>
//           <DataTable
//             noHeader
//             pagination
//             paginationServer
//             subHeader={true}
//             columns={columns(handleEditButtonClick)}
//             responsive={true}
//             sortIcon={<ChevronDown />}
//             className='react-dataTable'
//             defaultSortField='invoiceId'
//             paginationDefaultPage={currentPage}
//             paginationComponent={CustomPagination}
//             data={dataToRender()}
//             subHeaderComponent={
//               <CustomHeader
//                 value={value}
//                 statusValue={statusValue}
//                 rowsPerPage={rowsPerPage}
//                 handleFilter={handleFilter}
//                 handlePerPage={handlePerPage}
//                 handleStatusValue={handleStatusValue}
//                 toggleSidebar={toggleSidebar} // Pass toggleSidebar here
//               />
//             }
//           />
//         </div>
//       </Card>

//       <SidebarEdit
//         opens={sidebarOpens}
//         toggleSidebars={toggleSidebars}
//         handleEditUser={handleEditUser}
//       />
//       <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} handleAddUser={handleAddUser}/>
//     </div>
//   )
// }

// export default InvoiceList
const CustomHeader = ({ toggleSidebar, handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage }) => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          <div className='d-flex align-items-center mr-2'>
            <Label for='rows-per-page'>Show</Label>
            <CustomInput
              className='form-control ml-50 pr-3'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </CustomInput>
          </div>
          <Button.Ripple onClick={toggleSidebar} color='primary'>
            Add driving school
          </Button.Ripple>
        </Col>
        <Col
          lg='6'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0'
        >
          <div className='d-flex align-items-center'>
            <Label for='search-invoice'>Search</Label>
            <Input
              id='search-invoice'
              className='ml-50 mr-2 w-100'
              type='text'
              value={value}
              onChange={e => handleFilter(e.target.value)}
              placeholder='Search driving school'
            />
          </div>
          <Input className='w-auto ' type='select' value={statusValue} onChange={handleStatusValue}>
            <option value=''>Select Status</option>
            <option value='authorized'>Authorized</option>
            <option value='unauthorized'>Unauthorized</option>
          </Input>
        </Col>
      </Row>
    </div>
  )
}
const InvoiceList = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.invoice)
  const user = useSelector(state => state.invoice)
  console.log('user', user)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarOpens, setSidebarOpens] = useState(false)
  const [value, setValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedUser, setSelectedUser] = useState(null)

  // const toggleSidebars = () => setSidebarOpens(!sidebarOpens)
  // const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  
  const fetchData = () => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
        q: value
      })
    )
  }
  const toggleSidebars = () => {
    setSidebarOpens(!sidebarOpens)
    if (!sidebarOpens) {
      fetchData()
    }
  }
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
    if (!sidebarOpen) {
      fetchData()
    }
  }
  useEffect(() => {
    fetchData()
  }, [sidebarOpen, dispatch, currentPage, rowsPerPage, statusValue, value])

  const handleAddUser = (user) => {
    dispatch(addInvoice(user))
    setSidebarOpen(false)
    fetchData()
  }

  const handleEditUser = (user) => {
    dispatch(putInvoice(user))
    setSidebarOpens(false)
    fetchData()
  }

  const handleFilter = val => {
    setValue(val)
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
        q: val
      })
    )
  }

  const handlePerPage = e => {
    const perPage = parseInt(e.target.value)
    setRowsPerPage(perPage)
    dispatch(
      getData({
        page: currentPage,
        perPage,
        status: statusValue,
        q: value
      })
    )
  }

  const handleStatusValue = e => {
    const selectedStatus = e.target.value
    setStatusValue(selectedStatus)
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        status: selectedStatus,
        q: value
      })
    )
  }

  const handlePagination = page => {
    const selectedPage = page.selected + 1
    setCurrentPage(selectedPage)
    dispatch(
      getData({
        page: selectedPage,
        perPage: rowsPerPage,
        status: statusValue,
        q: value
      })
    )
  }

  const CustomPagination = () => {
    const pageCount = Math.ceil(store.totalDataCount / rowsPerPage)

    return (
      <ReactPaginate
        pageCount={pageCount || 1}
        nextLabel=''
        breakLabel='...'
        previousLabel=''
        activeClassName='active'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end p-1'}
      />
    )
  }

  const dataToRender = () => {
    const filters = {
      status: statusValue,
      q: value
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return (store.allData || []).slice(0, rowsPerPage)
    }
  }

  const handleEditButtonClick = (row) => {
    dispatch(getInvoice(row.id))
    toggleSidebars()
    console.log("sdfg")
  }

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className='invoice-list-dataTable'>
          <DataTable
            noHeader
            pagination
            paginationServer
            subHeader={true}
            columns={columns(handleEditButtonClick)}
            responsive={true}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                value={value}
                statusValue={statusValue}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                handleStatusValue={handleStatusValue}
                toggleSidebar={toggleSidebar} // Pass toggleSidebar here
              />
            }
          />
        </div>
      </Card>

      <SidebarEdit
        opens={sidebarOpens}
        toggleSidebars={toggleSidebars}
        handleEditUser={handleEditUser}
        user={user}
      />
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} handleAddUser={handleAddUser}/>
    </div>
  )
}

export default InvoiceList
