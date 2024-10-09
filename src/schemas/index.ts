import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(50, {
      message: "Must be less than 50 characters",
    }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(1, {
      message: "Password is required",
    })
    .min(8, { message: "Password must be more than 8 characters" })
    .max(32, {
      message: "Password must be less than 32 charcters",
    }),
});
