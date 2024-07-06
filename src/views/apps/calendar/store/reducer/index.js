// // ** Initial State
const initialState = {
  events: [],
  allData:[],
  selectedEvent: {},
  data:[],
  cars:[],
  total: 1,
  params: {},
  totalDataCount: 0,
  filter: [],
  moniteur:[],
  eventData:[],
  eventUser:[],
  evented:[],
  demandeEvent:[],
  temp:null,
  selectedCalendars: ['Hour conduit', 'Hour code', 'Code exam', 'Conduit exam']
}

// const calenderReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'GET_DATA':
//       return {
//         ...state,
//         allData: action.allData,
//         params: action.params,
//         filter: action.filter,
//         totalDataCount: action.totalDataCount,
//         total: action.totalPages
//       }
//     case 'FETCH_EVENTS':
//       return { ...state, events: action.events }
//     case 'ADD_EVENT':
//       return { ...state,
//         events: [...state.events, action.event]
//        }
//     case 'REMOVE_EVENT':
//         const updatedEvents = state.events.filter(event => event.idEvenement !== action.payload)
//       return { ...state, events: updatedEvents }
//       case 'UPDATE_EVENT':
//         const updatedEventIndex = state.events.findIndex(event => event.idEvenement === action.selectedEvent.idEvenement)
//         const updatedEventsArray = [...state.events]
//         updatedEventsArray[updatedEventIndex] = action.selectedEvent
      
//         return {
//           ...state,
//           events: updatedEventsArray,
//           selectedEvent: action.selectedEvent
//         }  
//         case 'UPDATE_FILTERS':
//           const selectedFilters = getState().calendar.selectedCalendars
          
//           const filteredEvents = state.events.filter(event => {
//             return selectedFilters.includes(event.extendedProps.calendar)
//           })
          
//           return {
//             ...state,
//             events: filteredEvents
//           }    
//         // case 'UPDATE_FILTERS':
//         //   const filterIndex = state.selectedCalendars.indexOf(action.filter)
//         //   let newSelectedCalendars
          
//         //   if (filterIndex !== -1) {
//         //     // Remove the filter
//         //     newSelectedCalendars = [
//         //       ...state.selectedCalendars.slice(0, filterIndex),
//         //       ...state.selectedCalendars.slice(filterIndex + 1)
//         //     ]
//         //   } else {
//         //     // Add the filter
//         //     newSelectedCalendars = [...state.selectedCalendars, action.filter]
//         //   }
          
//         //   return {
//         //     ...state,
//         //     selectedCalendars: newSelectedCalendars,
//         //     events: newSelectedCalendars.length === 0 ? [] : state.events 
//         //   }
//           case 'UPDATE_ALL_FILTERS':
//           const value = action.value
//           let selected = []
//           if (value === true) {
//             selected = ['Hour conduit', 'Hour code', 'Code exam', 'Conduit exam']
//           } else {
//             selected = []
//           }
//           return { ...state, selectedCalendars: selected }
//     case 'SELECT_EVENT':
//       return { ...state, selectedEvent: action.event }
//       case 'GET_CANDIDAT':
//         return { ...state, data: action.data }
//         case 'GET_CAR':
//           return { ...state, cars: action.cars }
//       case 'GET_MONITEUR':
//         return { ...state, moniteur: action.moniteur }
//         case 'GET_EVENT':
//         return { ...state, eventData: action.eventData }
//         case 'GET_EVENT_USER':
//           console.log('Reducer received event data:', action.eventUser)
//           return { ...state, eventUser: action.eventUser }
//     default:
//       return state
//   }
// }

// export default calenderReducer
const calenderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        allData: action.allData,
        params: action.params,
        filter: action.filter,
        totalDataCount: action.totalDataCount,
        total: action.totalPages
      }
      case 'GET_TEMP':
      return {
        ...state,
        temp: action.temp
      }
    case 'FETCH_EVENTS':
      return { ...state, events: action.events }
    case 'ADD_EVENT':
      return {
        ...state,
        events: [...state.events, action.event],
        evented: action.event
      }
    case 'REMOVE_EVENT':
      const updatedEvents = state.events.filter(
        (event) => event.idEvenement !== action.payload
      )
      return { ...state, events: updatedEvents }
    case 'UPDATE_EVENT':
      const updatedEventIndex = state.events.findIndex(
        (event) => event.idEvenement === action.selectedEvent.idEvenement
      )
      const updatedEventsArray = [...state.events]
      updatedEventsArray[updatedEventIndex] = action.selectedEvent

      return {
        ...state,
        events: updatedEventsArray,
        selectedEvent: action.selectedEvent
      }
      case 'UPDATE_FILTERS':
        const newSelectedCalendars = [...state.selectedCalendars]
        const filterIndex = newSelectedCalendars.indexOf(action.filter)
  
        if (filterIndex !== -1) {
          // Supprimer le filtre
          newSelectedCalendars.splice(filterIndex, 1)
        } else {
          // Ajouter le filtre
          newSelectedCalendars.push(action.filter)
        }
  
        // Filtrer les événements en fonction des filtres sélectionnés
        // const filteredEvents = state.allData.filter(event => 
        //   newSelectedCalendars.includes(event.extendedProps.calendar)
        // )
        const filteredEvents = state.allData.filter(event => newSelectedCalendars.includes(event.extendedProps.calendar))
        return {
          ...state,
          selectedCalendars: newSelectedCalendars,
          events: filteredEvents
        }
      
      case 'UPDATE_ALL_FILTERS':
      const value = action.value
      let selected = []
      if (value === true) {
        selected = ['Hour conduit', 'Hour code', 'Code exam', 'Conduit exam']
      } else {
        selected = []
      }
      return { ...state, selectedCalendars: selected }
    case 'SELECT_EVENT':
      return { ...state, selectedEvent: action.event }
    case 'GET_CANDIDAT':
      return { ...state, data: action.data }
    case 'GET_CAR':
      return { ...state, cars: action.cars }
      case 'GET_DEMANDE_EVENT':
        return { ...state, demandeEvent: action.demandeEvent }
    case 'GET_MONITEUR':
      return { ...state, moniteur: action.moniteur }
    case 'GET_EVENT':
      return { ...state, eventData: action.eventData }
    case 'GET_EVENT_USER':
      return { ...state, eventUser: action.eventUser }
    default:
      return state
  }
}

export default calenderReducer
