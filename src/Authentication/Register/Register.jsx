import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../schema/schema";
import { useState } from "react";
import { sendRegister } from "../../services/signupApi";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register: formRegister,
    handleSubmit,
    formState,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
    mode: "all",
  });

  async function getRegister(values) {
    setLoading(true);
    const response = await sendRegister(values);
    if (response.error) {
      setApiError(response.error);
    } else {
      setApiError(null);
      navigate("/");
    }
    setLoading(false);
  }
  return (
    <>
      <div className=" min-h-screen text-center flex justify-center items-center ">
        <div className="w-full max-w-lg mx-auto rounded-3xl shadow ">
          <form onSubmit={handleSubmit(getRegister)}>
            <div className="flex flex-col gap-4 bg-white shadow p-5 rounded-3xl">
              <h2 className="text-2xl font-bold text-sky-800">Register Now</h2>
              <Input
                isInvalid={Boolean(formState.errors.name?.message)}
                errorMessage={formState.errors.name?.message}
                {...formRegister("name")}
                label="Name"
                type="text"
              />
              <Input
                isInvalid={Boolean(formState.errors.email?.message)}
                errorMessage={formState.errors.email?.message}
                {...formRegister("email")}
                label="Email"
                type="email"
              />
              <Input
                isInvalid={Boolean(formState.errors.password?.message)}
                errorMessage={formState.errors.password?.message}
                {...formRegister("password")}
                label="Password"
                type="password"
              />
              <Input
                isInvalid={Boolean(formState.errors.rePassword?.message)}
                errorMessage={formState.errors.rePassword?.message}
                {...formRegister("rePassword")}
                label="RePassword"
                type="password"
              />
              <div className="flex gap-4">
                <Input
                  isInvalid={Boolean(formState.errors.dateOfBirth?.message)}
                  errorMessage={formState.errors.dateOfBirth?.message}
                  {...formRegister("dateOfBirth")}
                  label="dateOfBirth"
                  type="date"
                />
                <Select
                  isInvalid={Boolean(formState.errors.gender?.message)}
                  errorMessage={formState.errors.gender?.message}
                  {...formRegister("gender")}
                  className="max-w-xs"
                  label="Select gender"
                >
                  <SelectItem key={"male"}>Male</SelectItem>
                  <SelectItem key={"female"}>Female</SelectItem>
                </Select>
              </div>
              <Button
                isLoading={loading}
                type="submit"
                color="primary"
                variant="shadow"
                className="w-full my-4"
              >
                Submit
              </Button>
              <h3>
                Already have an account{" "}
                <Link
                  className="underline ml-1 text-blue-500 hover:text-blue-600"
                  to={"/"}
                >
                  Sign in
                </Link>
              </h3>
              {apiError && (
                <p className="text-1xl text-center text-red-700">{apiError}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
