// ** Initial State
const initialState = {
    allData: [],
    data: [],
    total: 1,
    params: {},
    totalDataCount: 0,
    selectedUser: null
  }
  
  const cars = (state = initialState, action) => {
    switch (action.type) {
  
      case 'GET_DATA':
        return {
          ...state,
          allData: action.allData,
          data: action.data,
          totalDataCount: action.totalDataCount,
          total: action.totalPages,
          
          // params: {
          //   ...state.params,
          //   page: action.params.page
          // }
           params: action.params
        }
      case 'GET_CAR':
        return { ...state, selectedUser: action.selectedUser }
        
      case 'ADD_CAR':
        // console.log('stat', state)  
        // console.log('action.CAR:', action.cars)  
        return {
          ...state,
          data: action.cars
         
        }
      
      case 'DELETE_CAR':
        return { ...state }
      case 'PUT_CAR':
        return {
          ...state,
          selectedUser: state.selectedUser && state.selectedUser.id === action.updatedUser.id ? action.updatedUser : state.selectedUser,
          error: null
        }
      default:
        return { ...state }
    }
  }
  export default cars