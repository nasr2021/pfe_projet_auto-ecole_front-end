// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig

// ** Handle User Login
export const handleLogin = data => {

  return dispatch => {
    
    dispatch({
      type: 'LOGIN',
      data,
      config,
      [config.storageTokenKeyName]: data[config.storageTokenKeyName],
      [config.storageRefreshTokenKeyName]: data[config.storageRefreshTokenKeyName]
    })

    // ** Add to user, accessToken & refreshToken to localStorage
    // sessionStorage.setItem('connect', JSON.stringify(data))
    sessionStorage.setItem('userData', JSON.stringify(data))
    sessionStorage.getItem(config.storageTokenKeyName, JSON.stringify(data.accessToken))
    sessionStorage.getItem(config.storageRefreshTokenKeyName, JSON.stringify(data.refreshToken))
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null })

    // ** Remove user, accessToken & refreshToken from localStorage
    sessionStorage.removeItem('connect')
    sessionStorage.removeItem('avatar')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('idUser')
    sessionStorage.removeItem('idRole')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('userData')
    sessionStorage.removeItem(config.storageTokenKeyName)
    sessionStorage.removeItem(config.storageRefreshTokenKeyName)
  }
}
