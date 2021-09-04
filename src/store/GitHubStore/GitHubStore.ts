import { ApiResponse, HTTPMethod } from "@shared/store/ApiStore/types";

import ApiStore from "../../shared/store/ApiStore";
import {
  IGitHubStore,
  RepoItems,
  ErrorResp,
  GetOrganizationReposListParams,
  GetRepoBranchParams,
  BranchItems,
} from "./types";

const BASE_URL = "https://api.github.com";

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore(BASE_URL);

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItems, ErrorResp>> {
    return await this.apiStore.request({
      method: HTTPMethod.GET,
      endpoint: `/orgs/${params.organizationName}/repos`,
    });
  }

  async getRepoBranchList(
    params: GetRepoBranchParams
  ): Promise<ApiResponse<BranchItems, ErrorResp>> {
    return await this.apiStore.request({
      method: HTTPMethod.GET,
      endpoint: `/repos/${params.repoFullName}/branches`,
    });
  }
}
