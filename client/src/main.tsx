import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import "../index.css"
import App from './App.tsx'
import { store } from './app/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </HashRouter>
    </Provider>
  </>,
)
