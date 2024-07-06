import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'
import jwt from 'jsonwebtoken'

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  isAlreadyFetchingAccessToken = false
    subscribers = []
   onAccessTokenFetched(accessToken) {
     this.subscribers = this.subscribers.filter(callback => callback(accessToken))
   }
  jwtConfig = { ...jwtDefaultConfig }
  axiosInstance = axios.create({
    baseURL: 'http://localhost:3001', // Changer l'URL si nécessaire
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    },
    timeout: 5000
  });
  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (config.url === '/auth/login') {
          return config
        }
        const token = this.getToken()
        if (token) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

  }
  getToken() {
    return sessionStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }
  setToken(value) {
    sessionStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }
  login(...args) {
    return new Promise((resolve, reject) => {
        this.axiosInstance.post('/auth/login', ...args)
            .then(response => {
              const { tokens, role, avatar, usersConnect } = response.data
              const { access_token, refresh_token } = tokens
          
                sessionStorage.setItem('role', role)
              
                console.log('avatar', avatar)
                sessionStorage.setItem(this.jwtConfig.storageTokenKeyName, access_token)
                sessionStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, refresh_token)
              //  console.log('token',  access_token)
               
               const decodedToken = jwt.decode(access_token)
               
                const idRole = decodedToken.idRole
                const idUser = decodedToken.sub
                const user = decodedToken.username
                // console.log('user', user)
                // console.log('role', idRole)
                // console.log('id', idUser)
                sessionStorage.setItem('connect', usersConnect) 
                sessionStorage.setItem('avatar', avatar)
                sessionStorage.setItem('user', user)
                sessionStorage.setItem('idRole', idRole)
                sessionStorage.setItem('idUser', idUser)
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
  register(...args) {
    return this.axiosInstance.post('/auth/signup', ...args)
  } 
  
  addSubscriber(callback) {
    this.subscribers.push(callback)
  }
 getRefreshToken() {
    return sessionStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }
setRefreshToken(value) {
  sessionStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
}

refreshToken() {
    return axios.post('auth/refresh', {
      refreshToken: this.getRefreshToken()
    })
}
}
 // isAlreadyFetchingAccessToken = false

  // // ** For Refreshing Token
  // subscribers = []
  // onAccessTokenFetched(accessToken) {
  //   this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  // }

  // addSubscriber(callback) {
  //   this.subscribers.push(callback)
  // }
 // getRefreshToken() {
  //   return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  // }
// setRefreshToken(value) {
//   localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
// }

// refreshToken() {
  //   return axios.post(this.jwtConfig.refreshEndpoint, {
  //     refreshToken: this.getRefreshToken()
  //   })
  // }
    // ** Request Interceptor
    // this.axiosInstance.interceptors.request.use(
    //   config => {
    //     // ** Get token from localStorage
    //     const accessToken = this.getToken()

    //     // ** If token is present add it to request's Authorization Header
    //     if (accessToken) {
    //       // ** eslint-disable-next-line no-param-reassign
    //       config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
    //     }
    //     return config
    //   },
    //   error => Promise.reject(error)
    // )

    // ** Add request/response interceptor
    // axios.interceptors.response.use(
    //   response => response,
    //   error => {
    //     // ** const { config, response: { status } } = error
    //     const { config, response } = error
    //     const originalRequest = config

    //     // ** if (status === 401) {
    //     if (response && response.status === 401) {
    //       if (!this.isAlreadyFetchingAccessToken) {
    //         this.isAlreadyFetchingAccessToken = true
    //         this.refreshToken().then(r => {
    //           this.isAlreadyFetchingAccessToken = false

    //           // ** Update accessToken in localStorage
    //           this.setToken(r.data.accessToken)
    //           this.setRefreshToken(r.data.refreshToken)

    //           this.onAccessTokenFetched(r.data.accessToken)
    //         })
    //       }
    //       const retryOriginalRequest = new Promise(resolve => {
    //         this.addSubscriber(accessToken => {
    //           // ** Make sure to assign accessToken according to your response.
    //           // ** Check: https://pixinvent.ticksy.com/ticket/2413870
    //           // ** Change Authorization header
    //           originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
    //           resolve(this.axios(originalRequest))
    //         })
    //       })
    //       return retryOriginalRequest
    //     }
    //     return Promise.reject(error)
    //   }
    // )