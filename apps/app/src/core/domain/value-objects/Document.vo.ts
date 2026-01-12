export class DocumentVo {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly content: string,
  ) {}

  static deserialize(data: DocumentVo) {
    return new DocumentVo(data.id, data.title, data.content);
  }
}