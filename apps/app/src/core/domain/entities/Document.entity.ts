export class DocumentEntity {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly content: string,
  ) {}
}
