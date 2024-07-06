import axios from 'axios'

import JwtService from '../../../../../@core/auth/jwt/jwtService'
const jwt = new JwtService()
export const getData = params => {
  return async dispatch => {
    try {
      const { q = '', perPage = 10, page = 1, role = null, currentPlan = null, status = null } = params

      const response = await jwt.axiosInstance.get('api/autoecole', { params })
     
      const filteredData = response.data.filter(user => (
        (user.nom.toLowerCase().includes(q.toLowerCase()) || user.adresse.toLowerCase().includes(q.toLowerCase())) 
         &&
        // user.role === (role || user.role) &&
        // user.currentPlan === (currentPlan || user.currentPlan) &&
        user.status === (status || user.status)
      ))
      const totalDataCount = filteredData.length
      const totalPages = Math.ceil(totalDataCount / perPage)
      const currentPage = Math.min(page, totalPages)
      const startIndex = (currentPage - 1) * perPage
      const endIndex = Math.min(startIndex + perPage, totalDataCount)
      const paginatedData = filteredData.slice(startIndex, endIndex)
      dispatch({
        type: 'GET_DATA',
        allData: response.data.users,
        data: paginatedData,
        totalPages,
        totalDataCount,
        params
      })
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error)
    }
  }
}
// ** Delete Invoice
export const deleteInvoice = id => {
  return (dispatch, getStore) => {
    jwt.axiosInstance
      .delete(`api/autoecole/${ id }`)
      .then(response => {
        dispatch({
          type: 'DELETE_INVOICE'
        })
      })
      .then(() => dispatch(getData(getStore().invoice.params)))
  }
}
export const addInvoice = autoecole => {

  return (dispatch, getState) => {
    console.log('Invoice to be added:', autoecole)
    jwt.axiosInstance
      .post('/api/autoecole', autoecole)
      .then(response => {
        console.log('POST success:', response.data)
        
        dispatch({
          type: 'ADD_INVOICE',
          autoecole: response.data
        })
        const state = getState()
        const { currentPage, rowsPerPage, statusValue, value } = state.invoice

        dispatch(getData({
          page: currentPage,
          perPage: rowsPerPage,
          status: statusValue,
          q: value
        }))
        // dispatch(getData(params))
        console.log('INVOICE', autoecole)
          
      })
     
      .catch(err => console.error('POST error:', err)) 
  }
}
export const putInvoice = (idAutoecole) => {
  return async (dispatch) => {
    console.log('idAutoecole', idAutoecole)
    console.log('updatedINVOICE', idAutoecole.id)
    try {
      const response = await jwt.axiosInstance.put(`/api/autoecole/${idAutoecole.id}`, idAutoecole)
      console.log('response', response)
      dispatch({
        type: 'PUT_INVOICE',
        updatedUser: response.data
      })
      // Re-fetch the data to update the state
      dispatch(getData())
    } catch (error) {
      console.error('Failed to update INVOICE:', error)
      dispatch({
        type: 'PUT_INVOICE_ERROR',
        error: 'Failed to update INVOICE'
      })
    }
  }
}

// export const putInvoice = (idAutoecole) => {
  
//   return async (dispatch) => {

//     console.log('idAutoecole', idAutoecole)
//     console.log('updatedINVOICE', idAutoecole.id)
//     try {
//       const response = await jwt.axiosInstance.put(`/api/autoecole/${idAutoecole.id}`, idAutoecole)
//       console.log('response', response)
//       dispatch({
//         type: 'PUT_INVOICE',
//         selectedUser: response.data
//       })
//     } catch (error) {
//       console.error('Failed to update INVOICE:', error)
//       dispatch({
//         type: 'PUT_INVOICE_ERROR',
//         error: 'Failed to update INVOICE'
//       })
//     }
//   }
// }
export const getInvoice = id => {
  return async dispatch => {
    console.log('idAction', id)
    try {
      const response = await jwt.axiosInstance.get(`/api/autoecole/${id}`)
      console.log('reponse', response)
      dispatch({
        type: 'GET_INVOICE',
        selectedUser: response.data
      })

    } catch (error) {
      console.log(error)
    }
  }
}
