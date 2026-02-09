import axios from "axios";

export async function createPost(formData) {
  try {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/posts",
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
}

export async function updatePost(id, formData) {
  try {
    const { data } = await axios.put(
      `https://linked-posts.routemisr.com/posts/${id}`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
}

export async function deletePost(postId) {
  try {
    const { data } = await axios.delete(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
}

export async function getUserPosts(userId) {
  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/users/${userId}/posts?limit=2`,
      { headers: { token: localStorage.getItem("token") } }
    );
    return data;
  } catch (error) {
    return error;
  }
}
