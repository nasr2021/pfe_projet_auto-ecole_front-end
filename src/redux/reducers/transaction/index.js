// ** Initial State
const initialState = {
    allData: []
  }
  
  const transaction = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_ALL_DATA':
        // console.log('Action GET_ALL_DATA triggered with payload:', action.allData)
        return { ...state, allData: Array.isArray(action.allData) ? action.allData : [] }
        case 'ADD_TRANSACTION':
          // console.log('stat', state)  
          // console.log('action.service:', action.service)  
          return {
            ...state,
            allData: Array.isArray(state.allData) ? [...state.allData, action.service] : [action.service]
           
          }
          case 'DELETE_USER':
            return { ...state }
      default:
        // console.log('Reducer default case triggered with state:', state, 'and action:', action)
        return state
    }
  }
  export default transaction
  