import axios from 'axios'
import JwtService from '../../../@core/auth/jwt/jwtService'

const jwt = new JwtService()

export const getUserStats = (id, role) => {
  return async dispatch => {
    try {
      console.log('èèèè')
      const response = await jwt.axiosInstance.get(`/api/user/getUserStats/${id}/${role}`)
     console.log('00000000', response)
      dispatch({
        type: 'GET_USER_STATS_SUCCESS',
        statsData: response.data
      })
    } catch (error) {
   
    }
  }
}
export const getUser = (id, role) => {
  return async dispatch => {
    console.log('idAction......', id)
    console.log('idrole.....', role)
    try {
      const response = await jwt.axiosInstance.get('/api/user/id/role')
      console.log('9999999999', response)
      dispatch({
        type: 'GET_USER',
        selectedUser: response.data
      })

    } catch (error) {
      console.log(error)
    }
  }
}
export const getNotification = () => {
  return async dispatch => {
    try {
    
      const response = await jwt.axiosInstance.get('api/notif')
console.log('response', response.data)
  
        dispatch({
          type: 'GET_ALL_Notif',
          allNotif:  response.data
        })
   
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error)
    }
  }
}
export const getStatestique = () => {
    return async dispatch => {
      try {
      
        const response = await jwt.axiosInstance.get('api/autoecole/statistiques')
  console.log('response', response.data)
    
          dispatch({
            type: 'GET_ALL_STAT',
            allData:  response.data
          })
     
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error)
      }
    }
  }
  export const getStatestiqueSuperAdmin = () => {
    return async dispatch => {
      try {
      
        const response = await jwt.axiosInstance.get('api/autoecole/StatestiqueSuperAdmin')
  console.log('response', response.data)
    
          dispatch({
            type: 'GET_ALL_STAT_SUPER_ADMIN',
            superadmin:  response.data
          })
     
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error)
      }
    }
  }
  export const getOrder = () => {
    return async dispatch => {
      try {
      
        const response = await jwt.axiosInstance.get('api/demande/statistiquesDemande')
  console.log('response', response.data)
    
          dispatch({
            type: 'GET_ALL_ORDER',
            order:  response.data
          })
     
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error)
      }
    }
  }
  export const getOrderSuperAdmin = () => {
    return async dispatch => {
      try {
      
        const response = await jwt.axiosInstance.get('api/demande/Demandestatistiques')
  console.log('response', response.data)
    
          dispatch({
            type: 'GET_ALL_ORDER_SUPER_ADMIN',
            superorder:  response.data
          })
     
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error)
      }
    }
  }
  export const getstatEvent = () => {
    return async dispatch => {
      try {
      
        const response = await jwt.axiosInstance.get('api/calendrier/statistiquesEvent')
  console.log('response', response.data)
    
          dispatch({
            type: 'GET_ALL_EVENT_STAT',
            statEvent:  response.data
          })
     
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error)
      }
    }
  }
  export const getstatUser = () => {
    return async dispatch => {
      try {
      
        const response = await jwt.axiosInstance.get('api/autoecole/getUserStatestique')
  console.log('response', response.data)
    
          dispatch({
            type: 'GET_ALL_USER_STAT',
            user:  response.data
          })
     
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error)
      }
    }
  }
 export const sendTokenToServer = async (token) => {
  return async dispatch => {
    try {
     const response = await jwt.axiosInstance.post('api/user/saveFirebaseToken', { token })
  console.log('reponse sendTokenToServer', response.data)
     dispatch({
      type: 'ADD_Token',
      token: response.data
    })
      console.log('Token sent to server')
  } catch (error) {
    console.error('Une erreur Failed to send token to server :', error)
  }
  }
  }

  export const Notification = (idNotif) => {
    return async (dispatch, getState) => {
      try {
        const response = await jwt.axiosInstance.put(`api/notif/${idNotif}`)
  console.log('res88.....', response)
        dispatch({
          type: 'NOTIFICATION_LU',
          selectedNotification: response.data 
        })
  
        // Appeler getData après le dispatch
        dispatch(getNotification(getState().statistiques.params))
      } catch (error) {
        console.error('An error occurred while purchasing the pack:', error)
      }
    }
  }