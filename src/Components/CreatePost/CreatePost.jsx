import { Button } from "@heroui/react";
import { useState } from "react";
import { createPost } from "../../services/createPost";

export default function CreatePost({ callBack }) {
  const [postBody, setPostBody] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  async function addPost(e) {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("body", postBody ?? "");
    if (image) {
      formData.append("image", image);
    }
    const response = await createPost(formData);
    if (response.message == "success") {
      await callBack();
      setPostBody("");
      setImage("");
    }
    setLoading(false);
  }

  function handleImage(e) {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    e.target.value = "";
  }

  return (
    <>
      <form onSubmit={addPost}>
        <div className="editor mt-1 bg-white mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg w-full max-w-2xl">
          <h2 className="text-center text-3xl font-bold mb-2">Add Post</h2>

          <textarea
            value={postBody}
            onChange={(e) => {
              setPostBody(e.target.value);
            }}
            className="description bg-gray-100 sec p-3 h-30 border border-gray-300 outline-none"
            spellCheck="false"
            placeholder="Add Post"
          />
          {/* icons */}
          <div className="icons flex text-gray-500 m-2">
            <input onChange={handleImage} id="fileInput" type="file" hidden />
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <label htmlFor="fileInput">
              <svg
                className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </label>
            <div className="count ml-auto text-gray-400 text-xs font-semibold">
              0/300
            </div>
          </div>

          {/* image Preview */}
          {image && (
            <div className="image-review my-2 relative">
              <img src={imageUrl} alt="Post Image" />
              <svg
                onClick={() => {
                  setImage("");
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 absolute top-4 right-4 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}

          {/* button */}
          <div className="buttons flex justify-end">
            <Button color="primary" isLoading={loading} type="submit">
              Post
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
