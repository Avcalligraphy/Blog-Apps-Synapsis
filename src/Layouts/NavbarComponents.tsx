"use client";

import NavigationPanel from "@/components/navigation-panel";
import { RootState } from "@/redux/store/store";
import Link from "next/link";
import React, { ReactNode, use, useState } from "react";
import { useSelector } from "react-redux";

export default function NavbarComponents({children}: {children:ReactNode}) {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [userNavPanel, setUserNavPanel] = useState(false);
  const handleUserNavPanel = () => {
    setUserNavPanel((currentVal) => !currentVal);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };

  const user = useSelector((state: RootState) => state.user.userData);

  return (
    <>
    <section className="navbar z-50">
      <Link href="/" className="flex-none w-10">
        <img src="/imgs/logo-dark.png" className="w-full" />
      </Link>

      <div className="flex items-center gap-3 md:gap-6 ml-auto">

        {user ? (<Link href="/dashboard/write" className="hidden md:flex gap-2 link">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>) : null}
        {user ? (
            <div
              className="relative"
              onClick={handleUserNavPanel}
              onBlur={handleBlur}
            >
              <button className="w-12 h-12 mt-1">
                <img
                  src="/imgs/avav-square.jpg"
                  className="w-full h-full object-cover rounded-full"
                />
              </button>

              {userNavPanel ? <NavigationPanel user={user} /> : ""}
            </div>
        ) : (
          <>
            <Link className="btn-dark py-2" href="/auth">
              Sign In
            </Link>
            <Link className="btn-light py-2 hidden md:block" href="/register">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </section>
    <section>{children}</section>
    </>
  );
}
