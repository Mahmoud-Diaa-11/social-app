import React, { useContext, useState } from "react";
import userImage from "../../assets/user.png";
import CommentDropDown from "../DropDown/CommentDropDown";
import { AuthContext } from "../../context/AuthContext";
import { Button, Input } from "@heroui/react";
import { updateComment } from "../../services/commentApi";
function SingleComment({ comment, id, callback }) {
  const { userData } = useContext(AuthContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedValue, setUpdatedValue] = useState(comment.content);
  async function handleUpdate(e) {
    e.preventDefault();
    const response = await updateComment(comment._id, updatedValue);
    setIsUpdating(false);
    console.log(response);
    if (response.message == "success") {
      await callback();
    }
  }

  return (
    <>
      <div className="p-3 border-gray-300  border mt-4 ">
        <div className="flex justify-between">
          <div className="flex">
            <img
              className=" rounded-full w-10 h-10 mr-3"
              onError={(e) => {
                e.target.src = userImage;
              }}
              src={comment?.commentCreator.photo}
              alt={comment?.commentCreator.name}
            />
            <div>
              <h3 className="text-md font-semibold ">
                {comment?.commentCreator.name}
              </h3>
              <p className="text-xs text-gray-500">
                {comment?.createdAt
                  .replace("T", " ")
                  .split(".")
                  .slice(0, 1)
                  .join(" ")}
              </p>
              <p className="mt-1 ">{comment?.content}</p>
            </div>
          </div>

          {userData._id == comment.commentCreator._id && userData._id == id && (
            <CommentDropDown
              setIsUpdating={setIsUpdating}
              callback={callback}
              commentId={comment._id}
            />
          )}
        </div>
        {isUpdating && (
          <form
            onSubmit={handleUpdate}
            className="flex items-center mt-2 gap-2 "
          >
            <Input
              value={updatedValue}
              onChange={(e) => {
                setUpdatedValue(e.target.value);
              }}
              variant="bordered"
              type="text"
              placeholder="Update Comment"
            />
            <Button type="submit" color="primary">
              Update
            </Button>
          </form>
        )}
      </div>
    </>
  );
}

export default SingleComment;
