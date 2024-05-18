'use client'
import AuthenticatedDashboard from '@/Layouts/SideNav';
import BlogPost from '@/components/blog-post';
import Loader from '@/components/loader';
import NoDataMessage from '@/components/nodata-message';
import { RootState } from '@/redux/store/store';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface BlogUser {
  id: number;
  user_id: number;
  title: string;
  body: string;
}
export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogUser, setBlogUser] = useState<BlogUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user.userData);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
        const response = await axios.get(`${apiUrl}/users/${user?.id}/posts`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setBlogUser(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching posts");
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
   if (loading) {
     return <Loader />;
   }

   if (error) {
     return <p>{error}</p>;
   }
  return (
    <AuthenticatedDashboard>
      <h1 className="font-bold text-[32px] mb-8 ">My Blogs</h1>
      {blogUser.length ? (
        blogUser.map((blog) => (
          <div
            className="flex gap-8 items-center border-b border-grey pb-5 mb-4 text-left"
            key={blog.id}
          >
            <div className="w-full">
              <h1 className="blog-title">{blog.title}</h1>

              <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
                {blog.body}
              </p>
            </div>

            <div className="h-28 aspect-sqaure bg-grey">
              <img
                src="/imgs/esp.png"
                className="w-full h-full aspect-square object-cover"
              />
            </div>
          </div>
        ))
      ) : (
        <NoDataMessage message="No data Published" />
      )}
    </AuthenticatedDashboard>
  );
}
