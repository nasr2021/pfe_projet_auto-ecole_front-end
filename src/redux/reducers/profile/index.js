// ** Initial State
const initialState = {
    allData: []
  }
  
  const profile = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_ALL_DATA':
        console.log('Action GET_ALL_DATA triggered with payload:', action.allData)
        return { ...state, allData: action.allData }


      default:
        console.log('Reducer default case triggered with state:', state, 'and action:', action)
        return state
    }
  }
  export default profile