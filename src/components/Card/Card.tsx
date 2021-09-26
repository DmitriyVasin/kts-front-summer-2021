import * as React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon/StarIcon";
import { RepoItemModel } from "@store/models/gitHub";

import styles from "./Card.module.scss";

type Props = {
  repoItem: RepoItemModel;
  onClickCard: (id: string) => void;
};

const Card: React.FC<Props> = ({ repoItem, onClickCard }) => {
  return (
    <div
      className={styles.card}
      onClick={() => {
        onClickCard(repoItem.id);
      }}
    >
      <Avatar
        src={repoItem.owner.avatarUrl}
        alt="avatar"
        letter={repoItem.name[0].toUpperCase()}
      />
      <div className={styles.description}>
        <div>
          <a className={styles.repoName} href={repoItem.htmlUrl}>
            {repoItem.name}
          </a>
        </div>
        <div>
          <a className={styles.orgName} href={repoItem.owner.htmlUrl}>
            {repoItem.owner.login}
          </a>
        </div>
        <div>
          <StarIcon />
          <span>{repoItem.stargazersCount}</span>
          <span>
            Updated{" "}
            {repoItem.updatedAt.toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
