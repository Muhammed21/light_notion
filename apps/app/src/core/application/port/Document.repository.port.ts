import { DocumentEntity } from "@/src/core/domain/entities/Document.entity";
import { CommonVo } from "@/src/core/domain/value-objects/common.vo";

export abstract class DocumentRepositoryPort {
  /**
   * Fetches all documents from the data source.
   * @param metadata - Common metadata for the operation.
   * @returns A promise that resolves to an array of DocumentEntity objects.
   */
  abstract getAllDocuments(metadata: CommonVo): Promise<DocumentEntity[]>;
  /**
   * Deserializes the content of a document.
   * @param serializedContent - The serialized content to be deserialized.
   * @returns A promise that resolves to the deserialized content as a string.
   */
  abstract deserializeContent(serializedContent: string): Promise<string>;
}
