// // ** Redux, Thunk & Root Reducer Imports
// import thunk from 'redux-thunk'
// import createDebounce from 'redux-debounced'

// import { createStore, applyMiddleware, compose } from 'redux'

// // ** init middleware
// const middleware = [thunk, createDebounce()]

// // ** Dev Tools
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// // ** Create store
// const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)))

// export { store }

// import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from '../reducers/rootReducer'

// const store = configureStore({
//   reducer: rootReducer
// })

// export { store }
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export  {store}
