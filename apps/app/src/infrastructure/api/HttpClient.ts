import { HttpClientPort } from "@/src/core/application/port/HttpClient.port";
import { HttpRequestOptionsEntity } from "@/src/core/domain/entities/HttpRequestOptions.entity";

export interface HttpError {
  error: string;
  issues?: unknown;
}

export class HttpClient implements HttpClientPort {
  constructor(private readonly baseURL: string) {}

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseURL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value);
        }
      });
    }
    return url.toString();
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit & { params?: Record<string, string> } = {},
  ): Promise<T> {
    const { params, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData: HttpError;

      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText || `HTTP ${response.status}` };
      }

      throw new Error(errorData.error || `HTTP Error: ${response.status}`);
    }

    return response.json();
  }

  async get<T>(
    endpoint: string,
    options?: HttpRequestOptionsEntity,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "GET",
      params: options?.params,
      headers: options?.headers,
    });
  }

  async post<T, D>(
    endpoint: string,
    data: D,
    options?: HttpRequestOptionsEntity,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      params: options?.params,
      headers: options?.headers,
    });
  }

  async put<T, D>(
    endpoint: string,
    data: D,
    options?: HttpRequestOptionsEntity,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      params: options?.params,
      headers: options?.headers,
    });
  }

  async delete<T>(
    endpoint: string,
    options?: HttpRequestOptionsEntity,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      params: options?.params,
      headers: options?.headers,
    });
  }
}
