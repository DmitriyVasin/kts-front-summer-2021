import { ApiResponse, HTTPMethod } from 'src/shared/store/ApiStore/types';
import ApiStore from '../../shared/store/ApiStore';
import {IGitHubStore, RepoItem, GetOrganizationReposListParams} from "./types";

const BASE_URL = 'https://api.github.com'

export default class GitHubStore implements IGitHubStore {

    
    private readonly apiStore = new ApiStore(BASE_URL); 

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>> {
        return await this.apiStore.request({
            method: HTTPMethod.GET,
            data: {},
            headers: {},
            endpoint: `/orgs/${params.organizationName}/repos`
        })
    }
}
