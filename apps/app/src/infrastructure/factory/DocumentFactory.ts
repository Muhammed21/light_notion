import { HttpClient } from "@/src/infrastructure/api/HttpClient";
import { DocumentRepository } from "@/src/infrastructure/repository/Document.repository";
import { GetAllDocumentsUseCase } from "@/src/core/application/useCases/GetAllDocuments.usecase";
import { DeserializeContentUseCase } from "@/src/core/application/useCases/DeserializeContent.usecase";

// Singleton HTTP client instance
const httpClient = new HttpClient(
  process.env.EXPO_PUBLIC_BASE_URL || "http://localhost:3000",
);

// Singleton repository instance
const documentRepository = new DocumentRepository(httpClient);

/**
 * Factory function to create GetAllDocumentsUseCase
 */
export const createGetAllDocumentsUseCase = (): GetAllDocumentsUseCase => {
  return new GetAllDocumentsUseCase(documentRepository);
};

/**
 * Factory function to create DeserializeContentUseCase
 */
export const createDeserializeContentUseCase = (): DeserializeContentUseCase => {
  return new DeserializeContentUseCase(documentRepository);
};
