import { ApiResponse, HTTPMethod } from "src/shared/store/ApiStore/types";

import ApiStore from "../../shared/store/ApiStore";
import {
  IGitHubStore,
  RepoItem,
  ErrorResp,
  GetOrganizationReposListParams,
} from "./types";

const BASE_URL = "https://api.github.com";

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore(BASE_URL);

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItem, ErrorResp>> {
    return await this.apiStore.request({
      method: HTTPMethod.GET,
      endpoint: `/orgs/${params.organizationName}/repos`,
    });
  }
}
