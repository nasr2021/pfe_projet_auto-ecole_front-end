import axios from 'axios'
import JwtService from '../../../../../@core/auth/jwt/jwtService'
import { getFirebaseToken } from '../../../../../firebaseConfig'
const jwt = new JwtService()
// ** Fetch Events

// export const fetchEvents = (calendars) => {
//   return (dispatch) => {
    
//     jwt.axiosInstance.get('/api/calendrier/user', { calendars }).then(response => {

//       const events = response.data.map(event => ({
//         title: event.nom_evenement,
//         start: new Date(event.date_debut).toISOString(), // Convert to ISO string
//         end: new Date(event.date_fin).toISOString(),
//         allDay: false, 
       
//         extendedProps: {
//           idEvenement:event.idEvenement,
//           idMoniteur: event.idMoniteur,
//           idVoiture :event.idVoiture,
//           idUser :event.idUser,
//           calendar: event.type,
//           nom_evenement: event.nom_evenement
//         }
//       }))
//       dispatch({
//         type: 'FETCH_EVENTS',
//         events
//       })
//     })
//   }
// }

export const fetchEvents = (selectedCalendars) => {
  return (dispatch) => {
    jwt.axiosInstance
      .get('/api/calendrier/user')
      .then(response => {
        // Filtrer les événements en fonction des filtres sélectionnés
        const events = response.data
          .filter(event => {
            if (!selectedCalendars || selectedCalendars.length === 0) {
              return true // Retourne tous les événements si aucun filtre n'est appliqué
            } else {
              return selectedCalendars.includes(event.type)
            }
          })
          .map(event => ({
            title: event.nom_evenement,
            start: new Date(event.date_debut).toISOString(),
            end: new Date(event.date_fin).toISOString(),
            allDay: false,
            extendedProps: {
              idEvenement: event.idEvenement,
              idMoniteur: event.idMoniteur,
              idVoiture: event.idVoiture,
              idUser: event.idUser,
              calendar: event.type,
              nom_evenement: event.nom_evenement
            }
          }))

        dispatch({
          type: 'FETCH_EVENTS',
          events
        })
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des événements :', error)
      })
  }
}

// export const fetchEvents = (selectedCalendars) => {
//   return (dispatch) => {
//     jwt.axiosInstance
//       .get('/api/calendrier/user')
//       .then(response => {
//         // Filtrer les événements en fonction des filtres sélectionnés
       
//         const events = response.data
//           .filter(event => selectedCalendars.includes(event.type))
//           .map(event => ({
//             title: event.nom_evenement,
//             start: new Date(event.date_debut).toISOString(),
//             end: new Date(event.date_fin).toISOString(),
//             allDay: false,
//             extendedProps: {
//               idEvenement: event.idEvenement,
//               idMoniteur: event.idMoniteur,
//               idVoiture: event.idVoiture,
//               idUser: event.idUser,
//               calendar: event.type,
//               nom_evenement: event.nom_evenement
//             }
//           }))

//         dispatch({
//           type: 'FETCH_EVENTS',
//           events
//         })
//       })
//       .catch(error => {
//         console.error('Erreur lors de la récupération des événements :', error)
//       })
//   }
// }
// ** Update Filter
export const updateFilter = filter => {
  return (dispatch, getState) => {
    dispatch({
      type: 'UPDATE_FILTERS',
      filter
    })
    // Obtenez les filtres sélectionnés à partir du state
    const { selectedCalendars } = getState().calendar
    // Appelez fetchEvents avec les filtres sélectionnés
    dispatch(fetchEvents(selectedCalendars))
  }
}
export const selectEvent = event => {
  return dispatch => {
    const startDate = new Date(event.start)
    const endDate = new Date(event.end)

    if (isNaN(startDate) || isNaN(endDate)) {
      // console.error('Invalid Date:', { start: event.start, end: event.end })
      return
    }
    const eventWithoutContext = { ...event }
    delete eventWithoutContext._context

    dispatch({
      type: 'SELECT_EVENT',
      event: {
        ...eventWithoutContext,
        start: startDate.toISOString(),
        end: endDate.toISOString()

      }
    })
  }
}

// ** Add Event
export const addEvent = event => {
  return async (dispatch, getState) => {
    try {
    const firebaseToken = await getFirebaseToken() 
    console.log('eventWithToken to be added firebaseToken:', firebaseToken)
    const eventWithToken = { ...event, firebaseToken } 
       
    console.log('eventWithToken to be added:', eventWithToken)
   
    const response = await jwt.axiosInstance.post('/api/calendrier', { eventWithToken })
    
      console.log('POST success:', response.data)
 
      dispatch({
        type: 'ADD_EVENT',
        event: response.data
      })
      dispatch(fetchEvents())
    } catch (error) {
      console.error('Error adding event:', error)
    }
  }
}

export const updateEvent = event => {
  return dispatch => {
    jwt.axiosInstance
      .put(`/api/calendrier/${event.idEvenement}`, event)
      .then(response => {
        dispatch({
          type: 'UPDATE_EVENT',
          selectedEvent: response.data
        })
        dispatch(fetchEvents()) // Assuming fetchEvents fetches all events again
      })
      .catch(error => {
        console.error('Error updating event:', error)
        // toast.error('Failed to update event. Please try again later.')
      })
  }
}
// ** Add/Remove All Filters
export const updateAllFilters = value => {
  return (dispatch, getState) => {
    dispatch({
      type: 'UPDATE_ALL_FILTERS',
      value
    })
    dispatch(fetchEvents(getState().calendar.selectedCalendars))
  }
}


