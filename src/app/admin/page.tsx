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

export default function Admin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.userData);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = window.localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

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

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
      const response = await axios.get(`${apiUrl}/users/${token === null ? '6914371' : token}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const user = response.data;
      if (user && user.email === formData.email && formData.password === '12345678') {
        dispatch(setUser(user));
        window?.localStorage?.setItem("user", JSON.stringify(user));
        router.push("/dashboard");
      } else {
        toast.error("Email atau password salah");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
          const createUserPayload = {
            name: "Admin",
            gender: "male",
            email: "admin@synapsis.com",
            status: "active",
          };
          const response = await axios.post(
            `${apiUrl}/users`,
            createUserPayload,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const user = response.data;
          dispatch(setUser(user));
          window?.localStorage?.setItem("user", JSON.stringify(user));
          window?.localStorage?.removeItem("token");
          window?.localStorage?.setItem("token", user.id);
          router.push("/dashboard");
        } catch (createError) {
          toast.error("Gagal membuat user admin");
        }
      } else {
        toast.error("User tidak ditemukan atau email salah");
      }
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
          Welcome Back Admin
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

      </form>
    </section>
  );
}
