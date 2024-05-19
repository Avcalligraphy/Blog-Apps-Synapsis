import React, { ReactNode } from 'react'
import NavbarComponents from './NavbarComponents'

interface NavbarProps {
  children: ReactNode;
}
export default function AuthenticatedUser({ children }: NavbarProps) {
  return (
    <div className="w-full">
      <NavbarComponents>
        <div>{children}</div>
      </NavbarComponents>
    </div>
  );
}

//    <div className="mx-auto max-w-screen block">
//      {/* Start Sidebar  */}
//      <SidebarUser />
//      <Navbar />
//      {/* End Sidebar  */}

//      {/* Start Content  */}
//      <div className="lg:ml-[300px] ml-[0px] lg:px-[60px] px-[30px]">
//        <div className="pb-[23px] flex flex-col gap-[23px]">
//          {/* Start TOPBAR  */}
//          <TopbarUser user={currentAuthState} />
//          {/* End TOPBAR  */}
//          <main className="bg-white sm:rounded-[50px] rounded-[30px] lg:mt-[107px] mt-[30px]">
//            {children}
//          </main>
//        </div>
//      </div>
//      {/* End Content  */}
//    </div>
//    {/* <div className="mx-auto px-4 w-full h-screen lg:hidden flex bg-black">
//         <div className="text-white text-2xl text-center leading-snug font-medium my-auto">
//           Sorry, this page only supported on 1024px screen or above
//         </div>
//       </div> */}
//  </>;