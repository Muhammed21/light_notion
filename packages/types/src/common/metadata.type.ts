import { z } from "zod";
import { MetadataSchema } from "./metadata.schema";

export type MetadataType = z.infer<typeof MetadataSchema>;
