import qs from "qs";

import {
  ApiResponse,
  HTTPMethod,
  IApiStore,
  RequestParams,
  StatusHTTP,
} from "./types";

export default class ApiStore implements IApiStore {
  readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getRequestData<ReqT>(
    params: RequestParams<ReqT>
  ): [string, RequestInit] {
    let endpoint = `${this.baseUrl}${params.endpoint}`;

    const req: RequestInit = {
      body: null,
    };

    if (params.method === HTTPMethod.GET) {
      endpoint = `${endpoint}?${qs.stringify(params.data)}`;
    }

    if (params.method === HTTPMethod.POST) {
      req.body = JSON.stringify(params.data);
      req.headers = { ...params.headers };
      req.headers["Content-Type"] = "application/json;charset=utf-8";
    }

    return [endpoint, req];
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    try {
      const response = await fetch(...this.getRequestData(params));
      if (response.ok) {
        return {
          success: true,
          data: await response.json(),
          status: response.status,
        };
      }

      return {
        success: false,
        data: await response.json(),
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
        status: StatusHTTP.UNEXPECTED_ERROR,
      };
    }
  }
}
