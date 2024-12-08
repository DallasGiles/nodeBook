import React from "react";
import FeedPost from "../feed/feedPost";

const Feed = () => {
  // A mock array of post data
  const posts = [
    {
      profilePicture: "https://via.placeholder.com/40", // Mock profile picture
      username: "John Doe", // Username of the poster
      postImage: "https://via.placeholder.com/500", // Image associated with the post
      title: "Amazing Post Title", // Post title
      description: "This is a description of the post.", // Post description
    },
    {
      profilePicture: "https://via.placeholder.com/40",
      username: "Jane Smith",
      postImage: "https://via.placeholder.com/500",
      title: "Beautiful Scenery",
      description: "Look at this breathtaking view.",
    },
    {
      profilePicture: "https://via.placeholder.com/40",
      username: "Mike Johnson",
      postImage: "https://via.placeholder.com/500",
      title: "Exciting News!",
      description: "Here is some exciting news for today.",
    },
  ];

  return (
    <div className="feed-wrapper">
      <div className="feed-container">
        {/* Render each FeedPost component using data from the posts array */}
        {posts.map((post, index) => (
          <FeedPost key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;