"use client";
import AuthenticatedUser from "@/Layouts";
import BlogPost from "@/components/blog-post";
import Loader from "@/components/loader";
import NoDataMessage from "@/components/nodata-message";
import axios from "axios";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
        const response = await axios.get(`${apiUrl}/posts`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const filteredBlogs = posts.filter(
    (u) =>
      u.id.toString().includes(searchTerm.toLowerCase()) ||
      u.user_id.toString().includes(searchTerm.toLowerCase()) ||
      u.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.body.toLowerCase().includes(searchTerm.toLowerCase()) 
  );
  const currentFilteredBlogs = filteredBlogs.slice(
    indexOfFirstPost,
    indexOfLastPost
  );


  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>
  }

  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <AuthenticatedUser>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <div className="w-full mb-8 ">
            <input
              type="text"
              placeholder="Search Blog "
              className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {currentFilteredBlogs.length ? (
            currentFilteredBlogs.map((post) => (
              <BlogPost
                title={post.title}
                body={post.body}
                key={post.id}
                user_id={post.user_id}
                id={post.id}
              />
            ))
          ) : (
            <NoDataMessage message="No blogs published" />
          )}
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
        </div>
      </section>
    </AuthenticatedUser>
  );
}
