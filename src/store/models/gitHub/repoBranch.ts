export type BranchItemApi = {
  commit: {
    sha: string;
  };
  name: string;
};

export type BranchItemModel = {
  id: string;
  name: string;
};

export const normalizeBranchItem = (from: BranchItemApi): BranchItemModel => ({
  id: from.commit.sha,
  name: from.name,
});
