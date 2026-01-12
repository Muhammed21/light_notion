import { DocumentSchema } from "./payload.schema";
import { z } from "zod";

export type DocumentSchemaType = z.infer<typeof DocumentSchema>;
