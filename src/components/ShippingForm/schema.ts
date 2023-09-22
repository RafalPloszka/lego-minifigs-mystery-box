import { z } from "zod";

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);
const zipCodeRegex = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);

export const validationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  surname: z.string().min(1, { message: "Surname is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }).regex(phoneRegex, "Invalid phone number"),
  email: z.string().min(1, { message: "Email is required" }).email(),
  dateOfBirth: z.coerce.date(),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(1, { message: "Zip code is required" }).regex(zipCodeRegex, "Invalid zip code (5 digits)"),
});

export type ValidationSchemaValues = z.infer<typeof validationSchema>;
