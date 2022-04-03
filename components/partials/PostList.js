// Dependencies
import { Fragment } from "react";
import { useRouter } from "next/router";

// Components
import PostItem from "./PostItem";

const PostList = (props) => {
  const router = useRouter();

  return (
    <Fragment>
      {props.posts.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
    </Fragment>
  );
};

export default PostList;
