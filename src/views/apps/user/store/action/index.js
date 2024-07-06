import axios from 'axios'
import JwtService from '../../../../../@core/auth/jwt/jwtService'
import { getFirebaseToken } from '../../../../../firebaseConfig'
const jwt = new JwtService()
// ** Get User
export const getData = params => {
  return async dispatch => {
    try {
      const { q = '', perPage = 10, page = 1, role = null, currentPlan = null, status = null } = params

      const response = await jwt.axiosInstance.get('api/user/user/autoecole', { params })

      const filteredData = response.data.filter(user => (
        ((user.nom && user.nom.toLowerCase().includes(q.toLowerCase())) || 
        (user.username && user.username.toLowerCase().includes(q.toLowerCase()))) &&
        user.emploi === (role || user.emploi) &&
        user.genre === (currentPlan || user.genre) &&
        (status ? (user.condidat && user.condidat.contrats.length > 0 && user.condidat.contrats[0].permi?.type?.startsWith(status)) : true)

        // (status ? user.condidat?.contrats[0]?.permi?.type=== status : true)
      ))

      const totalDataCount = filteredData.length

      const totalPages = Math.ceil(totalDataCount / perPage)

      const currentPage = Math.min(page, totalPages)

      const startIndex = (currentPage - 1) * perPage
      const endIndex = Math.min(startIndex + perPage, totalDataCount)

      const paginatedData = filteredData.slice(startIndex, endIndex)

      dispatch({
        type: 'GET_DATA',
        allData: response.data.users, // Assurez-vous que response.data.users est correctement défini
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
export const getUser = id => {
  return async dispatch => {
    console.log('idAction', id)
    try {
      const response = await jwt.axiosInstance.get(`/api/user/${id}`)
      console.log('reponse', response)
      dispatch({
        type: 'GET_USER',
        selectedUser: response.data
      })

    } catch (error) {
      console.log(error)
    }
  }
}

export const genereContrat = id => {
  return async dispatch => {
    try {
      const response = await jwt.axiosInstance.get(`/api/user/paiements/${id}/paiements`, { responseType: 'blob' })

      // Création d'une URL Blob pour le téléchargement
      const blobUrl = URL.createObjectURL(response.data)

      // Téléchargement direct en utilisant l'URL Blob
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = 'contrat.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Révoquer l'URL Blob après utilisation pour libérer la mémoire
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Erreur lors du téléchargement du contrat PDF:', error)
    }
  }
}

export const getPassword = (username) => {
  return async (dispatch) => {
    console.log('userNameAction', username)
    try {
      const response = await jwt.axiosInstance.post('/api/user/password', { username })
      console.log('response', response)
      dispatch({
        type: 'GET_PASSWORD',
        selectedUser: response.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

// ** Add new user
export const addUser = user => {

  return async (dispatch, params) => {
    console.log('User to be added:', user)
    const firebaseToken = await getFirebaseToken() // Récupérer le token Firebase
    const userWithToken = { ...user, firebaseToken } // Ajouter le token Firebase aux données de l'utilisateur
    console.log('User to be added firebaseToken:', firebaseToken)
    console.log('User to be added:', userWithToken)
    jwt.axiosInstance
      .post('api/user', userWithToken)
      .then(response => {
        console.log('POST success:', response.data)
        dispatch({
          type: 'ADD_USER',
          user: response.data
        })
        dispatch(getData(params))
       
      console.log('user', userWithToken)
          
      })
     
      .catch(err => console.error('POST error:', err)) 
  }
}
export const otp = () => {
  return (dispatch) => {
    jwt.axiosInstance
      .post('/api/user/generate-and-send-otp')
      .then(response => {
        console.log('POST success:', response)
        dispatch({
          type: 'ADD_OTP',
          otp: response.data
        })
        console.log('otp', otp)
      })
      .catch(err => console.error('POST error:', err))
  }
}

export const uploadImg = (formData) => async (dispatch) => {
  try {
    console.log('formData:', formData) 

    const response = await jwt.axiosInstance.post('/api/user/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log('API response:', response.data) 

    const imageUrl = response.data
    console.log('response.data:', imageUrl) 

    dispatch({
      type: 'IMG_USER',
      imageUrl
    })

    console.log('Dispatched IMG_USER action with imageUrl:', imageUrl)
    return response.data
  } catch (error) {
    console.error('Failed to upload image:', error)
    throw error
  }
}
export const putUser = (idUser, updatedUser) => {
  const img = updatedUser
  console.log('img', img)

  return async (dispatch) => {
    console.log('idUser', idUser)
    console.log('updatedUser', updatedUser)
    try {
      const response = await jwt.axiosInstance.put(`/api/user/${idUser}`, updatedUser)
      console.log('response', response)
      dispatch({
        type: 'PUT_USER',
        selectedUser: response.data
      })

    return response.data
    } catch (error) {
      console.error('Failed to update user:', error)
      dispatch({
        type: 'PUT_USER_ERROR',
        error: 'Failed to update user'
      })
    }
  }
}


export const updatePasswordWithOTP = (dto) => {
  console.log('dto', dto)
  return async (dispatch) => {
    try {
      const response = await jwt.axiosInstance.post('auth/update-password-with-otp', dto)
      console.log('response', response)
      dispatch({
        type: 'PUT_OTP',
        payload: response.data
      })
      console.log('Password updated successfully:', response.data)
    } catch (error) {
      console.error('Failed to update password:', error)
      dispatch({
        type: 'PUT_OTP_FAILURE',
        error: error.response ? error.response.data : 'Failed to update password.'
      })
    }
  }
}
// ** Delete user
export const deleteUser = idUser => {
  return (dispatch, getState) => {
    jwt.axiosInstance
      .delete(`/api/user/${idUser}`)
      .then(response => {
        dispatch({
          type: 'DELETE_USER'
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))

      })
  }
}

export const getPermi = () => {
  return async dispatch => {
    try {
      const response = await jwt.axiosInstance.get('api/user/permi')
       console.log('reponse', response)
      if (Array.isArray(response.data) && response.data.length > 0) {
        const getPermiData = response.data
         console.log("getPermiData", response.data)
        dispatch({
          type: 'GET_PERMI',
          permi: getPermiData
        })

        // console.log('Données de getVoitureData:', getVoitureData)
      } else {
         console.log('Aucune donnée de moniteurData trouvée dans la réponse.')
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error)
    }
  }
}