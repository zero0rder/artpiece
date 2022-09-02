import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App'
import Landing from './components/pages/Landing';
import SearchPage from './components/navigation/Search';
import Details from './components/pages/Details';
import Collections from './components/pages/Collections';
import './sass/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Landing/>}/>
          <Route path='/collections' element={<Collections/>}/>
          <Route path='/detail/:id' element={<Details/>}/>
          <Route path='/search' element={<SearchPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
