// ** React Imports
import React, { Suspense, lazy } from 'react'

import ReactDOM from 'react-dom/client'
// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from './redux/storeConfig/store'

// ** Intl, CASL & ThemeColors Context
import ability from './configs/acl/ability'
import { ToastContainer } from 'react-toastify'
import { AbilityContext } from './utility/context/Can'
import { ThemeContext } from './utility/context/ThemeColors'
import { IntlProviderWrapper } from './utility/context/Internationalization'

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner'

// ** Ripple Button
import './@core/components/ripple-button'

// ** Fake Database
import './@fake-db'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Toastify
import '@styles/react/libs/toastify/toastify.scss'

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/core.scss'
import './assets/scss/style.scss'

// ** Service Worker
import * as serviceWorker from './serviceWorker'

import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'
import { getFirebaseToken } from './firebaseConfig'

// Initialisation de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCUdC-ZXrw59BsXIzkPMW2e53y1n5bXOik",
  authDomain: "autoecole-23d79.firebaseapp.com",
  projectId: "autoecole-23d79",
  storageBucket: "autoecole-23d79.appspot.com",
  messagingSenderId: "146355821473",
  appId: "1:146355821473:web:34d960175398be0c29c9e0",
  measurementId: "G-RERERDFTFW"
}

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

navigator.serviceWorker
  .register('/firebase-messaging-sw.js')
  .then((registration) => {
    console.log('Service Worker registered with scope:', registration.scope)
    getFirebaseToken() // Appel de la fonction pour obtenir le token
  })
  .catch((err) => {
    console.log('Service Worker registration failed:', err)
  })
// ** Lazy load app
const LazyApp = lazy(() => import('./App'))
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <AbilityContext.Provider value={ability}>
        <ThemeContext>
          <IntlProviderWrapper>
            <LazyApp />
            <ToastContainer newestOnTop />
          </IntlProviderWrapper>
        </ThemeContext>
      </AbilityContext.Provider>
    </Suspense>
  </Provider>
)

serviceWorker.unregister()
