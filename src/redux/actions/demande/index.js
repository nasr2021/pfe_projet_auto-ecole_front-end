import axios from 'axios'
import JwtService from '../../../@core/auth/jwt/jwtService'
import { getFirebaseToken } from '../../../firebaseConfig'
const jwt = new JwtService()
export const getData = () => {
  return async dispatch => {
    try {
      const response = await jwt.axiosInstance.get('api/demande')
      //  console.log('reponse', response)
      if (Array.isArray(response.data) && response.data.length > 0) {
        const demandeData = response.data
        console.log("demandeData", response.data)
        dispatch({
          type: 'GET_DATA',
          data: demandeData
        })

        // console.log('Données de demande:', demandeData)
      } else {
        // console.log('Aucune donnée de transaction trouvée dans la réponse.')
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error)
    }
  }
}
export const acheterPack = (demandeId) => {
  return async (dispatch, getState) => {
    try {
      const firebaseToken = await getFirebaseToken() // Récupérer le token Firebase
      // Ajouter le token Firebase aux données de l'utilisateur
        console.log('User to be added firebaseToken:', firebaseToken)
      const response = await jwt.axiosInstance.post(`api/pack/demandes/${demandeId}/accepter`,  { firebaseToken })

      console.log('Purchase successful:', response.data)

      // Mettre à jour l'état avec les données reçues du serveur
      dispatch({
        type: 'ACCEPTER_DEMANDE_PACK_SUCCESS',
        selectedUser: response.data // Assurez-vous que response.data contient les données mises à jour du utilisateur
      })

      // Ici, nous devons attendre la mise à jour de l'état avant de dispatcher getData()
      dispatch(getData())

      // Ajuster votre code ici si getData() est une action asynchrone
    } catch (error) {
      console.error('An error occurred while purchasing the pack:', error)
      // Gérer les erreurs ici si nécessaire
    }
  }
}

export const refuserPack = (demandeId) => {
  return async (dispatch, getState) => {
    try {
      const firebaseToken = await getFirebaseToken() // Récupérer le token Firebase
    // Ajouter le token Firebase aux données de l'utilisateur
      console.log('User to be added firebaseToken:', firebaseToken)

      const response = await jwt.axiosInstance.post(`api/pack/demandes/${demandeId}/refuser`, {firebaseToken})

      console.log('Refuse successful:', response.data)

      // Mettre à jour l'état avec les données reçues du serveur
      dispatch({
        type: 'REFUSER_DEMANDE_PACK_SUCCESS',
        selectedUser: response.data // Assurez-vous que response.data contient les données mises à jour du utilisateur
      })

      // Ici, nous devons attendre la mise à jour de l'état avant de dispatcher getData()
      await dispatch(getData())

      // Ajuster votre code ici si getData() est une action asynchrone
    } catch (error) {
      console.error('An error occurred while refusing the pack:', error)
      // Gérer les erreurs ici si nécessaire
    }
  }
}
export const deleteDemande = idPack => {
  return (dispatch, getStore) => {
    jwt.axiosInstance
      .delete(`/api/pack/${idPack}`)
      .then(response => {
        dispatch({
          type: 'DELETE_Pack'
        })
      })
        .then(() => dispatch(getData())) 
  }
}
export const addDemande = event => {
  return (dispatch, getState) => {
    jwt.axiosInstance.post('/api/pack/updateEvent', { event }).then((response) => {
      console.log('POST success:', response.data)
      dispatch({
        type: 'ADD_DEMANDE',
        demande: response.data
      })
      dispatch(getData())
    })
  }
}