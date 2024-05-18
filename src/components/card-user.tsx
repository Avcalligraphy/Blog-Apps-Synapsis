"use client";

import React, { useEffect, useState } from "react";
import InputBox from "./input";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

interface CardUserProps {
  onClick: () => void;
  onUserCreated: (newUser: User) => void;
  onUserUpdated: (updateUser: User) => void;
  updateUser: User | null;
}

export default function CardUser({
  onClick,
  onUserCreated,
  updateUser,
  onUserUpdated,
}: CardUserProps) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    email: "",
    status: "active",
  });

  useEffect(() => {
    if (updateUser) {
      setFormData({
        name: updateUser.name,
        gender: updateUser.gender,
        email: updateUser.email,
        status: updateUser.status,
      });
    }
  }, [updateUser]);

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

      if (updateUser) {
        const response = await axios.patch(`${apiUrl}/users/${updateUser.id}`, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        onUserUpdated(response.data);
      } else {
        const response = await axios.post(`${apiUrl}/users`, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        onUserCreated(response.data);
      }

      setFormData({
        name: "",
        gender: "",
        email: "",
        status: "",
      });
      onClick();
    } catch (error: any) {
      toast.error("Failed to save user!");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <button
              type="button"
              onClick={onClick}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="#c6c7c7"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close popup</span>
            </button>

            <div className="p-5 text-center ">
              <h3 className="text-2xl mb-0.5 font-medium">
                {updateUser ? "Update User" : "Create User"}
              </h3>
              <p className="mt-2 text-sm leading-4 text-slate-600">
                You must {updateUser ? "updated" : "created"} to perform this
                action.
              </p>

              <form className="w-full mt-8" onSubmit={handleSubmit}>
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

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                >
                  {updateUser ? "Update" : "Create"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
