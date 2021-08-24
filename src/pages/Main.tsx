import Card from 'components/Card/Card'
import SearchBox from 'components/SearchBox/SearchBox'
import * as React from 'react'
import './Main.css'

let start: any[] = []

const Main: React.FC = () => {

  const [repos, setRepos] = React.useState(start)

  React.useEffect(() => {
    fetch('https://api.github.com/orgs/ktsstudio/repos')
      .then(response => response.json())
      .then(response => {
        setRepos(response)
      })
  }, [])

  return <div className="grid">
    <SearchBox />
    {repos.map((i) => {
      return  <Card {...i} />
    })}
  </div>
}

export default Main