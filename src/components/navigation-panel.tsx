import { clearUser } from '@/redux/store/userSlice';
import Link from 'next/link';
import React from 'react'
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

interface User {
  email: string
  gender: string
  id: number
  name: string
  status: string
}
interface NavigationPanelProps{
    user: User
}
export default function NavigationPanel({user} : NavigationPanelProps) {
    const dispatch = useDispatch();
    const router = useRouter();

    const signOutUser = () => {
      dispatch(clearUser())
      localStorage.removeItem("user");
      router.push("/auth");
    };
  return (
    <div
      className="absolute right-0 z-50"
    >
      <div className="bg-white abosolute right-0 border border-grey w-60 duration-200">
        <Link href="/dashboard/write" className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>

        <Link href={`/setting`} className="link pl-8 py-4">
          Profile
        </Link>

        <Link href="/dashboard" className="link pl-8 py-4">
          Dashboard
        </Link>

        <span className="absolute border-t border-grey w-[100%]"></span>

        <button
          className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
          onClick={signOutUser}
        >
          <h1 className="font-bold text-xl mg-1">Sign Out</h1>
          <p className="text-dark-grey">@{user.name}</p>
        </button>
      </div>
    </div>
  );
}
