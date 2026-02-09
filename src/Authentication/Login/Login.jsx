import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInData } from "../../services/signinApi";
import { schemaSignIn } from "../../schema/schemaSignIn";
import { AuthContext } from "../../context/AuthContext";
function Login() {
  const { userToken, setUserToken } = useContext(AuthContext);

  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register: formRegister,
    handleSubmit,
    formState,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schemaSignIn),
  });

  async function getSignIn(userData) {
    setLoading(true);
    const response = await signInData(userData);
    if (response.error) {
      setApiError(response.error);
    } else {
      setApiError(null);
      localStorage.setItem("token", response.token);
      setUserToken(localStorage.getItem("token"));
      navigate("/home");
    }
    setLoading(false);
  }
  return (
    <>
      <div className=" min-h-screen text-center flex justify-center items-center ">
        <div className="w-full max-w-lg mx-auto rounded-3xl shadow ">
          <form onSubmit={handleSubmit(getSignIn)}>
            <div className="flex flex-col gap-4 bg-white shadow p-5 rounded-3xl">
              <h2 className="text-2xl font-bold text-sky-800">Signin Now</h2>

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
                Don't have an account
                <Link
                  className="underline ml-1 text-blue-500 hover:text-blue-600"
                  to={"/register"}
                >
                  Sign up
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

export default Login;
