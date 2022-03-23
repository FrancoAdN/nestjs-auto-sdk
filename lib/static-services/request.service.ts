import axios, { AxiosRequestConfig, Method } from 'axios';

export class RequestService {
  private baseUrl: string;
  private defaultHeaders: object;

  private static instance = false;

  private constructor(baseUrl: string, defaultHeaders: object) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
  }

  static newInstance(baseUrl: string, defaultHeaders: object) {
    if (!this.instance) {
      this.instance = true;
      return new RequestService(baseUrl, defaultHeaders);
    }
  }

  private getAxiosConfig(
    url: string,
    method: Method,
    headers?: any,
  ): AxiosRequestConfig {
    return {
      url,
      method,
      baseURL: this.baseUrl,
      headers: headers || this.defaultHeaders,
    };
  }

  get(url: string, headers?: any) {
    const config: AxiosRequestConfig = this.getAxiosConfig(url, 'GET', headers);
    return axios(config);
  }

  post(url: string, data: any, headers?: any) {
    let config: AxiosRequestConfig = this.getAxiosConfig(url, 'POST', headers);
    config = {
      ...config,
      data,
    };
    return axios(config);
  }

  put(url: string, data: any, headers?: any) {
    let config: AxiosRequestConfig = this.getAxiosConfig(url, 'PUT', headers);
    config = {
      ...config,
      data,
    };
    return axios(config);
  }

  patch(url: string, data: any, headers?: any) {
    let config: AxiosRequestConfig = this.getAxiosConfig(url, 'PATCH', headers);
    config = {
      ...config,
      data,
    };
    return axios(config);
  }

  delete(url: string, headers?: any) {
    const config: AxiosRequestConfig = this.getAxiosConfig(
      url,
      'DELETE',
      headers,
    );
    return axios(config);
  }
}
