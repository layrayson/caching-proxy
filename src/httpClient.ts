import axios, { AxiosRequestConfig } from "axios";

export interface OriginResponse {
  data: any;
  statusCode: number;
  headers: Record<string, string>;
}

export class HttpClient {
  private baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  async request(
    path: string,
    method: string = "GET",
    body?: any,
    headers?: any
  ): Promise<OriginResponse> {
    const url = `${this.baseURL}${path}`;
    try {
      const options: AxiosRequestConfig = {
        method,
        url,
        data: body,
        headers: {
          Accept: "application/json",
          "User-Agent": "caching-server/1.0",
        },

        validateStatus: () => true,
      };
      console.log("headers", headers);
      const response = await axios(options);
      return {
        data: response.data,
        statusCode: response.status,
        headers: response.headers as Record<string, string>,
      };
    } catch (error) {
      throw error;
    }
  }
  get(path: string, headers?: any): Promise<OriginResponse> {
    return this.request(path, "GET", undefined, headers);
  }
  post(path: string, body?: any, headers?: any): Promise<OriginResponse> {
    return this.request(path, "POST", body, headers);
  }
  put(path: string, body?: any, headers?: any): Promise<OriginResponse> {
    return this.request(path, "PUT", body, headers);
  }
  delete(path: string, headers?: any): Promise<OriginResponse> {
    return this.request(path, "DELETE", undefined, headers);
  }
}
