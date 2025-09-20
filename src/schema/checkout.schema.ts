import { z } from "zod";

export const checkoutSchema = z.object({
  details: z.string().nonempty("details can't be empty"),
  phone: z
    .string()
    .nonempty("phone can't be empty")
    .regex(/^01[0-2,5][0-9]{8}$/, "invalid Egyptian phone number"),
  city: z.string().min(5, "city must be at least 5 characters"),
  checkoutType: z.enum(["cash", "card"]),
});

export type checkoutSchemaType = z.infer<typeof checkoutSchema>;
