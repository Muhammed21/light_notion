import { z } from "zod";

export const DocumentSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z
    .object({
      root: z.object({
        type: z.string(),
        children: z.array(
          z
            .object({
              type: z.any(),
              version: z.number(),
            })
            .catchall(z.unknown()),
        ),
        direction: z.enum(["ltr", "rtl"]).nullable(),
        format: z.enum([
          "left",
          "start",
          "center",
          "right",
          "end",
          "justify",
          "",
        ]),
        indent: z.number(),
        version: z.number(),
      }),
    })
    .catchall(z.unknown())
    .nullable()
    .optional(),
  updatedAt: z.string(),
  createdAt: z.string(),
});
