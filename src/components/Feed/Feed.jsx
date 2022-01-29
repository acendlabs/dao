import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useState } from "react";
import Posts from "./components/Posts";
// import Reputation from "components/Reputation";
import Blockie from "components/Blockie";
import AddPost from "./components/AddPost";

import { Card, Typography, Avatar, Button, Stack } from "@mui/material";

const Feed = () => {
  const { selectedCategory } = useMoralisDapp();
  const [showAddPost, setShowAddPost] = useState(false);

  let result = null;

  function toogleShowAddPost() {
    setShowAddPost(!showAddPost);
  }

  if (selectedCategory["category"] === "default") {
  } else {
    result = (
      <Stack spacing={2} sx={{ width: 1 }}>
        <Card
          sx={{
            padding: "10px 13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 2,
          }}
        >
          <Avatar sx={{ width: 30, height: 30 }}>
            <Blockie currentWallet />
          </Avatar>
          <Typography variant="h5" color="unset">
            Proposals
          </Typography>
          <Button
            sx={{ borderRadius: 5 }}
            variant="outlined"
            onClick={toogleShowAddPost}
          >
            Propose
          </Button>
        </Card>
        {showAddPost ? <AddPost /> : ""}
        <Posts />
      </Stack>
    );
  }

  return result;
};

export default Feed;
