// ** Initial State
const initialState = {
    allData: [],
    data: [],
    selectedUser: null
  }
  
  const packs = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DATA':
          // console.log('0000:', state)
        // console.log('0000:', action.data)
        return { ...state, data: action.data } 
      case 'GET_PACK':
        return { ...state, selectedUser: action.selectedUser }
        
      case 'ADD_PACK':
        // console.log('stat', state)  
        // console.log('action.user:', action.pack)  
        return {
          ...state,
          data: action.pack
         
        }
        case 'ENVOYER_DEMANDE_PACK_SUCCESS':
          return {
            ...state,
            selectedUser: action.selectedUser
          }
      case 'PUT_PACK':
        return {
          ...state,
          selectedUser:
          state.selectedUser && state.selectedUser.id === action.updatedUser.id ? action.updatedUser : state.selectedUser,
             error: null
        }
      default:
        return { ...state }
    }
  }
  export default packs