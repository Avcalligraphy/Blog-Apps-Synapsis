import Link from 'next/link';
import React from 'react'
import { Toaster } from 'react-hot-toast';

interface BlogInteractionProps {
  onClick: () => void;
  count: number
}

export default function BlogInteraction({ onClick, count }: BlogInteractionProps) {
  return (
    <>
      <Toaster />
      <hr className="border-grey my-2" />

      <div className="flex gap-6 justify-between">
        <div className="flex gap-3 items-center">
          <button
            onClick={onClick}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80"
          >
            <i className="fi fi-rr-comment-dots"></i>
          </button>
          <p className="text-xl text-dark-grey">{count}</p>
        </div>

        <div className="flex gap-6 items-center">
            <i className="fi fi-brands-twitter text-xl hover:text-twitter"></i>
        </div>
      </div>

      <hr className="border-grey my-2" />
    </>
  );
}
