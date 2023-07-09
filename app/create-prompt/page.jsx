"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  // có nghĩa là biến session lấy giá trị trường data của nó

  const [submiting, setSubmiting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const createPropmt = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("🚀 ~ file: page.jsx:27 ~ createPropmt ~ error:", error);
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submiting={submiting}
        handleSubmit={createPropmt}
      />
    </div>
  );
};

export default page;
