import * as React from "react";

import Card from "@components/Card";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import SearchBox from "@components/SearchBox";
import { RepoItemModel } from "@store/models/gitHub";
import ReposListStore from "@store/ReposListStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route, useHistory } from "react-router-dom";

import styles from "./Main.module.scss";

type ReposContext = {
  list: RepoItemModel[];
  isLoading: boolean;
  load: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const reposContext = React.createContext<ReposContext>({
  list: [],
  isLoading: false,
  load: (e: React.MouseEvent<HTMLButtonElement>) => {
    // placeholder
  },
});

const ReposProvider = reposContext.Provider;

export const useReposContext = () => React.useContext(reposContext);

const Main: React.FC = () => {
  const reposListStore = useLocalStore(() => new ReposListStore());

  const [searchInputValue, setSearchInputValue] = React.useState("");

  const [infiniteScrollState, setInfiniteScrollState] = React.useState({
    nextPage: 1,
    perPage: 10,
    hasMore: false,
  });

  const history = useHistory();
  const onClickCard = (id: string) => {
    history.push(`/repos/${id}`);
  };

  const handelOnChangeSearchInputValue = (value: string) => {
    setSearchInputValue(value);
  };
  const fetchRepos = async () => {
    await reposListStore.getOrganizationReposList({
      organizationName: searchInputValue,
      data: {
        page: infiniteScrollState.nextPage,
        per_page: infiniteScrollState.perPage,
      },
    });
    if (
      reposListStore.meta === "success" &&
      reposListStore.list.length % infiniteScrollState.perPage === 0
    ) {
      setInfiniteScrollState({
        ...infiniteScrollState,
        nextPage: infiniteScrollState.nextPage + 1,
        hasMore: true,
      });
    } else {
      setInfiniteScrollState({
        ...infiniteScrollState,
        nextPage: 1,
        hasMore: false,
      });
    }
  };

  const handelOnClickSearchButton = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    reposListStore.destroy();
    fetchRepos();
  };

  const nextPartOfRepos = () => {
    fetchRepos();
  };

  return (
    <ReposProvider
      value={{
        list: reposListStore.list,
        isLoading: reposListStore.meta === "loading",
        load: handelOnClickSearchButton,
      }}
    >
      <div className={styles.grid}>
        <InfiniteScroll
          dataLength={reposListStore.list.length}
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
          {reposListStore.list.map((repoItem) => {
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

export default observer(Main);
