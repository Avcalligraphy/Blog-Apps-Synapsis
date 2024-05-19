'use client'
import React, { ReactNode, useEffect } from "react";
import SideBar from "./Sidebar";
import NavbarComponents from "../NavbarComponents";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import { RootState } from "@/redux/store/store";

export default function AuthenticatedDashboard({ children }: {children: ReactNode}) {
  const user = useSelector((state: RootState) => state.user.userData);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.status !== "active") {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user || user.status !== "active") {
    return <Loader />
  }
  return (
    <section className="w-full">
      <NavbarComponents>
        <SideBar>{children}</SideBar>
      </NavbarComponents>
    </section>
  );
}
