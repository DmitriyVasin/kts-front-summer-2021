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
  load: (e: React.MouseEvent<HTMLButtonElement>) => {},
});

const ReposProvider = reposContext.Provider;

export const useReposContext = () => React.useContext(reposContext);

let initial: RepoItems = [];

const Main: React.FC = () => {
  const [state, setState] = React.useState({
    searchInputValue: "",
    isLoading: false,
    repos: initial,
    nextPage: 1,
  });

  const history = useHistory();
  const handleOnClickCard = (e: React.MouseEvent<HTMLElement>) => {
    history.push(`/repos/${e.currentTarget.dataset.item}`);
  };

  const handelOnChangeSearchInputValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, searchInputValue: e.currentTarget.value });
  };

  const fetchReposPage = (pageNum?: number) => {
    return gitHubStore
      .getOrganizationReposList({
        organizationName: state.searchInputValue,
        data: {
          page: pageNum ? pageNum : state.nextPage,
          per_page: 10,
        },
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
        /* eslint-disable no-console */
        console.log(error);
      });
  };

  const handelOnClickSearchButton = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setState({ ...state, isLoading: true });
    const result = await fetchReposPage(1);
    if (result.success) {
      setState({
        ...state,
        repos: result.data,
        isLoading: false,
        nextPage: state.nextPage + 1,
      });
    } else {
      setState({ ...state, repos: [], isLoading: false });
    }
  };

  const nextPartOfRepos = async () => {
    const result = await fetchReposPage();
    if (result.success) {
      setState({
        ...state,
        repos: [...state.repos, ...result.data],
        isLoading: false,
        nextPage: state.nextPage + 1,
      });
    } else {
      setState({ ...state, repos: [], isLoading: false });
    }
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
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <SearchBox
            searchInputValue={state.searchInputValue}
            handelOnChangeSearchInputValue={handelOnChangeSearchInputValue}
          />
          {/* eslint-disable no-console */ console.log("reneder", state)}
          {state.repos.length > 0 &&
            state.repos.map((repoItem) => {
              return (
                <Card
                  repoItem={repoItem}
                  key={repoItem.id}
                  handleOnClickCard={handleOnClickCard}
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
