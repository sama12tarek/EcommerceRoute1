import { z } from 'zod';

export const shippingAddressSchema = z.object({
  details: z.string().nonempty('Details can\'t be empty'),
  phone: z.string().nonempty('Phone can\'t be empty').regex(/^01[0-2,5][0-9]{8}$/, 'Invalid Egyptian phone number'),
  city: z.string().min(5, 'City must be at least 5 characters'),
});

export type shippingAddressType = z.infer<typeof shippingAddressSchema>;
