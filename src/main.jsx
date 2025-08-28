import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContextProvider.jsx'
import LabContextProvider from './context/LabContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <LabContextProvider>
      <App />
    </LabContextProvider>
  </AuthContextProvider>)