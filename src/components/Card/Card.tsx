import * as React from 'react'
import './Card.css'
import star from 'img/star.svg'
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const Card: React.FC = (props: any) => {
  return <div className="card">
    <div className="avatar"><img src={props.owner.avatar_url} alt="avatar" /></div>
    <div className="description">
      <div className="repoName"><a href={props.html_url}>{props.name}</a></div>
      <div className="orgName"><a href={props.owner.html_url}>{props.owner.login}</a></div>
      <div><img src={star} alt="star" />
        <span>{props.stargazers_count}</span>
        <span>Updated {new Date(props.updated_at).getDay()} {monthNames[new Date(props.updated_at).getMonth()]}</span>
      </div>
    </div>
  </div>
}

export default Card