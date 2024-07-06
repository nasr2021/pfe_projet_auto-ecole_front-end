
const initialState = {
  allData: [],
  data: [],
  permi:[],
  total: 1,
  params: {},
  totalDataCount: 0,
  selectedUser: null,
  contrat:null,
  img: undefined,
  passwordUpdateStatus: null,
  otp:null,
  passwordUpdateError: null,
  contratUrl: null
}
const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONTRAT':
      return {
        ...state,
        contratUrl: action.contratUrl
      }
    case 'GET_DATA':
      return {
        ...state,
        allData: action.allData,
        data: action.data,
        totalDataCount: action.totalDataCount,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_USER':
      return { ...state, selectedUser: action.selectedUser }
      case 'GET_PASSWORD':
        return { ...state, selectedUser: action.selectedUser }
      case 'IMG_USER':
        console.log('stat', state)
        console.log('action.imageUrl:', action.imageUrl) 
        return {
          ...state,
          img: action.imageUrl 
        }
      
      case 'ADD_USER':
        console.log('stat', state)  
        console.log('action.user:', action.user)  
        return {
          ...state,
          data: action.user
         
        }
        case 'ADD_OTP':
        console.log('stat', state)  
        console.log('action.OTP:', action.otp)  
        return {
          ...state,
          otp: action.otp
         
        }
        case 'PUT_OTP':
          return {
            ...state,
            passwordUpdateStatus: action.payload.message,
            passwordUpdateError: null  
          }
        case 'PUT_OTP_FAILURE':
          return {
            ...state,
            passwordUpdateStatus: null,
            passwordUpdateError: action.error 
          }
    case 'DELETE_USER':
      return { ...state }
      case 'PUT_USER':
        console.log('stat', state)
        console.log('action.selectedUser:', action.selectedUser)
        return {
          ...state,
          selectedUser: state.selectedUser && state.selectedUser.id === action.selectedUser.id ? action.selectedUser : state.selectedUser,
          error: null
        }
        case 'GET_PERMI':
          console.log('state', state)
          console.log('action.permis', action.permi)
          return { ...state, permi: action.permi }
        case 'PUT_OTP':
          console.log('stat', state)
          console.log('action.selectedUser:', action.selectedUser)
          return {
            ...state,
            selectedUser: state.selectedUser && state.selectedUser.id === action.selectedUser.id ? action.selectedUser : state.selectedUser,
            error: null
          }
      case 'PUT_USER_ERROR':
        return {
          ...state,
          error: action.error
        }
    default:
      return { ...state }
  }
}
export default users
