import { z } from "zod";

// Helper to validate file type/size
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const fileSchema = z
  .any()
  .refine((file) => file instanceof File, "File is required.")
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );

export const verificationSchema = z.object({
  // 1. Live Selfie (Captured as a File object)
  selfieImage: fileSchema,

  // 2. NID Documents
  nidFront: fileSchema,
  nidBack: fileSchema,

  // 3. Address Proof
  utilityBill: fileSchema,

  // 4. Social Verification (URL string captured after OAuth)
  facebookProfileLink: z.string().url("Please link your Facebook account."),
  fbPageLink: z.string().url("Please give your pages profile link."),
});

export type VerificationFormValues = z.infer<typeof verificationSchema>;
