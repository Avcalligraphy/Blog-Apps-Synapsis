'use client'
import InputBox from "@/components/input";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/store/userSlice";
import { RootState } from "@/redux/store/store";
import Loader from "@/components/loader";

export default function Register() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    email: '',
    status: 'active',
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

    try {
      const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await axios.post(`${apiUrl}/users`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch(setUser(response.data));
      localStorage.setItem("user", JSON.stringify(response.data));
      
      setFormData({
        name: '',
        gender: '',
        email: '',
        status: '',
      }); 

      router.push("/dashboard");
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  if (user && user.status === "active") {
    return <Loader />;
  }

  return (
    <section className="h-cover flex items-center justify-center">
      <form
        id="formElement"
        onSubmit={handleSubmit}
        className="w-[80%] max-w-[400px]"
      >
        <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
          Welcome Back
        </h1>

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
          Sign Up
        </button>

        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>

        <p className="mt-6 text-dark-grey text-xl text-center">
          Already a member ?
          <Link href="/auth" className="underline text-black text-xl ml-1">
            Sign in here.
          </Link>
        </p>
      </form>
    </section>
  );
}
