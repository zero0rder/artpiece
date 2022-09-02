import { SearchBar } from "antd-mobile"

function SearchPage() {
    return (  
        <p>SearchPage</p>
    )
}

export default SearchPage

export const Search = () => <SearchBar placeholder='Search...' onSearch={(e) => console.log('onSearch', e)} style={{ '--height': '40px', margin: '1rem' }}/>;