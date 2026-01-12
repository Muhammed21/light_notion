import { DocumentRepositoryPort } from "@/src/core/application/port/Document.repository.port";
import { CommonVo } from "@/src/core/domain/value-objects/common.vo";
import { DocumentEntity } from "@/src/core/domain/entities/Document.entity";

export class GetAllDocumentsUseCase {
  constructor(private readonly repository: DocumentRepositoryPort) {}

  async execute(metadata: CommonVo): Promise<DocumentEntity[]> {
    return this.repository.getAllDocuments(metadata);
  }
}
