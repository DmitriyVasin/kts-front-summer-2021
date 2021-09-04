import { ApiResponse } from "src/shared/store/ApiStore/types";

export type GetOrganizationReposListParams = {
    organizationName: string
}

export type GetRepoBranchParams = {
  repoFullName: string
}

// export type RepoItem = {
//     success: true;
//     data: [];
//     status: number;
//   }
export type RepoItems = any[];

export type BranchItems = any[];

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

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItems, ErrorResp>>;
    getRepoBranchList(params: GetRepoBranchParams): Promise<ApiResponse<BranchItems, ErrorResp>>;
}
