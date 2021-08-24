import * as React from 'react'
import './SearchButton.css'
import magnifier from 'img/magnifier.svg'

const SearchButton : React.FC = () => {
  return <button className="searchButton">
    <img src={magnifier} alt="search" />
  </button>
}

export default SearchButton