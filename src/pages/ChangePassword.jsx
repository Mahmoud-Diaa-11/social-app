import { Button, Input } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function ChangePassword() {
  const { userToken } = useContext(AuthContext);
  const currentPass = useRef("");
  const newPass = useRef("");
  const [loading, setLoading] = useState(false);

  async function changePass() {
    const options = {
      method: "PATCH",
      url: "https://linked-posts.routemisr.com/users/change-password",
      headers: {
        token: userToken,
        "Content-Type": "application/json",
      },
      data: {
        password: currentPass.current.value,
        newPassword: newPass.current.value,
      },
    };

    const response = await axios.request(options);
    return response.data;
  }

  const { mutate } = useMutation({
    mutationFn: changePass,
    onMutate: () => setLoading(true),
    onSuccess: (res) => {
      setLoading(false);
      if (res.message === "success") {
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
        alert("Password changed successfully!");
        // Clear fields on success
        if (currentPass.current) currentPass.current.value = "";
        if (newPass.current) newPass.current.value = "";
      }
    },
    onError: (err) => {
      setLoading(false);
      console.log(err);
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Something went wrong";
      alert(errorMsg);
    },
  });

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!currentPass.current.value || !newPass.current.value) {
      alert("Please fill in all fields");
      return;
    }
    mutate();
  };

  return (
    <>
      <div className="min-h-[80vh] flex justify-center items-center w-full max-w-lg mx-auto px-4 py-10">
        <div className="change-password w-full text-center bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-blue-600 mb-6 font-primary">
            Update Secure Password
          </h2>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <Input
              label="Existing Password"
              placeholder="Enter your current password"
              ref={currentPass}
              type="password"
              variant="bordered"
              isRequired
              classNames={{
                inputWrapper: "bg-gray-50",
              }}
            />
            <Input
              label="New Secure Password"
              placeholder="Enter your new password"
              ref={newPass}
              type="password"
              variant="bordered"
              isRequired
              description="Must be at least 8 characters with letters, numbers and symbols."
              classNames={{
                inputWrapper: "bg-gray-50",
              }}
            />
            <Button
              onPress={handleSubmit}
              color="primary"
              className="mt-4 py-6 text-lg font-semibold"
              isLoading={loading}
              variant="shadow"
              type="submit"
            >
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
