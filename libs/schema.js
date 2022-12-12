import { z } from "zod";
import { questions } from "./arrays";

// Email schema
export const email = z
  .string()
  .trim()
  .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
    message: "Invalid email address, please enter a valid email",
  });

// Password schema
export const password = z
  .string()
  .trim()
  .regex(
    /^(?:(?=.{8,})(?=.*[~`! @#$%^&*()_|;"'<:,>.?/+={[}-])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
    {
      message:
        "Password should include letters in lower and uppercase, at least 1 number, at least 1 special symbol",
    }
  )
  .min(1, {
    message: "A password is required",
    invalid_type_error: "A password is required",
  })
  .max(100);

// Security question schema
export const question = z
  .string(z.enum(questions))
  .min(2, {
    message: "Please select a question",
  })
  .max(100, {
    message: "Question selected to long",
  });

// Security answer schema
export const answer = z
  .string()
  .min(2, {
    message: "Please enter a longer answer",
  })
  .max(100, {
    message: "A maximum of 1 category",
  });

// Phone number schema
export const phone = z.string().min(7, {
  message: "Invalid phone number",
  invalid_type_error: "Invalid phone number",
});

// Country schema
export const country = z.string().trim().min(2, {
  message: "You must select a country",
  invalid_type_error: "You must select a country",
});

// Other names schema
export const otherNames = z.string().max(100).nullable().optional();

// general text and space schema
export const name = z
  .string()
  .trim()
  .regex(/^[A-Za-z\s]*$/, {
    message: "Only alphabet characters",
    invalid_type_error: "Only alphabet characters",
  })
  .min(2, {
    message: "You must fill out this field",
    invalid_type_error: "You must fill out this field",
  })
  .max(100, {
    message: "You can not exceed 100 characters",
    invalid_type_error: "You can not exceed 100 characters",
  });
