import * as React from "react";

import Card from "@components/Card";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import SearchBox from "@components/SearchBox";
import "./Main.css";
import GitHubStore from "@store/GitHubStore";

const gitHubStore = new GitHubStore();

let initial: any[] = [];

const Main: React.FC = () => {
  const [state, setstate] = React.useState({
    searchInputValue: "",
    isLoading: false,
    repos: initial,
    selectedRepo: "",
    repoBranchesDrawerVisible: false,
  });

  const handelOnChangeSearchInputValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setstate({ ...state, searchInputValue: e.currentTarget.value });
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

  const handelOnClickCard = (e: React.SyntheticEvent<HTMLElement>) => {
    const selectedRepo = e.currentTarget.dataset.item;
    if (typeof selectedRepo !== "undefined") {
      setstate({
        ...state,
        selectedRepo: selectedRepo,
        repoBranchesDrawerVisible: true,
      });
    }
    console.log(state);
  };

  const handelOnCloseDrawer = () => {
    setstate({
      ...state,
      repoBranchesDrawerVisible: false,
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
      {/* eslint-disable no-console */ console.log(state.repos)}
      {state.repos.length > 0 &&
        state.repos.map((repoItem) => {
          return (
            <Card
              repoItem={repoItem}
              handelOnClickCard={handelOnClickCard}
              key={repoItem.id}
            />
          );
        })}
      {state.selectedRepo !== "" && (
        <RepoBranchesDrawer
          selectedRepo={state.selectedRepo}
          repoBranchesDrawerVisible={state.repoBranchesDrawerVisible}
          handelOnCloseDrawer={handelOnCloseDrawer}
        />
      )}
    </div>
  );
};

export default Main;
