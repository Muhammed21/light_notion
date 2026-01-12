import { HttpRequestOptionsEntity } from "@/src/core/domain/entities/HttpRequestOptions.entity";

export abstract class HttpClientPort {
  /**
   * Performs a GET request to the specified endpoint.
   * @param endpoint The API endpoint to send the request to.
   * @param options Optional HTTP request options such as headers and query parameters.
   * @returns A promise that resolves with the response data of type T.
   */
  abstract get<T>(
    endpoint: string,
    options?: HttpRequestOptionsEntity,
  ): Promise<T>;
  /**
   * Performs a POST request to the specified endpoint.
   * @param endpoint The API endpoint to send the request to.
   * @param data The data to be sent in the request body.
   * @param options Optional HTTP request options such as headers and query parameters.
   * @returns A promise that resolves with the response data of type T.
   */
  abstract post<T, D>(
    endpoint: string,
    data: D,
    options?: HttpRequestOptionsEntity,
  ): Promise<T>;
  /**
   * Performs a PUT request to the specified endpoint.
   * @param endpoint The API endpoint to send the request to.
   * @param data The data to be sent in the request body.
   * @param options Optional HTTP request options such as headers and query parameters.
   * @returns A promise that resolves with the response data of type T.
   */
  abstract put<T, D>(
    endpoint: string,
    data: D,
    options?: HttpRequestOptionsEntity,
  ): Promise<T>;
  /**
   * Performs a DELETE request to the specified endpoint.
   * @param endpoint The API endpoint to send the request to.
   * @param options Optional HTTP request options such as headers and query parameters.
   * @returns A promise that resolves with the response data of type T.
   */
  abstract delete<T>(
    endpoint: string,
    options?: HttpRequestOptionsEntity,
  ): Promise<T>;
}
