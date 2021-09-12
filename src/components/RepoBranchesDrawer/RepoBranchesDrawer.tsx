import * as React from "react";

import GitHubStore from "@store/GitHubStore";
import { BranchItems } from "@store/GitHubStore/types";
import { Drawer } from "antd";
import { Divider } from "antd";
import { useParams, useHistory } from "react-router-dom";

const gitHubStore = new GitHubStore();

let initial: BranchItems = [];
type selectedRepo = {
  id: string;
};

const RepoBranchesDrawer: React.FC = () => {
  const [branches, setBranches] = React.useState(initial);
  const selectedRepo: selectedRepo = useParams();
  const history = useHistory();
  React.useEffect(() => {
    gitHubStore
      .getRepoBranchListById({
        repoId: selectedRepo.id,
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

  const handelOnClose = () => {
    history.push("/repos");
  };

  return (
    <Drawer placement="right" onClose={handelOnClose} visible={true}>
      {branches.length > 0 &&
        branches.map((branch) => {
          return (
            <div key={branch.id}>
              <p>{branch.name}</p>
              <Divider />
            </div>
          );
        })}
    </Drawer>
  );
};

export default RepoBranchesDrawer;
