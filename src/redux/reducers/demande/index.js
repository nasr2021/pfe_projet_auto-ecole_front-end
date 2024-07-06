// ** Initial State
const initialState = {
    data: [],
    selectedUser: null,
    demande:[]
  }
  
  const demande = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_DATA':
        // console.log('Action GET_ALL_DATA triggered with payload:', action.allData)
        return { ...state, data: action.data }
        case 'ACCEPTER_DEMANDE_PACK_SUCCESS':
          const updatedData = state.data.filter(data => data.idDemande !== action.selectedUser.idDemande)
      return {
        ...state,
        data: updatedData,
        selectedUser: action.selectedUser
      }
      case 'REFUSER_DEMANDE_PACK_SUCCESS':
        const updated = state.data.filter(data => data.idDemande !== action.selectedUser.idDemande)
        return {
          ...state,
          data: updated,
          selectedUser: action.selectedUser
        }
        case 'ADD_DEMANDE':
          console.log('action.demande', action.demande)
          return { ...state,
            demande: [...state.demande, action.demande]
           }
      case 'DELETE_USER':
        return { ...state }
      default:
        // console.log('Reducer default case triggered with state:', state, 'and action:', action)
        return state
    }
  }
  export default demande