import * as React from "react";

import GitHubStore from "@store/GitHubStore";
import { Drawer } from "antd";
import { Divider } from "antd";

const gitHubStore = new GitHubStore();

type Props = {
  selectedRepo: string;
  repoBranchesDrawerVisible: boolean;
  handelOnCloseDrawer: () => void;
};

let initial: any[] = [];

const RepoBranchesDrawer: React.FC<Props> = ({
  selectedRepo,
  repoBranchesDrawerVisible,
  handelOnCloseDrawer,
}) => {
  const [branches, setBranches] = React.useState(initial);
  React.useEffect(() => {
    gitHubStore
      .getRepoBranchList({
        repoFullName: selectedRepo,
      })
      .then((result) => {
        if (result.success) {
          setBranches(result.data);
        } else {
          setBranches([]);
        }
      })
      .catch((error) => {
        /* eslint-disable no-console */
        console.log(error);
      });
  }, [selectedRepo]);

  return (
    <Drawer
      placement="right"
      onClose={handelOnCloseDrawer}
      visible={repoBranchesDrawerVisible}
    >
      {branches.length > 0 &&
        branches.map((branch) => {
          return (
            <>
              <p>{branch.name}</p>
              <Divider />
            </>
          );
        })}
    </Drawer>
  );
};

export default RepoBranchesDrawer;
