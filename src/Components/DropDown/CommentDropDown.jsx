import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { deleteMyComment } from "../../services/commentApi";

export default function CommentDropDown({
  callback,
  commentId,
  setIsUpdating,
}) {
  async function deleteComment() {
    const response = await deleteMyComment(commentId);
    if (response.message == "success") {
      await callback();
    }
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="p-0 bg-white ">...</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          onPress={() => {
            setIsUpdating(true);
          }}
          key="edit"
        >
          Edit Comment
        </DropdownItem>
        <DropdownItem
          onPress={deleteComment}
          key="delete"
          className="text-danger"
          color="danger"
        >
          Delete Comment
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
