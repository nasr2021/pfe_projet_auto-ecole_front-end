// ** Initial State
const initialState = {
    allData: [],
    order:[],
    statEvent:[],
    superadmin:[],
    superorder:[],
    user:[],
    token:null,
    allNotif:[],
    selectedUser:[],
    statsData:[],
    error: null,
    selectedNotification: null
  }
  
  const statistiques = (state = initialState, action) => {
    switch (action.type) {
      case 'NOTIFICATION_LU':
        console.log('hhhhh', action.selectedNotification)
        return {
          ...state,
          selectedNotification: action.selectedNotification
        }
      case 'GET_USER_STATS_SUCCESS':
        console.log('action.statsData', action.statsData)
        return {
          ...state,
          statsData: action.statsData
        }
      case 'GET_USER_STATS_FAILURE':
        return {
          ...state,
          error: action.payload
        }
      case 'GET_USER':
        return { ...state, selectedUser: action.selectedUser }
      case 'GET_ALL_Notif':
        console.log('all allNotif', action.allNotif) // Correction ici
        return { ...state, allNotif: action.allNotif }
        case 'GET_ALL_STAT':
        console.log('all data', action.allData) // Correction ici
        return { ...state, allData: action.allData }
        case 'GET_ALL_STAT_SUPER_ADMIN':
          console.log('all superadmin', action.superadmin) // Correction ici
          return { ...state, superadmin: action.superadmin }
        case 'GET_ALL_ORDER':
        console.log('all ORDER', action.order) // Correction ici
        return { ...state, order: action.order }
        case 'GET_ALL_ORDER_SUPER_ADMIN':
          console.log('all superorder', action.superorder) // Correction ici
          return { ...state, superorder: action.superorder }
        case 'GET_ALL_EVENT_STAT':
          console.log('all statEvent', action.statEvent) // Correction ici
          return { ...state, statEvent: action.statEvent }
          case 'ADD_Token':
            console.log('stat', state)  
            console.log('action.token:', action.token)  
            return {
              ...state,
              token: action.token    
            }
          case 'GET_ALL_USER_STAT':
            console.log('all user', action.user) // Correction ici
            return { ...state, user: action.user }
      default:
        // console.log('Reducer default case triggered with state:', state, 'and action:', action)
        return state
    }
  }
  export default statistiques