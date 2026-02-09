import axios from "axios";

export async function getAllPosts() {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/posts",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          limit: 20,
          sort: "-createdAt",
        },
      }
    );
    if (data.message == "success") {
      return data.posts;
    }
  } catch (error) {
    return error;
  }
}

export async function getSinglePost(id) {
  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (data.message == "success") {
      return data;
    }
  } catch (error) {
    return error;
  }
}
