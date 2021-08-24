import SearchBox from 'components/SearchBox/SearchBox'
import star from 'img/star.svg'
import * as React from 'react'
import './Main.css'

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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
      return <div className="card">
      <div className="avatar"><img src={i.owner.avatar_url} alt="avatar" /></div>
        <div className="description">
          <div className="repoName"><a href={i.html_url}>{i.name}</a></div>
          <div className="orgName"><a href={i.owner.html_url}>{i.owner.login}</a></div>
          <div><img src={star} alt="star" />
            <span>{i.stargazers_count}</span>
            <span>Updated {new Date(i.updated_at).getDay()} {monthNames[new Date(i.updated_at).getMonth()]}</span>
          </div>
        </div>
      </div>
    })}
  </div>
}

export default Main