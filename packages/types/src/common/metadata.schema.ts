import { z } from "zod";

export const MetadataSchema = z.object({
  depth: z.number().optional(),
  draft: z.boolean().optional(),
  locale: z.string().optional(),
  trash: z.boolean().optional(),
});
