import { Card, Typography } from "@mui/material";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery } from "react-moralis";
import Post from "./Post";

const Posts = () => {
  const { selectedCategory } = useMoralisDapp();

  const queryPost = useMoralisQuery(
    "Posts",
    (query) => query.equalTo("categoryId", selectedCategory["categoryId"]),
    [selectedCategory],
    { live: true }
  );

  const fetchedPosts = JSON.parse(
    JSON.stringify(queryPost.data, ["postId", "contentId", "postOwner"])
  ).reverse();
  const havePosts = fetchedPosts.length > 0 ? true : false;

  const emptyResult = (
    <Card style={{ textAlign: "center", padding: 24, borderRadius: 5 }}>
      <Typography variant="h6" color="unset">
        No Proposals yet
      </Typography>
    </Card>
  );

  const postResult = (
    <div>
      {fetchedPosts.map((post) => (
        <Card
          key={post["postId"]}
          sx={{ padding: "0px 15px", marginBottom: "10px" }}
        >
          <Post key={post["postId"]} post={post} />
        </Card>
      ))}
    </div>
  );

  return havePosts ? postResult : emptyResult;
};

export default Posts;
