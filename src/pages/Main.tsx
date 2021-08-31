import * as React from "react";

import Card from "components/Card/Card";
import SearchBox from "components/SearchBox/SearchBox";

import "./Main.css";

import GitHubStore from "../store/GitHubStore/GitHubStore";

const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = "ktsstudio";

let start: any[] = [];

const Main: React.FC = () => {
  const [repos, setRepos] = React.useState(start);

  React.useEffect(() => {
    gitHubStore
      .getOrganizationReposList({
        organizationName: EXAMPLE_ORGANIZATION,
      })
      .then((result) => {
        /* eslint-disable no-console */
        console.log(result);
        setRepos(result.data);
      });
  }, []);

  return (
    <div className="grid">
      <SearchBox />
      {repos.map((i) => {
        return <Card {...i} key={i.id} />;
      })}
    </div>
  );
};

export default Main;
