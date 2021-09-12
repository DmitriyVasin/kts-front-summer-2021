import * as React from "react";

import Card from "@components/Card";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import SearchBox from "@components/SearchBox";
import "./Main.css";
import GitHubStore from "@store/GitHubStore";
import { RepoItems } from "@store/GitHubStore/types";

const gitHubStore = new GitHubStore();

let initial: RepoItems = [];
let selectedRepoInintial: string | null = null;

const Main: React.FC = () => {
  const [state, setstate] = React.useState({
    searchInputValue: "",
    isLoading: false,
    repos: initial,
    selectedRepo: selectedRepoInintial,
  });

  const handelOnChangeSearchInputValue = (value: string) => {
    setstate({ ...state, searchInputValue: value });
  };

  const handelOnClickSearchButton = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setstate({ ...state, isLoading: true });
    gitHubStore
      .getOrganizationReposList({
        organizationName: state.searchInputValue,
      })
      .then((result) => {
        if (result.success) {
          setstate({ ...state, repos: result.data, isLoading: false });
        } else {
          setstate({ ...state, repos: [], isLoading: false });
        }
      })
      .catch((error) => {
        /* eslint-disable no-console */
        console.log(error);
      });
  };

  const onClickCard = (fulname: string) => {
    const selectedRepo = fulname;
    setstate({
      ...state,
      selectedRepo: selectedRepo,
    });
  };

  const handelOnCloseDrawer = () => {
    setstate({
      ...state,
      selectedRepo: null,
    });
  };

  return (
    <div className="grid">
      <SearchBox
        searchInputValue={state.searchInputValue}
        handelOnChangeSearchInputValue={handelOnChangeSearchInputValue}
        handelOnClickSearchButton={handelOnClickSearchButton}
        isLoading={state.isLoading}
      />
      {state.repos.map((repoItem) => {
        return (
          <Card
            repoItem={repoItem}
            onClickCard={onClickCard}
            key={repoItem.id}
          />
        );
      })}
      {state.selectedRepo !== "" && (
        <RepoBranchesDrawer
          selectedRepo={state.selectedRepo}
          handelOnCloseDrawer={handelOnCloseDrawer}
        />
      )}
    </div>
  );
};

export default Main;
