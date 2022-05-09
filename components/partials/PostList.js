// Components
import Container from "components/template/Container";
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
            : "";
    };

    return (
        <Container blur={props.blur}>
            <List>{renderPosts()}</List>
        </Container>
    );
};

export default PostList;
