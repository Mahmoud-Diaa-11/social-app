import axios from "axios";

export async function signInData(userData) {
  try {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/users/signin",
      userData
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
}
