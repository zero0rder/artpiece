import useSWR from 'swr';
import { useNavigate, useLocation } from 'react-router-dom'
import { ErrorBlock, SearchBar, List, DotLoading, Image, Loading } from "antd-mobile"

type QueryType = {
    query: string;
}

function SearchPage() {
    const location = useLocation()
    const { query } = location.state ? location.state as QueryType : { query: null }
    const { data: payload, error, isValidating } = useSWR(query ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/artworks/search?q=${query}` : null)

    if(error) console.error(error)
    if(isValidating) return <DotLoading />

    return (  
        <section className='search-page'>
            <List mode='card' header={ query ? `Results for ${ query }:` : '' }>
                {
                    query ? payload?.data?.map((r: any, i: number) => (
                        <List.Item 
                            key={i} 
                            prefix={ <Image
                            src={r?.thumnbnail?.lqip} 
                            fit='cover' 
                            width={40} 
                            height={40}
                            alt={r?.thumnbnail?.alt_text}/>}
                            description={r?.title}
                            onClick={(e) => console.log('result:click', e)}/>
                    )) : <NoResultsBlock/>
                }
            </List>
        </section>
    )
}

export default SearchPage

const ResultsErrorBlock = () => <ErrorBlock status='disconnected' title='Search Error!'/>
const NoResultsBlock = () => <ErrorBlock fullPage status='empty' title='No Results!' description='Please start your search...' />

export const Search = () => {
    const navigate = useNavigate()
    const handleSearch = (q: string) => {
        navigate('/search', { state: { query: q} })
    }

    return <SearchBar 
            placeholder='Search...' 
            onSearch={(e) => handleSearch(e)} 
            style={{ '--height': '40px', margin: '1rem' }}/>
    
}