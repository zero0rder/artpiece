import React from 'react'
import ReactDOM from 'react-dom/client'
import { SWRConfig } from 'swr';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App'
import Landing from './components/pages/Landing';
import SearchPage from './components/navigation/Search';
import Details from './components/pages/Details';
import Exhibitions from './components/pages/Exhibitions';
import './sass/site.scss'

const fetcher = (url: string) => fetch(url).then(res => res.json());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <SWRConfig value={{ fetcher: fetcher, revalidateOnFocus: false }}>
            <App/>
          </SWRConfig>
          }>
          <Route index element={<Landing/>}/>
          <Route path='/exhibitions' element={<Exhibitions/>}/>
          <Route path='/detail/:id' element={<Details/>}/>
          <Route path='/search' element={<SearchPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
