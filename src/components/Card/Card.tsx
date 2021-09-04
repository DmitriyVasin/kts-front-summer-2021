import * as React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon/StarIcon";

import "./Card.css";

type Props = {
  repoItem: any;
  handelOnClickCard: (e: React.SyntheticEvent<HTMLElement>) => void;
};

const Card: React.FC<Props> = ({ repoItem, handelOnClickCard }) => {
  return (
    <div
      className="card"
      onClick={handelOnClickCard}
      data-item={repoItem.full_name}
    >
      <Avatar
        src={repoItem.owner.avatar_url}
        alt="avatar"
        letter={repoItem.name[0].toUpperCase()}
      />
      <div className="description">
        <div>
          <a className="repoName" href={repoItem.html_url}>
            {repoItem.name}
          </a>
        </div>
        <div>
          <a className="orgName" href={repoItem.owner.html_url}>
            {repoItem.owner.login}
          </a>
        </div>
        <div>
          <StarIcon />
          <span>{repoItem.stargazers_count}</span>
          <span>
            Updated{" "}
            {new Date(repoItem.updated_at).toLocaleString("en-GB", {
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
