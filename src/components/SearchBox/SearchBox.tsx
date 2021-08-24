import SearchButton from 'components/SearchButton/SearchButton'
import SearchInput from 'components/SearchInput/SearchInput'
import * as React from 'react'
import './SearchBox.css'

const SearchBox : React.FC = () => {
  return <div className="searchBox">
    <SearchInput />
    <SearchButton />
  </div>
}

export default SearchBox