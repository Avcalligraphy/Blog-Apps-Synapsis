import Link from 'next/link';
import React from 'react'
import { useRouter } from "next/navigation";
interface BlogPostProps{
  title: string,
  body: string,
  user_id: number,
  id: number
}
export default function BlogPost(props: BlogPostProps) {
  const {title, body, user_id, id} = props
  const router = useRouter();
  const handleClick = () => {
    const url = `/blog/${id}?user_id=${encodeURIComponent(
      user_id
    )}&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
    router.push(url);
  };
  return (
    <button
      onClick={handleClick}
      className="flex gap-8 w-full justify-between items-center border-b border-grey pb-5 mb-4 text-left "
    >
      <div className="w-full">
        <div className="flex gap-2 items-center mb-7  ">
          <img src="/imgs/avav-square.jpg" className="w-6 h-6 rounded-full" />
          <p className="line-clamp-1">@{user_id} </p>
        </div>

        <h1 className="blog-title">{title}</h1>

        <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
          {body}
        </p>

        <div className="flex gap-4 mt-7">
          <span className="btn-light py-1 px-4">Hardware</span>
          <span className="ml-3 flex items-center gap-2 text-dark-grey">
            <i className="fi fi-rr-heart text-xl"></i>5
          </span>
        </div>
      </div>

      <div className="h-28 aspect-sqaure bg-grey">
        <img
          src="/imgs/esp.png"
          className="w-full h-full aspect-square object-cover"
        />
      </div>
    </button>
  );
}
