
import JwtService from "../../../@core/auth/jwt/jwtService"
const jwt = new JwtService()

export const getData = params => {
    return async dispatch => {
      try {
        const { q = '', perPage = 9, page = 1 } = params
  
        const response = await jwt.axiosInstance.get('api/cars/autoecole', { params })
        const filteredData = response.data.filter(car => (
          (car.marque && car.marque.toLowerCase().includes(q.toLowerCase())) ||
          (car.modele && car.modele.toLowerCase().includes(q.toLowerCase())) ||
          (car.couleur && car.couleur.toLowerCase().includes(q.toLowerCase())) ||
          (car.statut && car.statut.toLowerCase().includes(q.toLowerCase()))
        ))
  
        const totalDataCount = filteredData.length
        const totalPages = Math.ceil(totalDataCount / perPage)
        const currentPage = Math.min(page, totalPages)
        const startIndex = (currentPage - 1) * perPage
        const endIndex = Math.min(startIndex + perPage, totalDataCount)
        const paginatedData = filteredData.slice(startIndex, endIndex)
  
        dispatch({
          type: 'GET_DATA',
          allData: response.data,
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
export const getCar = id => {
  return async dispatch => {
    // console.log('idAction', id)
    try {
      const response = await jwt.axiosInstance.get(`/api/cars/car/${id}`)
      // console.log('reponse', response)
      dispatch({
        type: 'GET_CAR',
        selectedUser: response.data
      })

    } catch (error) {
      console.log(error)
    }
  }
}

// ** Add new user
export const addCar = cars => {

  return (dispatch, params) => {
    // console.log('cars to be added:', cars)
    jwt.axiosInstance
      .post('api/cars', cars)
      .then(response => {
        // console.log('POST success:', response.data)
        dispatch({
          type: 'ADD_CAR',
          cars: response.data
        })
        dispatch(getData(params))
        // console.log('cars', cars)
          
      })
     
      .catch(err => console.error('POST error:', err)) 
  }
}


// ** Delete user
export const deleteCar = idcars => {
  return (dispatch, getState) => {
    jwt.axiosInstance
      .delete(`/api/cars/${idcars}`)
      .then(response => {
        dispatch({
          type: 'DELETE_CAR'
        })
      })
      .then(() => {
        dispatch(getData(getState().cars.params))

      })
  }
}

export const putCar = (idcars, updatedUser) => {
  
  return async (dispatch) => {
    // console.log('idcars', idcars)
    // console.log('updatedUser', updatedUser)
    try {
      const response = await jwt.axiosInstance.put(`/api/cars/${idcars}`, updatedUser)
      // console.log('response', response)
      dispatch({
        type: 'PUT_CAR',
        selectedUser: response.data
      })
    } catch (error) {
      // console.error('Failed to update cars:', error)
      dispatch({
        type: 'PUT_CAR_ERROR',
        error: 'Failed to update cars'
      })
    }
  }
}