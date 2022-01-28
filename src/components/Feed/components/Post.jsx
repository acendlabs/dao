import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery, useWeb3ExecuteFunction } from "react-moralis";
import { useEffect, useState, createElement } from "react";
import { Comment, message } from "antd";
import { Avatar, Divider, Typography, Tooltip } from "@mui/material";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import Blockie from "components/Blockie";
import Votes from "./Votes";

const Post = ({ post }) => {
  const { contentId, postId, postOwner } = post;
  const [postContent, setPosContent] = useState({
    title: "default",
    content: "default",
  });
  const { data } = useMoralisQuery("Contents", (query) =>
    query.equalTo("contentId", contentId)
  );
  const [voteStatus, setVoteStatus] = useState();
  const { data: votes } = useMoralisQuery(
    "Votes",
    (query) => query.equalTo("postId", postId),
    [],
    {
      live: true,
    }
  );

  const { walletAddress, contractABI, contractAddress } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);
  const contractProcessor = useWeb3ExecuteFunction();

  useEffect(() => {
    function extractUri(data) {
      const fetchedContent = JSON.parse(JSON.stringify(data, ["contentUri"]));
      const contentUri = fetchedContent[0]["contentUri"];
      return contentUri;
    }
    async function fetchIPFSDoc(ipfsHash) {
      console.log(ipfsHash);
      const url = ipfsHash;
      const response = await fetch(url);
      return await response.json();
    }
    async function processContent() {
      const content = await fetchIPFSDoc(extractUri(data));
      setPosContent(content);
    }
    if (data.length > 0) {
      processContent();
    }
  }, [data]);

  useEffect(() => {
    if (!votes?.length) return null;

    async function getPostVoteStatus() {
      const fetchedVotes = JSON.parse(JSON.stringify(votes));
      fetchedVotes.forEach(({ voter, up }) => {
        if (voter === walletAddress) setVoteStatus(up ? "liked" : "disliked");
      });
      return;
    }

    getPostVoteStatus();
  }, [votes, walletAddress]);

  async function vote(direction) {
    if (walletAddress.toLowerCase() === postOwner.toLowerCase())
      return message.error("You cannot vote on your posts");
    if (voteStatus) return message.error("Already voted");
    const options = {
      contractAddress: contractAddress,
      functionName: direction,
      abi: contractABIJson,
      params: {
        _postId: post["postId"],
        [direction === "voteDown" ? "_reputationTaken" : "_reputationAdded"]: 1,
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => console.log("success"),
      onError: (error) => console.error(error),
    });
  }

  const actions = [
    <Tooltip key="comment-basic-like" title="for">
      <span
        style={{
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          marginRight: "16px",
          color: "yellow",
        }}
        onClick={() => vote("voteUp")}
      >
        {createElement(voteStatus === "liked" ? LikeFilled : LikeOutlined)} For
      </span>
    </Tooltip>,
    <span style={{ fontSize: "15px", color: "white" }}>
      <Votes postId={postId} />
    </span>,
    <Tooltip key="comment-basic-dislike" title="against">
      <span
        style={{
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          marginLeft: "8px",
          color: "yellow",
        }}
        onClick={() => vote("voteDown")}
      >
        {createElement(
          voteStatus === "disliked" ? DislikeFilled : DislikeOutlined
        )}{" "}
        Against
      </span>
    </Tooltip>,
  ];

  const loading = "";

  const result = (
    <Comment
      style={{ backgroundColor: "transparent" }}
      actions={actions}
      author={
        <Typography variant="subtitle2" color="gray" gutterBottom>
          {post["postOwner"]}
        </Typography>
      }
      avatar={
        <Avatar sx={{ width: 30, height: 30 }}>
          <Blockie address={post["postOwner"]} scale={4} />
        </Avatar>
      }
      content={
        <>
          <Typography variant="h6" color="white" gutterBottom>
            {postContent["title"]}
          </Typography>
          <Typography variant="body1" gutterBottom paragraph>
            {postContent["content"]}
          </Typography>
          <Divider sx={{ margin: "15px 0" }} />
        </>
      }
    />
  );

  return postContent["title"] === "default" ? loading : result;
};

export default Post;
