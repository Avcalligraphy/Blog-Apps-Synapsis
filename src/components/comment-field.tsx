import React from 'react'
import { Toaster } from 'react-hot-toast';

export default function CommentField({action}: {action: string}) {
  return (
    <>
      <Toaster />
      <textarea
        placeholder="Leave a comment..."
        className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto"
      ></textarea>
      <button className="btn-dark mt-5 px-10" >
        {action}
      </button>
    </>
  );
}
