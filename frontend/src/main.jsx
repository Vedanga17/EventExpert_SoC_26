import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

// Redux imports
import { Provider } from 'react-redux'
import store from './store/store.js'

// this is a global setting; this ensures that the cookies which come from a different port are ALLOWED to enter, and not be
// discarded. our frontend is running on 5173, but uses cookies coming from the backend at port 8000. if not for this setting, 
// the cookies coming from the backend would be trashed away, causing multiple errors.
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)