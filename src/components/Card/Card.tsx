import * as React from "react";

import "./Card.css";
import star from "img/star.svg";

const Card: React.FC = (props: any) => {
  return (
    <div className="card">
      <img className="avatar" src={props.owner.avatar_url} alt="avatar" />
      <div className="description">
        <div>
          <a className="repoName" href={props.html_url}>
            {props.name}
          </a>
        </div>
        <div>
          <a className="orgName" href={props.owner.html_url}>
            {props.owner.login}
          </a>
        </div>
        <div>
          <img src={star} alt="star" />
          <span>{props.stargazers_count}</span>
          <span>
            Updated{" "}
            {new Date(props.updated_at).toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
