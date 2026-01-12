import { DocumentRepositoryPort } from "@/src/core/application/port/Document.repository.port";
import { HttpClientPort } from "@/src/core/application/port/HttpClient.port";
import { CommonVo } from "@/src/core/domain/value-objects/common.vo";
import { DocumentEntity } from "@/src/core/domain/entities/Document.entity";
import { PaginatedResponse } from "@/src/infrastructure/dto/DocumentApi.dto";
import { Document } from "@repo/types";

export class DocumentRepository implements DocumentRepositoryPort {
  constructor(private readonly httpClient: HttpClientPort) {}

  async getAllDocuments(metadata: CommonVo): Promise<DocumentEntity[]> {
    const params = this.buildParams(metadata);
    const response = await this.httpClient.get<PaginatedResponse<Document>>(
      "/api/documents",
      { params },
    );

    return response.docs.map((dto) => this.mapToEntity(dto));
  }

  async deserializeContent(serializedContent: string): Promise<string> {
    // Lexical content is already in JSON format
    // This method can be extended for custom deserialization logic
    return serializedContent;
  }

  private mapToEntity(dto: Document): DocumentEntity {
    const contentString =
      typeof dto.content === "string"
        ? dto.content
        : JSON.stringify(dto.content);

    return new DocumentEntity(dto.id, dto.title, contentString);
  }

  private buildParams(metadata: CommonVo): Record<string, string> {
    const params: Record<string, string> = {
      limit: "100",
    };

    if (metadata.depth !== undefined) {
      params.depth = String(metadata.depth);
    }
    if (metadata.locale) {
      params.locale = metadata.locale;
    }
    if (metadata.draft !== undefined) {
      params.draft = String(metadata.draft);
    }
    if (metadata.trash !== undefined) {
      // Payload uses 'where' queries for trash filter
      // This is a simplified implementation
    }

    return params;
  }
}
