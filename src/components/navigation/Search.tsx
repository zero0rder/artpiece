import useSWR from 'swr';
import { useNavigate, useLocation } from 'react-router-dom'
import { ErrorBlock, SearchBar, DotLoading, Image, Collapse } from "antd-mobile"

type QueryType = {
    query: string;
}

function SearchPage() {
    const location = useLocation()
    const { query } = location.state ? location.state as QueryType : { query: null }
    const { data: payload, error, isValidating } = useSWR(query ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/artworks/search?q=${query}` : null)

    if(error) return <ResultsErrorBlock/>
    if(isValidating) return <DotLoading className='loading'/>

    return (  
        <section className='search-page'>
            {
                query ? payload?.data?.map((r: any, i: number) => (
                    <Collapse defaultActiveKey={['1']}>
                        <Collapse.Panel key={`[${i}]`} title={r?.title}>
                            <Image
                                src={r?.thumbnail?.lqip} 
                                fit='cover' 
                                width={45} 
                                height={45}
                                alt={r?.thumbnail?.alt_text}/>
                            <p>{r?.thumbnail?.alt_text}</p>
                        </Collapse.Panel>
                    </Collapse>
                )) : <NoResultsBlock/>
            }
        </section>
    )
}

export default SearchPage

const ResultsErrorBlock = () => <ErrorBlock fullPage status='busy' title='Search Error!' description='Please restart your search...'/>
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