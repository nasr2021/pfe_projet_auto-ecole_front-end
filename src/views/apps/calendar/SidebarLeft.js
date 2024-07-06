// ** React Imports
import { Fragment, useState, useEffect } from 'react'
// ** Custom Components
import classnames from 'classnames'
import { CardBody, Button, CustomInput } from 'reactstrap'

// ** illustration import
import illustration from '@src/assets/images/pages/calendar-illustration.png'

// ** Filters Checkbox Array
const filters = [
  { label: 'Hour code', color: 'danger', className: 'custom-control-danger mb-1' },
  { label: 'Hour conduit', color: 'primary', className: 'custom-control-primary mb-1' },
  { label: 'Code exam', color: 'warning', className: 'custom-control-warning mb-1' },
  { label: 'Conduit exam', color: 'success', className: 'custom-control-success mb-1' }
]

const SidebarLeft = props => {
  // ** Props
  const { handleSidebar, handleAddEventSidebar, toggleSidebar, updateFilter, updateAllFilters, store, dispatch } = props

  // ** Function to handle Add Event Click
  const handleAddEventClick = () => {
    toggleSidebar(false)
    handleAddEventSidebar()
  }
  const handlClick = () => {
    toggleSidebar(false)
    handleSidebar()
  }
  const [role, setRole] = useState('')

  useEffect(() => {
    const storedRole = sessionStorage.getItem('role')
    if (storedRole) {
      setRole(storedRole)
    }
  }, [])
  return (
    <Fragment>
      <div className='sidebar-wrapper'>
        <CardBody className='card-body d-flex justify-content-center my-sm-0 mb-3'>
        {role === 'ecole' ? (
  <Button.Ripple color='primary' block onClick={handleAddEventClick}>
    <span className='align-middle'>Add Event</span>
  </Button.Ripple>
) : role === 'candidat' ? (
  <Button.Ripple color='primary' block onClick={handlClick}>
    <span className='align-middle'>Add Demande</span>
  </Button.Ripple>
) : null}

        </CardBody>
        <CardBody>
          <h5 className='section-label mb-1'>
            <span className='align-middle'>Filter</span>
          </h5>
          <CustomInput
            type='checkbox'
            className='mb-1'
            label='View All'
            id='view-all'
            checked={store.selectedCalendars.length === filters.length}
            onChange={e => dispatch(updateAllFilters(e.target.checked))}
          />
          <div className='calendar-events-filter'>
            {filters.length &&
              filters.map(filter => {
                return (
                  <CustomInput
                  type='checkbox'
                  key={filter.label}
                  id={filter.label}
                  label={filter.label}
                  checked={store.selectedCalendars.includes(filter.label)}
                  onChange={(e) => dispatch(updateFilter(filter.label))}
                  className={classnames({
                      [filter.className]: filter.className
                    })}
                  />
                  // <CustomInput
                  //   type='checkbox'
                  //   key={filter.label}
                  //   id={filter.label}
                  //   label={filter.label}
                  //   checked={store.selectedCalendars.includes(filter.label)}
                  //   className={classnames({
                  //     [filter.className]: filter.className
                  //   })}
                  //   onChange={e => dispatch(updateFilter(filter.label))}
                  // />
                )
              })}
          </div>
        </CardBody>
      </div>
      <div className='mt-auto'>
        <img className='img-fluid' src={illustration} alt='illustration' />
      </div>
    </Fragment>
  )
}

export default SidebarLeft
