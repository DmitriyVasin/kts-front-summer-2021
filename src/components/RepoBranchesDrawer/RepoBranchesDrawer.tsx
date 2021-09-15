import * as React from "react";

import GitHubStore from "@store/GitHubStore";
import { BranchItems } from "@store/GitHubStore/types";
import { Drawer } from "antd";
import { Divider } from "antd";

const gitHubStore = new GitHubStore();

type Props = {
  selectedRepo: string | null;
  handelOnCloseDrawer: () => void;
};

const RepoBranchesDrawer: React.FC<Props> = ({
  selectedRepo,
  handelOnCloseDrawer,
}) => {
  const [branches, setBranches] = React.useState<BranchItems>([]);

  React.useEffect(() => {
    if (selectedRepo) {
      (async () => {
        try {
          const result = await gitHubStore.getRepoBranchList({
            repoFullName: selectedRepo,
          });
          result.success ? setBranches(result.data) : setBranches([]);
        } catch (error) {
          /* eslint-disable no-console */
          console.log(error);
        }
      })();
    }
  }, [selectedRepo]);

  return (
    <Drawer
      placement="right"
      onClose={handelOnCloseDrawer}
      visible={selectedRepo ? true : false}
    >
      {branches.map((branch) => {
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

export default React.memo(RepoBranchesDrawer);
