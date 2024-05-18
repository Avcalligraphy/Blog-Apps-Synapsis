"use client";
import AuthenticatedDashboard from "@/Layouts/SideNav";
import CardUser from "@/components/card-user";
import Loader from "@/components/loader";
import NoDataMessage from "@/components/nodata-message";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export default function AllUser() {
  const [user, setUser] = useState<User[]>([]);
  const [updateUser, setUpdateUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 8;


  const indexOfLastUsers = currentPage * usersPerPage;
  const indexOfFirstUsers = indexOfLastUsers - usersPerPage;


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(user.length / usersPerPage);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
        const response = await axios.get(`${apiUrl}/users`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching posts");
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  const filteredUsers = user.filter(
    (u) =>
      u.id.toString().includes(searchTerm.toLowerCase()) ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentFilteredUsers = filteredUsers.slice(
    indexOfFirstUsers,
    indexOfLastUsers
  );

  const handleUserCreated = (newUser: User) => {
    setUser((prevUsers) => [newUser, ...prevUsers]);
    setShowCard(false);
    toast.success("Successfully created user!");
  };
  const handleUserUpdated = (updatedUser: User) => {
    setUser((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setShowCard(false);
    toast.success("Successfully updated user!");
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

          await axios.delete(`${apiUrl}/users/${id}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
          toast.success("Successfully deleted user!");
          setUser((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error: any) {
          toast.error("Failed to delete user!");
        }
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <AuthenticatedDashboard>
      <Toaster position="top-center" reverseOrder={false} />
      {showCard ? (
        <CardUser
          updateUser={updateUser}
          onUserCreated={handleUserCreated}
          onUserUpdated={handleUserUpdated}
          onClick={() => setShowCard(false)}
        />
      ) : null}
      <div className="block w-full ">
        <div className="sm:flex block justify-between mb-5 ">
          <h1 className="font-bold text-[32px] text-black">Dashboard Admin</h1>
          <button
            onClick={() => {
              setShowCard(true);
              setUpdateUser(null);
            }}
            className="btn-dark py-2"
          >
            Add User
          </button>
        </div>
        <div className=" mb-5 sm:w-[360px] w-full h-[130px] rounded-[20px] border-[1px] border-solid border-black p-[19px]">
          <div className="flex  items-center">
            <i className="fi fi-rr-users-alt"></i>
            <h1 className="font-semibold text-[14px] text-black ml-[7px]">
              Total User
            </h1>
          </div>
          <div className="flex items-center justify-between mt-[23px]">
            <h1 className="font-bold text-[22px] text-black">{user.length}</h1>
          </div>
        </div>
        <div className="w-full mb-8 ">
          <input
            type="text"
            placeholder="Search Blog "
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div>
    

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-black ">
            <thead className="text-xs text-black uppercase bg-grey ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3" colSpan={2}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentFilteredUsers.length ? (
                currentFilteredUsers.map((users, index) => (
                  <tr
                    className="odd:bg-white  even:bg-grey bg-grey border-b border-grey  "
                    key={users.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-black"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{users.id}</td>
                    <td className="px-6 py-4">{users.name}</td>
                    <td className="px-6 py-4">{users.email}</td>
                    <td className="px-6 py-4">{users.gender}</td>
                    <td className="px-6 py-4">{users.status}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(users.id)}
                        className=" bg-[#f55c7a] px-4 py-2 text-white rounded-[5px] "
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setShowCard(true);
                          setUpdateUser(users);
                        }}
                        className=" bg-[#f6bc66] px-4 py-2 text-white rounded-[5px]"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <NoDataMessage message="No User Published" />
              )}
            </tbody>
          </table>
        </div>
      </div>
      <nav aria-label="Page navigation example" className="mt-4">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:border-black  hover:bg-black hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i + 1}>
              <button
                onClick={() => paginate(i + 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  currentPage === i + 1
                    ? "z-10 bg-black text-white"
                    : "text-gray-500 bg-white border border-gray-300 hover:border-black  hover:bg-black hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-3 h-8 leading-tight border-gray-300 rounded-e-lg text-gray-500 bg-white border border-gray-300 hover:border-black hover:bg-black hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </AuthenticatedDashboard>
  );
}
