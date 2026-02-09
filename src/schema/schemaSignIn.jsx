import * as zod from "zod";
export const schemaSignIn = zod.object({
  email: zod
    .string()
    .nonempty("email is required")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "wrong email"),
  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "wrong password"
    ),
});
