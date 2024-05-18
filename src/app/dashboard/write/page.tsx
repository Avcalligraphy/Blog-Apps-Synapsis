'use client'

import AuthenticatedDashboard from '@/Layouts/SideNav'
import InputBox from '@/components/input';
import { RootState } from '@/redux/store/store';
import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function Write() {
    const user = useSelector((state: RootState) => state.user.userData);
     const [formData, setFormData] = useState({
       title: "",
       body: ""
     });

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

         await axios.post(
           `${apiUrl}/users/${user?.id}/posts`,
           formData,
           {
             headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: `Bearer ${accessToken}`,
             },
           }
         );
         setFormData({
           title: "",
           body: ""
         });
         toast.success("Successfully created post!");

       } catch (error) {
         console.error("Error creating user:", error);
         toast.error("Failed created post!");
       }
     };
  return (
    <AuthenticatedDashboard>
      <div className="w-full">
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className="font-bold text-[32px] mb-8 ">Create Post</h1>
        <form onSubmit={handleSubmit}>
          <label className="text-[18px] font-bold mb-2 ">Title</label>
          <div className="relative w-[100%] mb-4">
            <input
              className="input-box"
              placeholder="Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <i className={"fi fi-rr-attribution-pencil " + " input-icon"}></i>
          </div>
          <label className="text-[18px] font-bold mb-2 ">Content</label>
          <div className="relative w-[100%] mb-4">
            <textarea
              className="input-box"
              placeholder="Content"
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
            />
            <i className={"fi fi-rr-document " + " input-icon-area"}></i>
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
          >
            Post
          </button>
        </form>
      </div>
    </AuthenticatedDashboard>
  );
}
