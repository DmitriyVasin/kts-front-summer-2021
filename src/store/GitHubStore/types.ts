import { ApiResponse } from "src/shared/store/ApiStore/types";

export type GetOrganizationReposListParams = {
    organizationName: string
}

export type RepoItem = {}

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>>;
}
