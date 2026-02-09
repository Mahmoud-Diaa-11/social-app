import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../services/getAllPosts";
import PostCard from "../Components/PostCard/PostCard";
import Loading from "../Components/Loading/Loading";

function SinglePost() {
  const [postDetails, setPostDetails] = useState(null);
  const { id } = useParams();
  async function singlePost() {
    const response = await getSinglePost(id);
    if (response.message == "success") {
      setPostDetails(response.post);
    }
  }
  useEffect(() => {
    singlePost();
  }, []);
  return (
    <>
      <div className="min-h-screen">
        {postDetails ? (
          <PostCard post={postDetails} callback={singlePost} allComments={true} />
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default SinglePost;
