export type GetOrganizationReposListParams = {
  organizationName: string;
  data?: {
    per_page: number,
    page: number,
  };
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

export interface IReposListStore {
  getOrganizationReposList(params: GetOrganizationReposListParams): Promise<void>;
}
