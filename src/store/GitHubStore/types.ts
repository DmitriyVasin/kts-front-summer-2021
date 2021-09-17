<<<<<<< HEAD
import { ApiResponse } from "src/shared/store/ApiStore/types";

export type GetOrganizationReposListParams = {
  organizationName: string;
  data?: {
    per_page: number,
    page: number,
  };
};

export type GetRepoBranchParams = {
  repoFullName: string;
};

export type GetRepoByIdParams = {
  repoId: string;
};

export type GetRepoBranchListByIdParams = {
  repoId: string;
};

export type RepoItem = {
  id: string;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  stargazers_count: number;
  updated_at: string;
};
export type RepoItems = RepoItem[];

export type BranchItem = {
  id: string;
  name: string;
};
export type BranchItems = BranchItem[];

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
=======
import { ApiResponse } from "src/shared/store/ApiStore/types";

export type GetOrganizationReposListParams = {
    organizationName: string;
}

export type GetRepoBranchParams = {
  repoFullName: string | null;
}

export type RepoItem = {
  id: string;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  stargazers_count: number;
  updated_at: string;
};

export type RepoItems = RepoItem[];

export type BranchItem = {
  id: string;
  name: string;
};

export type BranchItems = BranchItem[];

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
>>>>>>> main
