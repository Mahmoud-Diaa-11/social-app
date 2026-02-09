import React, { useContext, useState } from "react";
import SingleComment from "../SingleComment/SingleComment";
import { Link } from "react-router-dom";
import { Button, Input } from "@heroui/react";
import { addComment } from "../../services/commentApi";
import DropDown from "../DropDown/PostDropDown";
import PostDropDown from "../DropDown/PostDropDown";
import { AuthContext } from "../../context/AuthContext";

function PostCard({ post, allComments, callback }) {
  const { userData } = useContext(AuthContext);
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function createComment(e) {
    setIsLoading(true);
    e.preventDefault();
    let response = await addComment(commentContent, post._id);
    console.log(response);
    if (response.message == "success") {
      await callback();
    }
    setCommentContent("");
    setIsLoading(false);
  }

  return (
    <>
      <div className="w-full flex flex-col px-3 lg:px-10">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
            <div className="w-full h-16 items-center flex justify-between ">
              <div className="flex">
                <img
                  className=" rounded-full w-10 h-10 mr-3"
                  src={post.user.photo}
                  alt={post.user.name}
                />

                <div>
                  <h3 className="text-md font-semibold ">{post.user.name}</h3>
                  <p className="text-xs text-gray-500">
                    {post.createdAt
                      .replace("T", " ")
                      .split(".")
                      .slice(0, 1)
                      .join(" ")}
                  </p>
                </div>
              </div>
              {userData._id == post.user._id && (
                <PostDropDown callBack={callback} id={post._id} />
              )}
            </div>
            {post.body && <p>{post.body}</p>}
            {post.image && (
              <img
                className="w-full object-cover h-120"
                src={post.image}
                alt={post.body}
              />
            )}
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
                  <Link to={`/singlepost/${post.id}`}>
                    {post.comments.length} comments
                  </Link>
                </p>
              </div>
            </div>

            {/* interaction */}
            <div className="grid grid-cols-3 w-full py-3 px-5 my-3 border-t-1 border-gray-300 ">
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
                  Comment
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
            {/* Add Comment */}
            <div className=" w-full">
              <form onSubmit={createComment} className="flex gap-3">
                <Input
                  value={commentContent}
                  onChange={(e) => {
                    setCommentContent(e.target.value);
                  }}
                  placeholder="Add Your Comment"
                  variant="bordered"
                />
                <Button
                  className="px-6"
                  isLoading={isLoading}
                  type="submit"
                  color="primary"
                >
                  Add Comment
                </Button>
              </form>
            </div>

            {/* comment */}
            {post.comments.length > 0 && allComments == false ? (
              <SingleComment
                callback={callback}
                id={post.user._id}
                comment={post.comments[0]}
              />
            ) : (
              post.comments.map((comment) => {
                return <SingleComment key={comment._id} comment={comment} />;
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;
