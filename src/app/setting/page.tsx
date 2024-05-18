"use client";
import AuthenticatedDashboard from "@/Layouts/SideNav";
import InputBox from "@/components/input";
import { RootState } from "@/redux/store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/store/userSlice";

export default function Setting() {
  const user = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    email: "",
    status: "active",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        gender: user.gender,
        email: user.email,
        status: user.status,
      });
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await axios.patch(
        `${apiUrl}/users/${user?.id}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      dispatch(setUser(response.data));
      localStorage.setItem("user", JSON.stringify(response.data));

      setFormData({
        name: response.data.name,
        gender: response.data.gender,
        email: response.data.email,
        status: response.data.status,
      });

      toast.success("Successfully updated account!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update account!");
    }
  };

  return (
    <AuthenticatedDashboard>
      <section className="flex items-center justify-center">
        <Toaster />
        <form
          id="formElement"
          onSubmit={handleSubmit}
          className="w-[80%] max-w-[400px]"
        >
          <h1 className="font-bold text-[32px] mb-8 ">Edit Profile</h1>

          <InputBox
            name="name"
            type="text"
            placeholder="Name"
            icon="fi-rr-attribution-pencil"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="relative w-[100%] mb-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input-box "
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <i className={"fi fi-rr-venus-mars " + " input-icon"}></i>
          </div>
          <div className="relative w-[100%] mb-4">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input-box "
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <i className={"fi fi-rr-check-circle " + " input-icon"}></i>
          </div>
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
            value={
              user?.email === "admin@synapsis.com"
                ? "12345678"
                : user?.id.toString()
            }
          />

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
          >
            Update Account
          </button>
        </form>
      </section>
    </AuthenticatedDashboard>
  );
}
