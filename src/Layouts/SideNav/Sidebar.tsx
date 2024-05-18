'use client'
import Link from 'next/link';
import React, { ReactNode, useState } from 'react'
import { usePathname } from "next/navigation";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

export default function SideBar({children}: {children: ReactNode}) {
    const [showSideNav, setShowSideNav] = useState(false);
    const pathname = usePathname();
    const user = useSelector((state: RootState) => state.user.userData);
  return (
    <section className="relative flex gap-10 py-0 m-0 max-md:flex-col">
      <div className="sticky top-[80px] z-30">
        <div className="md:hidden bg-white py-1 border-b border-grey flex justify-between flex-nowrap overflow-x-auto ">
          <button
            className="p-5 capitalize"
            onClick={() => setShowSideNav(true)}
          >
            <i className="fi fi-rr-bars-staggered pointer-events-none"></i>
          </button>
          <button
            className="p-5 capitalize"
            onClick={() => setShowSideNav(false)}
          >
            {showSideNav ? <i className="fi fi-sr-cross-small"></i> : null}
          </button>
          <hr className="absolute bottom-0 duration-500" />
        </div>
        <div
          className={
            "min-w-[200px] h-[calc(100vh-80px-60px)] md:h-cover md:sticky top-24 overflow-y-auto p-6 md:pr-0 md:border-grey md:border-r absolute max-md:top-[64px] bg-white max-md:w-[calc(100%+80px)] max-md:px-16 max-md:-ml-7 duration-500 " +
            (!showSideNav
              ? "max-md:opacity-0 max-md:pointer-events-none"
              : "opacity-100 pointer-events-auto")
          }
        >
          <h1 className="text-xl text-dark-grey mb-3">Dashboard</h1>
          <hr className="border-grey -ml-6 mb-8 mr-6" />

          <Link
            href="/dashboard"
            className={`sidebar-link ${
              pathname === "/dashboard" ? "active" : ""
            }`}
          >
            <i className="fi fi-rr-document"></i>
            Blogs
          </Link>

          <Link
            href="/dashboard/write"
            className={`sidebar-link ${
              pathname === "/dashboard/write" ? "active" : ""
            }`}
          >
            <i className="fi fi-rr-file-edit"></i>
            Write
          </Link>

          <h1 className="text-xl text-dark-grey mt-20 mb-3">Settings</h1>
          <hr className="border-grey -ml-6 mb-8 mr-6" />

          {user?.email === 'admin@synapsis.com' ? (<Link
            href="/all-user"
            className={`sidebar-link ${
              pathname === "/all-user" ? "active" : ""
            }`}
          >
            <i className="fi fi-rr-users-alt"></i>
            All User
          </Link>
          ) : null}
          <Link
            href="/setting"
            className={`sidebar-link ${
              pathname === "/setting" ? "active" : ""
            }`}
          >
            <i className="fi fi-rr-user"></i>
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="max-md:-mt-8 mt-5 w-full">{children}</div>
    </section>
  );
}
