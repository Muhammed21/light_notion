export class CommonVo {
  constructor(
    public readonly depth: number,
    public readonly draft: boolean,
    public readonly locale: string,
    public readonly trash: boolean,
  ) {}
}
