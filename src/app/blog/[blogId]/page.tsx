"use client";
import BlogInteraction from "@/components/blog-interaction";
import CommentsContainer from "@/components/comments";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/loader";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

interface PostCommentProps {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}
export default function BlogDesk({ params }: { params: { blogId: string; user_id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [show, setShow] = useState(false);
  const [postsComment, setPostsComment] = useState<PostCommentProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const user_id = searchParams.get("user_id");
  const title = searchParams.get("title");
  const body = searchParams.get("body");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
        const response = await axios.get(`${apiUrl}/users/${user_id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data || null);
        setLoading(false);
      } catch (error) {
        setUser(null);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
        const response = await axios.get(
          `${apiUrl}/posts/${params.blogId}/comments`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPostsComment(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div>
        {show ? (
          <CommentsContainer
            commentId={params.blogId}
            postsComment={postsComment}
            onClick={() => setShow(false)}
            username={user ? user.name : null}
          />
        ) : null}

        <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
          <img src="/imgs/esp.png" className="aspect-video" />

          <div className="mt-12">
            <h2>{title}</h2>

            <div className="flex max-sm:flex-col justify-between my-8">
              <div className="flex gap-5 items-start">
                <img
                  src="/imgs/avav-square.jpg"
                  className="w-12 h-12 rounded-full"
                />

                <p className="capitalize">
                  {user_id}
                  <br />@<p>{user ? user?.name : "user not found"}</p>
                </p>
              </div>
              <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">
                {user ? user?.email : "user not found"}
              </p>
            </div>
          </div>

          <BlogInteraction
            onClick={() => setShow(true)}
            count={postsComment.length}
          />

          <div className="my-12 font-gelasio blog-page-content">
            <div className="my-4 md:my-8">{body}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
