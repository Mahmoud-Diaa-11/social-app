import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard/PostCard";
import { getAllPosts } from "../services/getAllPosts";
import Loading from "../Components/Loading/Loading";
import CreatePost from "../Components/CreatePost/CreatePost";

function Home() {
  const [posts, setPosts] = useState([]);
  async function getPosts() {
    let response = await getAllPosts();
    setPosts(response);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="bg-gray-300 ">
        <CreatePost callBack={getPosts} />
        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <PostCard
                key={post._id}
                callback={getPosts}
                allComments={false}
                post={post}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default Home;
