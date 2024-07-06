import axios from 'axios'
import JwtService from '../../../@core/auth/jwt/jwtService'

const jwt = new JwtService()
export const getData = () => {
  return async dispatch => {
    try {
    
      const response = await jwt.axiosInstance.get('api/tarif')

      if (Array.isArray(response.data) && response.data.length > 0) {
        const transactionData = response.data
        dispatch({
          type: 'GET_ALL_DATA',
          allData: transactionData
        })

  
      } else {
    
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error)
    }
  }
}
export const addService = (service) => (dispatch) => {
  // console.log('Service data to be added:', service)
  jwt.axiosInstance
    .post('api/tarif', service) // Assuming this is your endpoint for adding data
    .then((response) => {
      // console.log('POST success:', response.data)
      dispatch({
        type: 'ADD_TRANSACTION',
        service: response.data // Assuming your response data is an object
      })
      dispatch(getData()) // Refresh data after adding
    })
    .catch((err) => console.error('POST error:', err))
}
export const deleteService = id => {
  return (dispatch, getStore) => {
    jwt.axiosInstance
      .delete(`api/tarif/${ id }`)
      .then(response => {
        dispatch({
          type: 'DELETE_TARIFICATION'
        })
      })
      .then(() => dispatch(getData(getStore().transaction.params)))
  }
}