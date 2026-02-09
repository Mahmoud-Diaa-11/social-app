import axios from "axios";

export async function addComment(content, id) {
  try {
    let { data } = await axios.post(
      "https://linked-posts.routemisr.com/comments",
      {
        content: content,
        post: id,
      },
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

export async function deleteMyComment(id) {
  try {
    let { data } = await axios.delete(
      `https://linked-posts.routemisr.com/comments/${id}`,
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

export async function updateComment(commentId, commentContent) {
  try {
    const { data } = await axios.put(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
      { content: commentContent },
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
