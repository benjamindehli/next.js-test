// Components
import List from "components/template/List";
import ListItem from "components/template/List/ListItem";
import PostItem from "./PostItem";

const PostList = (props) => {
    const renderPosts = () => {
        return props.posts?.length
            ? props.posts.map((post) => {
                  return (
                      <ListItem key={post._id}>
                          <PostItem post={post} />
                      </ListItem>
                  );
              })
            : null;
    };
    return <List>{renderPosts()}</List>;
};

export default PostList;
