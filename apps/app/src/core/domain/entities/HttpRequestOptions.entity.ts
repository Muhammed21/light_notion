export class HttpRequestOptionsEntity {
  constructor(
    public readonly headers?: Record<string, string>,
    public readonly params?: Record<string, string>,
  ) {}
}
