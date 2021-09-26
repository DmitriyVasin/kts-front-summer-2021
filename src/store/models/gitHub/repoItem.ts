import { normalizeRepoOwner, RepoOwnerApi, RepoOwnerModel } from "./repoOwner";

export type RepoItemApi = {
  id: string;
  name: string;
  full_name: string;
  owner: RepoOwnerApi;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
};

export type RepoItemModel = {
  id: string;
  name: string;
  fullName: string;
  owner: RepoOwnerModel;
  htmlUrl: string;
  stargazersCount: number;
  updatedAt: Date;
};

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
  id: from.id,
  name: from.name,
  fullName: from.full_name,
  owner: normalizeRepoOwner(from.owner),
  htmlUrl: from.html_url,
  stargazersCount: from.stargazers_count,
  updatedAt: new Date(from.updated_at),
});
