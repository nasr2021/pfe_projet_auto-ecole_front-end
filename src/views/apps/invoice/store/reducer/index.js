const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  totalDataCount: 0,
  allData: [],
  selectedUser: null
}

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        allData: action.allData,
        data: action.data,
        totalDataCount: action.totalDataCount,
        total: action.totalPages,
        params: action.params
      }
      case 'GET_INVOICE':
        return { ...state, selectedUser: action.selectedUser }
        
      case 'ADD_INVOICE':
        console.log('stat', state)  
        console.log('action.autoecole:', action.autoecole)  
        return {
          ...state,
          data: action.autoecole
         
        }
        case 'PUT_INVOICE':
          return {
            ...state,
            data: state.data.map(item => {
              if (item.id === action.updatedUser.id) {
                return action.updatedUser
              }
              return item
            }),
            selectedUser: action.updatedUser,
            error: null
          }
    case 'DELETE_INVOICE':
      return { ...state }
    default:
      return { ...state }
  }
}
export default invoiceReducer
