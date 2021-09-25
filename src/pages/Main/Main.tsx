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
        repos: pageNum ? result.data : [...state.repos, ...result.data],
        isLoading: false,
      });
      if (result.data.length < 10) {
        setInfiniteScrollState({ ...infiniteScrollState, hasMore: false });
      } else {
        setInfiniteScrollState({
          ...infiniteScrollState,
          nextPage: infiniteScrollState.nextPage + 1,
          hasMore: true,
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
