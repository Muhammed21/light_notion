import { useQuery } from "@tanstack/react-query";
import { createGetAllDocumentsUseCase } from "@/src/infrastructure/factory/DocumentFactory";
import { DocumentEntity } from "@/src/core/domain/entities/Document.entity";
import { CommonVo } from "@/src/core/domain/value-objects/common.vo";

const getAllDocumentsUseCase = createGetAllDocumentsUseCase();

export function useDocument(metadata: CommonVo) {
  return useQuery<DocumentEntity[]>({
    queryKey: ["documents", metadata],
    queryFn: () => getAllDocumentsUseCase.execute(metadata),
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
