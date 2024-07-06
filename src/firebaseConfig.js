// firebaseConfig.js
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

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

export const getFirebaseToken = async () => {
  try {
    const vapidKey = 'BMmpmD2edRSuhCklIoFbr582Q7-sQg14fEA2iAZYgaJy98fpDQRtpOXkHT0qIpop5zLvtNtqudNaZvVkU6QxBJM'
    const currentToken = await getToken(messaging, { vapidKey })
    if (currentToken) {
      console.log('currentToken:', currentToken)
      return currentToken
    } else {
      console.log('No registration token available. Request permission to generate one.')
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err)
  }
  return null
}