"use client";

import InputBox from "@/components/input";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/store/userSlice";
import Loader from "@/components/loader";
import { RootState } from "@/redux/store/store";


export default function Auth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user.userData);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  

  useEffect(() => {
    if (user && user.status === "active") {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
      const response = await axios.get(`${apiUrl}/users/${formData.password}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const user = response.data;
      if (user && user.email === formData.email && user.status === 'active') {
        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/dashboard");
      } else {
        setError("Email atau password salah");
        toast.error("Email atau password salah");
      }
    } catch (error) {
      setError("User tidak ditemukan atau email salah");
      toast.error("User tidak ditemukan atau email salah");
    } finally {
      setLoading(false);
    }
  };

  if (user && user.status === "active") {
    return <Loader />;
  }

  return (
    <section className="h-cover flex items-center justify-center">
      <Toaster />
      <form
        id="formElement"
        onSubmit={handleSubmit}
        className="w-[80%] max-w-[400px]"
      >
        <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
          Welcome Back
        </h1>
        <InputBox
          name="email"
          type="email"
          placeholder="Email"
          icon="fi-rr-envelope"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <InputBox
          name="password"
          type="password"
          placeholder="Password"
          icon="fi-rr-key"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          className="btn-dark center mt-14"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>


        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>

        <p className="mt-6 text-dark-grey text-xl text-center">
          Do you already have an account?
          <Link href="/register" className="underline text-black text-xl ml-1">
            Sign up here.
          </Link>
        </p>
      </form>
    </section>
  );
}
