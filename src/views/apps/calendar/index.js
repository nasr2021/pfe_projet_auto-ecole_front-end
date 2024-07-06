// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import { Row, Col } from 'reactstrap'

// ** Calendar App Component Imports
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import AddEventSidebar from './AddEventSidebar'

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchEvents,
  selectEvent,
  updateEvent,
  updateFilter,
  updateAllFilters,
  addEvent,
  removeEvent
} from './store/actions/index'
import AddDemandeSidebar from './demande'
// ** Styles
import '@styles/react/apps/app-calendar.scss'

// ** CalendarColors
const calendarsColor = {
  'Hour conduit': 'primary',
  'Hour code': 'danger',
  'Code exam': 'warning',
  'Conduit exam': 'success'

}

const CalendarComponent = () => {
  // ** Variables
  const [role, setRole] = useState('')
  const selectedCalendars = useSelector(state => state.calendar.selectedCalendars) // Assurez-vous que selectedCalendars est correctement récupéré depuis le state

useEffect(() => {
  const storedRole = sessionStorage.getItem('role')
  if (storedRole) {
    setRole(storedRole)
  }
}, [])
  const dispatch = useDispatch()
  const store = useSelector(state => state.calendar)

  // ** states
  const [addSidebarOpen, setAddSidebarOpen] = useState(false),
    [leftSidebarOpen, setLeftSidebarOpen] = useState(false),
    [calendarApi, setCalendarApi] = useState(null)
    const [SidebarOpen, setSidebarOpen] = useState(false)
  // ** Hooks
  const [isRtl, setIsRtl] = useRTL()

  // ** AddEventSidebar Toggle Function
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)
  const handleSidebar = () => setSidebarOpen(!SidebarOpen)
  // ** LeftSidebar Toggle Function
  const toggleSidebar = val => setLeftSidebarOpen(val)

  // ** Blank Event Object
  const blankEvent = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    url: '',
    extendedProps: {
      calendar: '',
      guests: [],
      location: '',
      description: ''
    }
  }

  
  const refetchEvents = () => {
    if (calendarApi !== null) {
     
      calendarApi.refetchEvents()

    } else {
      console.log('calendarApi is null, refetchEvents() not called')
    }
  }
  
  // ** Fetch Events On Mount
  useEffect(() => {
    dispatch(fetchEvents(store.selectedCalendars))
    refetchEvents()
  }, [dispatch, store.selectedCalendars])

  return (
    <Fragment>
      <div className='app-calendar overflow-hidden border'>
        <Row noGutters>
          <Col
            id='app-calendar-sidebar'
            className={classnames('col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column', {
              show: leftSidebarOpen
            })}
          >
            <SidebarLeft
              store={store}
              dispatch={dispatch}
              updateFilter={updateFilter}
              toggleSidebar={toggleSidebar}
              updateAllFilters={updateAllFilters}
              handleSidebar={handleSidebar}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
          <Col className='position-relative'>
            <Calendar
              isRtl={isRtl}
              store={store}
              dispatch={dispatch}
              blankEvent={blankEvent}
              calendarApi={calendarApi}
              selectEvent={selectEvent}
              updateEvent={updateEvent}
              toggleSidebar={toggleSidebar}
              calendarsColor={calendarsColor}
              setCalendarApi={setCalendarApi}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
          <div
            className={classnames('body-content-overlay', {
              show: leftSidebarOpen === true
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>
     
      {role === 'candidat' ? (<AddDemandeSidebar
      store={store}
      dispatch={dispatch}
      fetchEvents={fetchEvents}
      open={SidebarOpen}
      handleSidebar={handleSidebar}
    />) : (<AddEventSidebar
      store={store}
      dispatch={dispatch}
      addEvent={addEvent}
      open={addSidebarOpen}
      selectEvent={selectEvent}
      updateEvent={updateEvent}
      removeEvent={removeEvent}
      calendarApi={calendarApi}
      refetchEvents={refetchEvents}
      calendarsColor={calendarsColor}
      handleAddEventSidebar={handleAddEventSidebar}
    />
       )}
    </Fragment>
  )
}

export default CalendarComponent
