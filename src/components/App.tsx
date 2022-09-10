import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import TopNav from './navigation/TopNav'
import BottomNav from './navigation/BottomNav'
import { Search } from './navigation/Search'
import { ErrorBlock } from 'antd-mobile'

const viewportQuery = window.matchMedia('(max-width: 448px)')
function App() {
  const [isMobile, setIsMobile] = useState<boolean>(viewportQuery.matches)

  useEffect(() => {
    viewportQuery.onchange = () => setIsMobile(viewportQuery.matches)
  }, [])

  if(!isMobile) return <ErrorBlock fullPage status='disconnected' title='Mobile Only!' description='Please use mobile viewport...'/>

  return (
    <section className='app'>
      <TopNav/>
      <Search/>
      <div className='outlet-container'>
        <Outlet/>
      </div>
      <BottomNav/>
    </section>
  )
}

export default App