// ** remove Event
export const removeEvent = id => {
  return dispatch => {
    jwt.axiosInstance.delete(`api/calendrier/${id}`).then(() => {
      dispatch({
        type: 'REMOVE_EVENT',
        payload: id 
      })
      dispatch(fetchEvents())
    })
  }
}

export const getCandidat = () => {
  return async dispatch => {
    try {
      const response = await jwt.axiosInstance.get('api/user/condidat')
        console.log('reponse', response)
      if (Array.isArray(response.data) && response.data.length > 0) {
        const candidatData = response.data
         console.log("candidatData", response.data)
        dispatch({
          type: 'GET_CANDIDAT',
          data: candidatData
        })

         console.log('Données de candidatData:', candidatData)
      } else {
         console.log('Aucune donnée de candidatData trouvée dans la réponse.')
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error)
    }
  }
}
export const getMoniteur = () => {
  return async dispatch => {
    try {
      const response = await jwt.axiosInstance.get('api/user/moniteur')
       console.log('reponse', response)
      if (Array.isArray(response.data) && response.data.length > 0) {
        const moniteurData = response.data
        console.log("demandeData", response.data)
        dispatch({
          type: 'GET_MONITEUR',
          moniteur: moniteurData
        })

        console.log('Données de moniteurData:', moniteurData)
      } else {
         console.log('Aucune donnée de moniteurData trouvée dans la réponse.')
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error)
    }
  }
}
export const getVoiture = () => {
  return async dispatch => {
    try {
      const response = await jwt.axiosInstance.get('api/cars/car')
      //  console.log('reponse', response)
      if (Array.isArray(response.data) && response.data.length > 0) {
        const getVoitureData = response.data
        // console.log("getVoitureData", response.data)
        dispatch({
          type: 'GET_CAR',
          cars: getVoitureData
        })

        // console.log('Données de getVoitureData:', getVoitureData)
      } else {
         console.log('Aucune donnée de moniteurData trouvée dans la réponse.')
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error)
    }
  }
}
export const getDemandeEvent = () => {
  return async dispatch => {
    try {
      const response = await jwt.axiosInstance.get('api/calendrier/demande')
       console.log('reponse', response)
      if (Array.isArray(response.data) && response.data.length > 0) {
        // const getVoitureData = response.data
        console.log("getDemandeEvent", response.data)
        dispatch({
          type: 'GET_DEMANDE_EVENT',
          demandeEvent: response.data
        })

        // console.log('Données de getVoitureData:', getVoitureData)
      } else {
         console.log('Aucune donnée de moniteurData trouvée dans la réponse.')
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error)
    }
  }
}
export const getData = params => {
  return async dispatch => {
    try {
      const { date, perPage = 10, page = 1 } = params
// console.log('params', params)
      const response = await jwt.axiosInstance.get('api/calendrier/historiqe')
      let filteredData = response.data

      if (date) {
        // Filter data by the selected date
        filteredData = response.data.filter(user => (
          user.date_debut === date ||
          user.date_fin === date ||
          user.date_creation === date
        ))
      }

      const totalDataCount = filteredData.length
      const totalPages = Math.ceil(totalDataCount / perPage)
      const currentPage = Math.min(page, totalPages)
      const startIndex = (currentPage - 1) * perPage
      const endIndex = Math.min(startIndex + perPage, totalDataCount)
      const paginatedData = filteredData.slice(startIndex, endIndex)

      dispatch({
        type: 'GET_DATA',
        allData: paginatedData,
        filter: filteredData,
        params,
        totalDataCount,
        totalPages
      })
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error)
    }
  }
}

export const getTime = () => {
  return async dispatch => {
    try {

      const response = await jwt.axiosInstance.get('api/calendrier/temp')
       
      dispatch({
        type: 'GET_TEMP',
        temp:  response.data
       
      })
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error)
    }
  }
}
export const getEvent = () => {
  return async dispatch => {
    try {
      const response = await jwt.axiosInstance.get('api/calendrier/Event')
      //  console.log('reponse', response)
      if (Array.isArray(response.data) && response.data.length > 0) {
        const getEventData = response.data
        // console.log("getEventData", response.data)
        dispatch({
          type: 'GET_EVENT',
          eventData: getEventData
        })

        // console.log('Données de getEventData:', getEventData)
      } else {
         console.log('Aucune donnée de getEventData trouvée dans la réponse.')
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error)
    }
  }
}
export const getEventUser = (id) => {
  return async dispatch => {
    try {
      console.log('Fetching events for user ID:', id)
      const response = await jwt.axiosInstance.get(`api/calendrier/getAllCalendrier/${id}`)
      console.log('Response received:', response)

      dispatch({
        type: 'GET_EVENT_USER',
        eventUser: response.data
      })

      console.log('Event data dispatched to reducer')
    } catch (error) {
      console.error('An error occurred while fetching event data:', error)
    }
  }
}
// export const updateFilter = filter => {
//   return (dispatch, getState) => {
//     dispatch({
//       type: 'UPDATE_FILTERS',
//       filter
//     })
//     dispatch(fetchEvents(getState().calendar.selectedCalendars))
//   }
// }