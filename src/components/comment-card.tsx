"use client";
import React, { useState } from "react";

interface CommentCardProps {
  name: string;
  email: string;
  body: string;
}
export default function CommentCard({name, email, body}: CommentCardProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full" style={{ paddingLeft: `20px` }}>
      <div className="my-5 p-6 rounded-md border border-grey">
        <div className="flex gap-3 items-center mb-8">
          <img src="/imgs/avav-square.jpg" className="w-6 h-6 rounded-full" />
          <p className="line-clamp-1">{name} @{email}</p>
          <p className="min-w-fit">27 Augustus 2024</p>
        </div>

        <p className="font-gelasio text-xl ml-3">{body}</p>

      </div>
    </div>
  );
}
