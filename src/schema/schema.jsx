import * as zod from "zod";
export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("name is required")
      .min(3, "min 3 chars")
      .max(10, "max 10 chars"),
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
    rePassword: zod.string().nonempty("repassword is required"),
    dateOfBirth: zod.coerce.date().refine((age) => {
      const now = new Date().getFullYear();
      const userAge = age.getFullYear();
      const diff = now - userAge;
      return diff >= 18;
    }, "your age less than 18"),
    gender: zod.string().nonempty("gender is required"),
  })
  .refine((data) => data.password == data.rePassword, {
    path: ["rePassword"],
    message: "password and rePasswprd not match",
  });
