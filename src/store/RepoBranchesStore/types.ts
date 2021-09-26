export type GetRepoBranchListByIdParams = {
  repoId: string;
};

export type ErrorResp = {
  success: false;
  data: string;
  status: number;
};

export type ErrorHTTP = {
  success: false;
  data: any;
  status: number;
};

export interface IReposBranchStore {
  getRepoBranchListById(params: GetRepoBranchListByIdParams): Promise<void>;
}
