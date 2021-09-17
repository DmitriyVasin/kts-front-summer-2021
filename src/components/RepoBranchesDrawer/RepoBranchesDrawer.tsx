import * as React from "react";

import GitHubStore from "@store/GitHubStore";
import { BranchItems } from "@store/GitHubStore/types";
import { Drawer } from "antd";
import { Divider } from "antd";
import { useParams, useHistory } from "react-router-dom";

const gitHubStore = new GitHubStore();

type selectedRepo = {
  id: string;
};

const RepoBranchesDrawer: React.FC = () => {
  const [branches, setBranches] = React.useState<BranchItems>([]);
  const selectedRepo: selectedRepo = useParams();
  const history = useHistory();
  React.useEffect(() => {
    const fetchBranches = async () => {
      const result = await gitHubStore.getRepoBranchListById({
        repoId: selectedRepo.id,
      });
      if (result.success) {
        setBranches(result.data);
      } else {
        setBranches([]);
      }
    };
    fetchBranches();
  }, [selectedRepo]);

  const handelOnClose = () => {
    history.push("/repos");
  };

  return (
    <Drawer placement="right" onClose={handelOnClose} visible={true}>
      {branches.map((branch) => {
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

export default React.memo(RepoBranchesDrawer);
