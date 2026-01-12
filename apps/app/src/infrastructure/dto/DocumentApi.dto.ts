/**
 * DTO representing the Document response from Payload CMS API
 */
export interface DocumentApiDto {
  id: number;
  title: string;
  content: unknown; // Lexical rich text format
  createdAt: string;
  updatedAt: string;
}

/**
 * Generic paginated response from Payload CMS
 */
export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
