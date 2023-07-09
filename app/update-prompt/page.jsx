"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const page = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  // có nghĩa là biến session lấy giá trị trường data của nó
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  if (!promptId) console.log("not found");

  const [submiting, setSubmiting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);

        const data = await response.json();

        setPost({ prompt: data.prompt, tag: data.tag });
      } catch (error) {
        console.log(
          "🚀 ~ file: page.jsx:28 ~ getPromptDetails ~ error:",
          error
        );
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    if (!promptId) alert("Prompt ID not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/profile");
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
        type="Edit"
        post={post}
        setPost={setPost}
        submiting={submiting}
        handleSubmit={updatePrompt}
      />
    </div>
  );
};

export default page;
