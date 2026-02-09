import { useContext, useEffect, useState } from "react";

import { createPost, getUserPosts } from "../services/createPost";
import userImage from "../assets/user.png";
import { AuthContext } from "../context/AuthContext";
import { Button, Input } from "@heroui/react";

function Profile() {
  const { userData } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);

  const [postBody, setPostBody] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = userData?._id;
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
  async function getProfilePosts() {
    const response = await getUserPosts(userId);
    if (response.message == "success") {
      setUserPosts(response.posts);
      console.log(response);
    }
  }

  useEffect(() => {
    if (userId) {
      getProfilePosts();
    }
  }, [userId]);
  return (
    <>
      <div className="min-h-screen w-full max-w-2xl mx-auto px-4">
        <form onSubmit={addPost}>
          <div className="editor mt-1 bg-white   flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg ">
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

        {userPosts.map((post) => {
          return (
            <div key={post._id}>
              <div className=" w-full flex flex-col px-3 lg:px-10">
                <div>
                  <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
                    <div className="w-full h-16  items-center flex justify-between ">
                      <div className="flex">
                        <img
                          className=" rounded-full w-10 h-10 mr-3"
                          src={post.user.photo}
                        />
                        <div>
                          <h3 className="text-md font-semibold ">
                            {post.user.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {post.createdAt
                              .replace("T", " ")
                              .split(".")
                              .slice(0, 1)
                              .join(" ")}
                          </p>
                        </div>
                      </div>
                      <svg
                        className="w-16"
                        xmlns="http://www.w3.org/2000/svg"
                        width={27}
                        height={27}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#b0b0b0"
                        strokeWidth={2}
                        strokeLinecap="square"
                        strokeLinejoin="round"
                      >
                        <circle cx={12} cy={12} r={1} />
                        <circle cx={19} cy={12} r={1} />
                        <circle cx={5} cy={12} r={1} />
                      </svg>
                    </div>
                    <p>{post.body}</p>

                    <div className="w-full h-8 flex items-center px-3 my-3">
                      <div className="bg-blue-500 z-10 w-5 h-5 rounded-full flex items-center justify-center ">
                        <svg
                          className="w-3 h-3 fill-current text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          width={27}
                          height={27}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#b0b0b0"
                          strokeWidth={2}
                          strokeLinecap="square"
                          strokeLinejoin="round"
                        >
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                      </div>
                      <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center -ml-1">
                        <svg
                          className="w-3 h-3 fill-current stroke-current text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          width={27}
                          height={27}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#b0b0b0"
                          strokeWidth={2}
                          strokeLinecap="square"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </div>
                      <div className="w-full flex justify-between">
                        <p className="ml-3 text-gray-500">8</p>
                        <p className="ml-3 text-gray-500">
                          {post.comments.length} comments
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 border-b-1 py-3 border-gray-300 w-full  px-5 my-3">
                      <button className="flex flex-row justify-center items-center w-full space-x-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={27}
                          height={27}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#838383"
                          strokeWidth={2}
                          strokeLinecap="square"
                          strokeLinejoin="round"
                        >
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                        <span className="font-semibold text-lg text-gray-600">
                          Like
                        </span>
                      </button>
                      <button className="flex flex-row justify-center items-center w-full space-x-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={27}
                          height={27}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#838383"
                          strokeWidth={2}
                          strokeLinecap="square"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span className="font-semibold text-lg text-gray-600">
                          comment
                        </span>
                      </button>
                      <button className="flex flex-row justify-center items-center w-full space-x-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={27}
                          height={27}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#838383"
                          strokeWidth={2}
                          strokeLinecap="square"
                          strokeLinejoin="round"
                        >
                          <circle cx={18} cy={5} r={3} />
                          <circle cx={6} cy={12} r={3} />
                          <circle cx={18} cy={19} r={3} />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                        <span className="font-semibold text-lg text-gray-600">
                          Share
                        </span>
                      </button>
                    </div>
                    <div className=" w-full ">
                      <form className="flex gap-3">
                        <Input
                          placeholder="Add Your Comment"
                          variant="bordered"
                        />
                        <Button className="px-6" type="submit" color="primary">
                          Add Comment
                        </Button>
                      </form>
                    </div>
                    {post.comments.length > 0 && (
                      <div className="p-3  border-gray-300  border mt-4 ">
                        <div className="flex justify-between">
                          <div className="flex">
                            <img
                              onError={(e) => {
                                e.target.src = userImage;
                              }}
                              className=" rounded-full w-10 h-10 mr-3"
                              src={post.comments[0]?.commentCreator.photo}
                              alt={post.comments[0]?.commentCreator.name}
                            />
                            <div>
                              <h3 className="text-md font-semibold ">
                                {post.comments[0]?.commentCreator.name}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {post.comments[0]?.createdAt
                                  .replace("T", " ")
                                  .split(".")
                                  .slice(0, 1)
                                  .join(" ")}
                              </p>
                              <p className="mt-1 ">
                                {post.comments[0]?.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Profile;
