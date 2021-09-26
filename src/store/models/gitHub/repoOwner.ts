export type RepoOwnerApi = {
  login: string;
  avatar_url: string;
  html_url: string;
};

export type RepoOwnerModel = {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
};

export const normalizeRepoOwner = (from: RepoOwnerApi): RepoOwnerModel => ({
  login: from.login,
  avatarUrl: from.avatar_url,
  htmlUrl: from.html_url,
});
