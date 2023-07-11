"use client";

import React, { useState, useEffect } from "react";

import PromptCard from "@components/PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = async (e) => {
    setSearchText(e.target.value);
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log("🚀 ~ file: Feed.jsx:29 ~ fetchPosts ~ error:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  //
  return (
    <section className="feed">
      <form className="relative w-full flex-center "></form>
      <input
        placeholder="Search for a tag or a username"
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer"
      />
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
