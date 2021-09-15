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
  const [state, setState] = React.useState({
    searchInputValue: "",
    isLoading: false,
    repos: initial,
    selectedRepo: selectedRepoInintial,
  });

  const handelOnChangeSearchInputValue = (value: string) => {
    setState({ ...state, searchInputValue: value });
  };

  const handelOnClickSearchButton = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setState({ ...state, isLoading: true });
    try {
      const result = await gitHubStore.getOrganizationReposList({
        organizationName: state.searchInputValue,
      });
      if (result.success) {
        setState({ ...state, repos: result.data, isLoading: false });
      } else {
        setState({ ...state, repos: [], isLoading: false });
      }
    } catch (error) {
      /* eslint-disable no-console */
      console.log(error);
    }
  };

  const onClickCard = (fulname: string) => {
    const selectedRepo = fulname;
    setState({
      ...state,
      selectedRepo: selectedRepo,
    });
  };

  const handelOnCloseDrawer = () => {
    setState({
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
