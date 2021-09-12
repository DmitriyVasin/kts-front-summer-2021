import * as React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon/StarIcon";
import { RepoItem } from "@store/GitHubStore/types";
import { Link } from "react-router-dom";

import styles from "./Card.module.scss";

type Props = {
  repoItem: RepoItem;
  handleOnClickCard: (e: React.MouseEvent<HTMLElement>) => void;
};

const Card: React.FC<Props> = ({ repoItem, handleOnClickCard }) => {
  return (
    <div
      className={styles.card}
      data-item={repoItem.id}
      onClick={handleOnClickCard}
    >
      <Avatar
        src={repoItem.owner.avatar_url}
        alt="avatar"
        letter={repoItem.name[0].toUpperCase()}
      />
      <div className={styles.description}>
        <div>
          <a className={styles.repoName} href={repoItem.html_url}>
            {repoItem.name}
          </a>
        </div>
        <div>
          <Link className={styles.orgName} to={repoItem.owner.html_url}>
            {repoItem.owner.login}
          </Link>
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
