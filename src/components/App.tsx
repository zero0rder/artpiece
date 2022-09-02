import { Outlet } from 'react-router-dom'
import TopNav from './navigation/TopNav'
import BottomNav from './navigation/BottomNav'
import { Search } from './navigation/Search'

function App() {
  return (
    <section className='app'>
      <TopNav/>
      <Search/>
      <Outlet/>
      <BottomNav/>
    </section>
  )
}

export default App
