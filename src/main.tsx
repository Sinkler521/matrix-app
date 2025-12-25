import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    // Sinkler521: strict mode removed for prod + to prevent rerenders in dev mode
  <App/>,
)
