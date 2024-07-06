import axios from 'axios'
import JwtService from '../../../@core/auth/jwt/jwtService'
import { getFirebaseToken } from '../../../firebaseConfig'
const jwt = new JwtService()
export const getData = (params = {}) => {
  return async dispatch => {
    try {
      const response = await jwt.axiosInstance.get('api/pack', { params })
      
      if (response.data.status === 'success' && Array.isArray(response.data.data)) {
        const packsData = response.data.data
        
        dispatch({
          type: 'GET_DATA',
          data: packsData, 
          params // Dispatch les paramètres sérialisables
        })
      } else {
        console.log('Aucune donnée valide trouvée dans la réponse.')
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error)
    }
  }
}

// export const getData = () => {
//   return async dispatch => {
//     try {
//       const response = await jwt.axiosInstance.get('api/pack')
//       // console.log('Réponse de l\'API :', response.data)
      
//       if (response.data.status === 'success' && Array.isArray(response.data.data)) {
//         const packsData = response.data.data
//         // console.log('Données de packs :', packsData)
        
//         dispatch({
//           type: 'GET_DATA',
//           data: packsData // Dispatch uniquement le tableau de données
//         })
//       } else {
//         console.log('Aucune donnée valide trouvée dans la réponse.')
//       }
//     } catch (error) {
//       console.error('Une erreur s\'est produite lors de la récupération des données :', error)
//     }
//   }
// }
export const getPack = id => {
    return async dispatch => {
      // console.log('idPack', id)
      try {
        const response = await jwt.axiosInstance.get(`/api/pack/${id}`)
        // console.log('reponse', response)
        dispatch({
          type: 'GET_PACK',
          selectedUser: response.data
        })
  
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  // ** Add new pack
  export const addPack = pack => {
  
    return async (dispatch, params) => {
      const firebaseToken = await getFirebaseToken() // Récupérer le token Firebase
      // Ajouter le token Firebase aux données de l'utilisateur
        console.log('User to be added firebaseToken:', firebaseToken)
      console.log('Pack to be added:', pack)
      jwt.axiosInstance
        .post('api/pack/custom', {pack, firebaseToken})
        .then(response => {
          console.log('POST success:', response.data)
          dispatch({
            type: 'ADD_PACK',
            pack: response.data
          })
          dispatch(getData(params))
          console.log('pack', pack)
            
        })
       
        .catch(err => console.error('POST error:', err)) 
    }
  }
  export const putPack = pack => {
  
    return (dispatch, params) => {
      // console.log('Pack to be added:', pack)
      jwt.axiosInstance
        .post('api/pack', pack)
        .then(response => {
          // console.log('POST success:', response.data)
          dispatch({
            type: 'PUT_PACK',
            updatedUser: response.data
          })
          dispatch(getData(params))
          // console.log('updatedUser', updatedUser)
            
        })
       
        .catch(err => console.error('POST error:', err)) 
    }
  }
  // export const AcheterPack = (idForfait) => {
  //   return async (dispatch, getStore) => {
  //     try {
  //       const response = await jwt.axiosInstance.post(`api/pack/${idForfait}/acheter`)
  
  //       // console.log('Purchase successful:', response.data)
  
  //       dispatch({
  //         type: 'ENVOYER_DEMANDE_PACK_SUCCESS',
  //         selectedUser: response.data 
  //       })
  //       .then(() => dispatch(getData(getStore().transaction.params)))
  //     } catch (error) {
  //       console.error('An error occurred while purchasing the pack:', error)
       
  //     }
  //   }
  // }
  export const AcheterPack = (idForfait) => {
    return async (dispatch, getState) => {
      try {
        const response = await jwt.axiosInstance.post(`api/pack/${idForfait}/acheter`)
  
        dispatch({
          type: 'ENVOYER_DEMANDE_PACK_SUCCESS',
          selectedUser: response.data 
        })
  
        // Appeler getData après le dispatch
        dispatch(getData(getState().transaction.params))
      } catch (error) {
        console.error('An error occurred while purchasing the pack:', error)
      }
    }
  }
  