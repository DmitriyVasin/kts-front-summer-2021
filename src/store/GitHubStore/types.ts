import { ApiResponse } from "src/shared/store/ApiStore/types";

export type GetOrganizationReposListParams = {
    organizationName: string
}

export type RepoItem = {
    success: true;
    data: [];
    status: number;
  }

export type ErrorResp = {
    success: false;
    data: string;
    status: number;
  }

export type ErrorHTTP = {
    success: false;
    data: any;
    status: number;
  };

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem, ErrorResp>>;
}
