import * as React from "react";

import ReposBranchStore from "@store/RepoBranchesStore";
import { useLocalStore } from "@utils/useLocalStore";
import { Drawer } from "antd";
import { Divider } from "antd";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";

type selectedRepo = {
  id: string;
};

const RepoBranchesDrawer: React.FC = () => {
  const reposBranchStore = useLocalStore(() => new ReposBranchStore());

  const selectedRepo: selectedRepo = useParams();
  const history = useHistory();

  React.useEffect(() => {
    const fetchBranches = async () => {
      await reposBranchStore.getRepoBranchListById({
        repoId: selectedRepo.id,
      });
    };
    reposBranchStore.destroy();
    fetchBranches();
  }, [selectedRepo, reposBranchStore]);

  const handelOnClose = () => {
    history.push("/repos");
  };

  return (
    <Drawer placement="right" onClose={handelOnClose} visible={true}>
      {reposBranchStore.list.map((branch) => {
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

export default observer(RepoBranchesDrawer);
