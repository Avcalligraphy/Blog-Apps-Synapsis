import React, { useState } from "react";
import CommentField from "./comment-field";
import CommentCard from "./comment-card";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface PostCommentProps {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}

interface CommentsProps {
  onClick: () => void;
  postsComment: PostCommentProps[];
  commentId: string;
  username: string | null
}

export default function CommentsContainer({
  onClick,
  postsComment,
  commentId,
  username
}: CommentsProps) {
  const user = useSelector((state: RootState) => state.user.userData);

  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    body: "",
  });

  const [comments, setComments] = useState(postsComment);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await axios.post(
        `${apiUrl}/posts/${commentId}/comments`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setComments([...comments, response.data]);

      setFormData({
        name: user?.name,
        email: user?.email,
        body: "",
      });
      toast.success("Successfully created comment!");
    } catch (error) {
      console.error("Error creating comment:", error);
      toast.error(
        `${
          user === null
            ? "Please login to create comment!"
            : "Failed to create comment!"
        }`
      );
    }
  };

  return (
    <div
      className={
        "max-sm:w-full fixed " +
        "top-0 sm:right-0" +
        " duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-8 px-16 overflow-y-auto overflow-x-hidden"
      }
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative">
        <h1 className="text-xl font-medium">Comments</h1>
        <p className="text-lg mt-2 w-[70%] text-dark-grey line-clamp-1">
          {username ? username : "user not found"}
        </p>

        <button
          onClick={onClick}
          className="absolute top-0 right-0 flex justify-center items-center w-12 h-12 rounded-full bg-grey"
        >
          <i className="fi fi-br-cross text-2xl mt-1"></i>
        </button>
      </div>

      <hr className="border-grey my-8 w-[120%] -ml-10" />

      <form onSubmit={handleSubmit}>
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Leave a comment..."
          className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto"
        ></textarea>
        <button type="submit" className="btn-dark mt-5 px-10">
          Comment
        </button>
      </form>

      {comments.map((comment) => (
        <CommentCard
          name={comment.name}
          email={comment.email}
          body={comment.body}
          key={comment.id}
        />
      ))}

    </div>
  );
}
