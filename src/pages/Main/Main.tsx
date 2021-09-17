<<<<<<< HEAD
import * as React from "react";

import Card from "@components/Card";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import SearchBox from "@components/SearchBox";
import GitHubStore from "@store/GitHubStore";
import { RepoItems } from "@store/GitHubStore/types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route, useHistory } from "react-router-dom";

import styles from "./Main.module.scss";

type ReposContext = {
  list: RepoItems;
  isLoading: boolean;
  load: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const gitHubStore = new GitHubStore();

const reposContext = React.createContext<ReposContext>({
  list: [],
  isLoading: false,
  load: (e: React.MouseEvent<HTMLButtonElement>) => {
    // const loadVar = 0;
  },
});

const ReposProvider = reposContext.Provider;

export const useReposContext = () => React.useContext(reposContext);

let initial: RepoItems = [];

const Main: React.FC = () => {
  const [state, setState] = React.useState({
    isLoading: false,
    repos: initial,
  });

  const [searchInputValue, setSearchInputValue] = React.useState("");

  const [infiniteScrollState, setInfiniteScrollState] = React.useState({
    nextPage: 1,
    hasMore: true,
  });

  const history = useHistory();
  const onClickCard = (id: string) => {
    history.push(`/repos/${id}`);
  };

  const handelOnChangeSearchInputValue = (value: string) => {
    setSearchInputValue(value);
  };

  const fetchReposPage = async (pageNum?: number) => {
    const result = await gitHubStore.getOrganizationReposList({
      organizationName: searchInputValue,
      data: {
        page: pageNum ? pageNum : infiniteScrollState.nextPage,
        per_page: 10,
      },
    });
    if (result.success) {
      setState({
        ...state,
        repos: [...state.repos, ...result.data],
        isLoading: false,
      });
      if (result.data.length < 10) {
        setInfiniteScrollState({ ...infiniteScrollState, hasMore: false });
      } else {
        setInfiniteScrollState({
          ...infiniteScrollState,
          nextPage: infiniteScrollState.nextPage + 1,
        });
      }
    } else {
      setState({ ...state, repos: [], isLoading: false });
    }
  };

  const handelOnClickSearchButton = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setState({ ...state, isLoading: true });
    await fetchReposPage(1);
  };

  const nextPartOfRepos = async () => {
    await fetchReposPage();
  };

  return (
    <ReposProvider
      value={{
        list: state.repos,
        isLoading: state.isLoading,
        load: handelOnClickSearchButton,
      }}
    >
      <div className={styles.grid}>
        <InfiniteScroll
          dataLength={state.repos.length}
          next={nextPartOfRepos}
          hasMore={infiniteScrollState.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <SearchBox
            searchInputValue={searchInputValue}
            handelOnChangeSearchInputValue={handelOnChangeSearchInputValue}
          />
          {state.repos.map((repoItem) => {
            return (
              <Card
                repoItem={repoItem}
                key={repoItem.id}
                onClickCard={onClickCard}
              />
            );
          })}
          <Route path="/repos/:id" component={RepoBranchesDrawer} />
        </InfiniteScroll>
      </div>
    </ReposProvider>
  );
};

export default Main;
=======
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
>>>>>>> main
