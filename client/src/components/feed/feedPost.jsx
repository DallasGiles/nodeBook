import React from "react";
import "../styles/feed.css";
import "../styles/repostButton.css"
import "../styles/likeButton.css"


const feedPost = ({ profilePicture, username, postImage, title, description }) => {
  return (
    <div className="feed-post">
      {/* Section 1: Header */}
      <div className="header">
        <img src={profilePicture} alt={`${username}'s profile`} className="profile-picture" />
        <span className="username">{username}</span>
      </div>

      {/* Section 2: Image */}
      <div className="image-container">
        <img src={postImage} alt="Post" className="post-image" />
      </div>

      {/* Section 3: Description and Buttons */}
      <div className="description-container">
        <div className="description">
          <h3 className="title">{title}</h3>
          <p className="text">{description}</p>
        </div>
        <div className="actions">
          <button className="action-button like-button"><svg class="icon" width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path></svg>
          </button>
          <label class="ui-bookmark">
    <input type="checkbox" />
    <div class="bookmark">
      <svg viewBox="0 0 32 32">
        <g>
          <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
        </g>
      </svg>
    </div>
  </label>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <p className="comments-link">Comments</p>
      </div>
    </div>
  );
};

export default feedPost;