import axios, { AxiosRequestConfig, Method } from 'axios';

export interface RequestOptions {
  param?: any;
  query?: [
    {
      propName: string;
      value: string;
    },
  ];
}

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

  get(url: string, options: RequestOptions, headers?: any) {
    if (options.param) url = `${url}/${options.param}`;
    else if (options.query) {
      const queryParams = options.query.map(
        (qry) => `?${qry.propName}=` + qry.value,
      );
      url = `${url}${queryParams.join()}`;
    }

    const config: AxiosRequestConfig = this.getAxiosConfig(url, 'GET', headers);
    return axios(config);
  }

  post(url: string, options: RequestOptions, data: any, headers?: any) {
    if (options.param) url = `${url}/${options.param}`;
    else if (options.query) {
      const queryParams = options.query.map(
        (qry) => `?${qry.propName}=` + qry.value,
      );
      url = `${url}${queryParams.join()}`;
    }

    let config: AxiosRequestConfig = this.getAxiosConfig(url, 'POST', headers);
    config = {
      ...config,
      data,
    };
    return axios(config);
  }

  put(url: string, options: RequestOptions, data: any, headers?: any) {
    if (options.param) url = `${url}/${options.param}`;
    else if (options.query) {
      const queryParams = options.query.map(
        (qry) => `?${qry.propName}=` + qry.value,
      );
      url = `${url}${queryParams.join()}`;
    }

    let config: AxiosRequestConfig = this.getAxiosConfig(url, 'PUT', headers);
    config = {
      ...config,
      data,
    };
    return axios(config);
  }

  patch(url: string, options: RequestOptions, data: any, headers?: any) {
    if (options.param) url = `${url}/${options.param}`;
    else if (options.query) {
      const queryParams = options.query.map(
        (qry) => `?${qry.propName}=` + qry.value,
      );
      url = `${url}${queryParams.join()}`;
    }

    let config: AxiosRequestConfig = this.getAxiosConfig(url, 'PATCH', headers);
    config = {
      ...config,
      data,
    };
    return axios(config);
  }

  delete(url: string, options: RequestOptions, headers?: any) {
    if (options.param) url = `${url}/${options.param}`;
    else if (options.query) {
      const queryParams = options.query.map(
        (qry) => `?${qry.propName}=` + qry.value,
      );
      url = `${url}${queryParams.join()}`;
    }
    const config: AxiosRequestConfig = this.getAxiosConfig(
      url,
      'DELETE',
      headers,
    );
    return axios(config);
  }
}
