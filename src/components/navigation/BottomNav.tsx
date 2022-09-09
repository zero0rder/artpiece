import { useNavigate, useLocation } from 'react-router-dom'
import { TabBar } from "antd-mobile"
import { AppOutline, UnorderedListOutline, SearchOutline, MessageOutline } from 'antd-mobile-icons'

const tabs = [
    {
      key: '/',
      title: 'Home',
      icon: <AppOutline />,
    },
    {
      key: '/exhibitions',
      title: 'Exhibitions',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/search',
      title: 'Search',
      icon: <SearchOutline />,
    },
    {
      key: '',
      title: 'Chat',
      icon: <MessageOutline />,
    },
]

const BottomNav = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const setRouteActive = (value: string) => navigate(value)
    
    return (
        <TabBar activeKey={pathname} onChange={v => setRouteActive(v)}>
            { tabs.map(t => <TabBar.Item key={t.key} icon={t.icon} title={t.title} />)}
        </TabBar>
    )
}

export default BottomNav