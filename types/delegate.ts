import { z } from 'zod';

export const delegateSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  organization: z.string(),
  position: z.string(),
  registrationDate: z.date().default(() => new Date()),
});

export type Delegate = z.infer<typeof delegateSchema>; 