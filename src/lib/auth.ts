import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .email("Email inválido")
    .refine((email : string) => {
      const allowedDomains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];
      const domain = email.split("@")[1];
      return allowedDomains.includes(domain);
    }, "Email deve ser do Gmail, Hotmail, Outlook ou Yahoo"),
});
