import { DocumentRepositoryPort } from "@/src/core/application/port/Document.repository.port";

export class DeserializeContentUseCase {
  constructor(private readonly repository: DocumentRepositoryPort) {}

  async execute(serializedContent: string) {
    return this.repository.deserializeContent(serializedContent);
  }
}