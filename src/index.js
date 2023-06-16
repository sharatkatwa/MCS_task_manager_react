import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { store } from './store'

import App from './App'

const el = document.getElementById('root')
const root = ReactDOM.createRoot(el)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
